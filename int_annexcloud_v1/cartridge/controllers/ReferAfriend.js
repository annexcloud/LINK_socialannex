'use strict';

/**
* Description of the Controller and the logic it provides
*
* @module  controllers/ReferAfriend
*/

/* Script Modules */
var app = require('*/cartridge/scripts/app');
var guard = require('*/cartridge/scripts/guard');

/**
 * Renders the Refer-A-Friend dashboard content
 */
function showDashboard() {
	try {
   		app.getView().render('referafriend/showRAFdashboard');
   	}  catch (e){
   		var ex = e;
   		app.getView().render('referafriend/errorRAF');
   	}
}

exports.ShowDashboard = guard.ensure(['get'], showDashboard);