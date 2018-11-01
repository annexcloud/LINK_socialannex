'use strict';
/**
 * Initialize HTTP services for a cartridge
 */
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var loyaltyRestService = LocalServiceRegistry.createService("annexcloud.http.loyaltyProgram.post", {
	createRequest: function(svc:HTTPService, args){
		svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
		return args;
	},
	parseResponse: function(svc:HTTPService, client:HTTPClient) {
		return client.text;
	},	
});

var loyaltyPointRestService = LocalServiceRegistry.createService("annexcloud.http.loyaltyProgram.post", {
	createRequest: function(svc:HTTPService, args){
		svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
		return args;
	},
	parseResponse: function(svc:HTTPService, client:HTTPClient) {
		return client.text;
	},	
});

module.exports = {
		LoyaltyRestService: loyaltyRestService,
		LoyaltyPointRestService: loyaltyPointRestService
};