var periscope = require('node-periscope-stream');
var Twitter = require('twitter');
var urlExpander = require('expand-url');

function PeriscopeHlsUrlGrabber(username, config) {
	this.username = username;
	this.twitterClientConfig = config;	
}

PeriscopeHlsUrlGrabber.prototype.start = function(userId, callback) {
	var streamId;
	var streamAddress = 'https://www.periscope.tv/w/' + streamId;

	var params = {screen_name: this.username};
	var client = new Twitter(this.twitterClientConfig);	

	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
			var tweet = tweets[0].text;
			var uriPattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[{};:'".,<>?«»“”‘’]|\]|\?))/ig;
			var tweetUrl = tweet.match(uriPattern)[0];

			urlExpander.expand(tweetUrl, function(err, longUrl) {
					console.log(longUrl);
					periscope(longUrl, function(err, details) {
						var status;
						var hlsUrl;

						if (!err) {
							if (details.type === "StreamTypeWeb") {
								hlsUrl = details.https_hls_url;
							}	else {
								status = "Stream ended";
							}
						} else {
							status = "There is no stream";
						}

						callback(status, hlsUrl);
					});
			});
		} else {
			console.log(this.twitterClientConfig);
			console.log(error);
		}
	});

};



module.exports = PeriscopeHlsUrlGrabber;
