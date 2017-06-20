var request = require('request');

module.exports = {
	/**
	* Retrieves information with a given appID
	*
	* @param Object config
		* @prop String appID
	* @param Function callback
		* @param Object data
	*/
	getApp: function (config, callback) {
		var basePath = "https://play.google.com/store/apps/details?id=";

		request(basePath+config.appID, function (error, res, chunk) {
			if (!error && res.statusCode == 200) {
				var scraper = require('./scrapers/app');
				var data = scraper.parse(chunk);
				if (typeof callback == 'function') {
					callback(JSON.stringify(data));
				}
			} else {
				// call callback anyway
				callback(JSON.stringify({
					error: res.statusCode
				}));
			}
		});
	}

};
