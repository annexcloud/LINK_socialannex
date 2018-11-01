'use strict';

/**
* Description of the Controller and the logic it provides
*
* @module  controllers/VisualCommerce
*/

/* Script Modules */
var app = require('*/cartridge/scripts/app');
var guard = require('*/cartridge/scripts/guard');

/**
 * Renders the Visual Commerce Home Page & Product Page content
 */
function startVC() {
	try {
   		app.getView().render('visualcommerce/visualcommerce');
   	}  catch (e){
   		var ex = e;
   		app.getView().render('visualcommerce/errovc');
   	}
}

/**
 * Renders the Visual Commerce Gallery content
 */
function galleryVC() {
	try {
   		app.getView().render('visualcommerce/visualcommercegallery');
   	}  catch (e){
   		var ex = e;
   		app.getView().render('visualcommerce/errovc');
   	}	
}

exports.StartVC = guard.ensure(['get'], startVC);
exports.VcGalleryStart = guard.ensure(['get'], galleryVC);