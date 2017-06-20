var cheerio = require('cheerio');

module.exports = {
	/**
	* Parses the given html to scrap the desired metadata
	*
	* @reference Same API Syntax as iTunes http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searchexamples
	*
	* @param String data
	* @return Object
		@prop String icon
		@prop String name
		@prop String description
		@prop String author
		@prop String author_url
		@prop String price
		@prop String primaryGenreName
		@prop String averageUserRating
		@prop String userRatingCount
		@prop Array screenshotUrls
		@prop String viewUrl
		@prop String numDownloads
		@prop String fileSize
		@prop String version
		@prop String supportedDevices
	*/
	parse: function(data) {

		$ = cheerio.load(data);
		var wrapper = $('.details-wrapper ');

		var r_icon = "http:" + wrapper.find(".cover-image").attr("src");
		var r_name = wrapper.find(".document-title[itemprop=name]").text().trim();
		var r_description = wrapper.find("[itemprop=description]").text().trim();
		var r_author = wrapper.find("[itemprop=author] [itemprop=name]").text().trim();
		var r_authorURL = wrapper.find(".meta-info .dev-link").attr("href");
		var r_price = wrapper.find("meta[itemprop=price]").attr('content');

		// User amount or localized string
		if(r_price != "undefined")
		{
			r_price = "0";
		}
		if (r_price.match(/\d+/g)) {
			r_price = r_price.match(/\d+/g).join(".");
		}

		// User rating from 0/5 and reviews amount
		var r_averageUserRating = wrapper.find("meta[itemprop=ratingValue]").attr('content');
		var r_userRatingCount = wrapper.find("meta[itemprop=ratingCount]").attr('content');
//		var r_viewUrl = "https://play.google.com/store/apps/details?id=";

		// Iterate over all screenshoots
//		var r_screenshotUrls = [];
//		wrapper.find(".full-screenshot").each(function(index, key) {
//			r_screenshotUrls.push($(this).attr("src"));
//		});

		// Technical metadata
//		var r_supportedDevices = wrapper.find("[itemprop=operatingSystems]").text().trim();
		var r_primaryGenreName = wrapper.find("[itemprop=genre]").text().trim();
		var r_version = wrapper.find("[itemprop=softwareVersion]").text().trim();
		var r_numDownloads = wrapper.find("[itemprop=numDownloads]").text().trim();
		r_numDownloads = r_numDownloads.replace(/,/g,'');
		var n_arr = r_numDownloads.split("-").map(val =>Number(val));
//		var r_fileSize = wrapper.find("[itemprop=fileSize]").text().trim();

		return {
			name: r_name,
			iconurl: r_icon,
			description: r_description,
			author: r_author,
			author_url: r_authorURL,
			price: r_price,
			genre: r_primaryGenreName,
			rating: r_averageUserRating,
			ratingcount: r_userRatingCount,
//			screenshotUrls: r_screenshotUrls,
//			viewUrl: r_viewUrl,
//			numDownloads: r_numDownloads,
			download: n_arr[0],
			download2: n_arr[1],
//			fileSize: r_fileSize,
			version: r_version,
//			supportedDevices: r_supportedDevices
		}
	}
}
