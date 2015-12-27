# node-periscope-stream-hls-url-grabber
Grab hls_url of a Periscope live stream

Idea derived from [node-periscope-stream](https://github.com/matteocontrini/node-periscope-stream) and [node-periscope-recorder](https://github.com/matteocontrini/node-periscope-recorder) to return the hls url directly.

## Use
```js
var config = {
	bearer_token: 'INSERT TWITTER BEARER TOKEN HERE'
}

var hlsUrlGrabber = new PeriscopeHlsUrlGrabber("INSERT PERISCOPE ACCOUNT NAME HERE", config);
hlsUrlGrabber.start('INSERT TWITTER ID HERE', function(status, hlsUrl) {

	if (!status) {
		# returns the actual hls url
		console.log(hlsUrl);
	} else {
		# returns the related errors
		console.log(status);
	}
}
```
