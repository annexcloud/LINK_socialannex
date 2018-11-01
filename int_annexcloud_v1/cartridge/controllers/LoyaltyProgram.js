'use strict';

/**
* Description of the Controller and the logic it provides
*
* @module  controllers/LoyaltyProgram
*/

/* Script Modules */
var app = require('*/cartridge/scripts/app');
var guard = require('*/cartridge/scripts/guard');


/**
 * Renders the Loyalty Program-Dashboard content
 */
function showDashboard() {
	try {
   		app.getView().render('loyaltyprogram/showDashboard');
   	}  catch (e){
   		var ex = e;
   		app.getView().render('loyaltyprogram/errorLoyalty');
   	}
}

/**
 * Assign the points to user against the action id.
 */
function givePoints() {
	try {	
		var emailId = request.httpParameterMap.emailId.stringValue;
		var actionId = request.httpParameterMap.actionId.stringValue;
		var firstName = request.httpParameterMap.firstName.stringValue;
		var lastName = request.httpParameterMap.lastName.stringValue;
		
		var giveUserPointsAPI = require('~/cartridge/scripts/loyaltyprogram/givePointsAPI');
		var opResponse = giveUserPointsAPI.giveUserPoints(emailId, actionId, firstName, lastName);
		
		app.getView({
			htmlOPresponse: opResponse
		}).render('loyaltyprogram/givePoints');	
	}catch(e) {
		var ex = e;
   		app.getView().render('loyaltyprogram/errorLoyalty');
	}
}

exports.ShowDashboard = guard.ensure(['get'], showDashboard);
exports.GivePoints = guard.ensure(['get'], givePoints);
