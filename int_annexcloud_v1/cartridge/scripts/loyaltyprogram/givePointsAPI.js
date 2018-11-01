'use strict';

function execute( args ) {
	try{
		var emailId 	= args.CurrentHttpParameterMap.emailId.stringValue;
		var actionId 	= args.CurrentHttpParameterMap.actionId.stringValue;
		var firstName 	= args.CurrentHttpParameterMap.firstName.stringValue;
		var lastName 	= args.CurrentHttpParameterMap.lastName.stringValue;
		
		args.opResponse = giveUserPoints(emailId, actionId, firstName, lastName);
	
	}catch(e) {
   		var ex = e;
   		return PIPELET_ERROR;	
	}
	return PIPELET_NEXT;
}


/**
 * Get the user details and assign them points.
 */
function giveUserPoints(emailId, actionId, firstName, lastName) {
	
	/* API Includes */
	var restService = require('~/cartridge/scripts/init/acLoyaltyProgramInit');
	var Site = require('dw/system/Site');
		
	var siteID = Site.getCurrent().getCustomPreferenceValue('acSiteId');
	var accessToken = Site.getCurrent().getCustomPreferenceValue('acLoyaltyAccessToken');
	var actionUse 	= '4';
	var userDetails = "fname="+firstName+"&lname="+lastName;	
	var htmlError = '<div id="saErrorLoyaltyInternal">Something went wrong.</div>';
	var htmlSuccess = '';
	
	// Rest API var init.
	var service:Service = restService.LoyaltyRestService;
		
	// First Register the User.
	service.URL += '/user/'+siteID+'/'+emailId+'?access_token='+accessToken;
	var result:Result = service.call(userDetails);		
	if (result.isOk()) {	
		htmlSuccess = result.getObject().toString();	
	} else {
		return htmlError;
	}		
	
	
	// Second Assign the Points.
	var serviceAction:Service = restService.LoyaltyPointRestService;
	
	var actionDetails = "action_use="+actionUse+"&action_id="+actionId; 
	
	serviceAction.URL += '/userpoints/'+siteID+'/'+emailId+'?access_token='+accessToken;	
	
	var resultAction:Result = serviceAction.call(actionDetails);		
	
	if (resultAction.isOk()) {	
		htmlSuccess += resultAction.getObject().toString();		
	} else {
		return htmlError;
	}
}

module.exports = {
		giveUserPoints: giveUserPoints
};