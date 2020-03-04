/************************************************************

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

	project:	BIM United FC
	module: 	FeaturesUI
	by: 		Andrew Siddeley 
	started:	19-Jan-2017
*/


// Define module with simplified CommonJS Wrapper...
// see http://requirejs.org/docs/api.html#cjsmodule
define( function(require, exports, module) {

var $=require('jquery');
var UI=require('united/UI');
var FC=require('features/FC');
var Feature=require('features/Feature');

var FeaturesUI=function(board, title, options){
	//inherit constructor from UI
	UI.call(this, board, title, options); 

	this.alias='Features';
	this.controls=[];

	// return constructed ui object for chaining.
	return this;
};

//inherit prototype from UI
FeaturesUI.prototype=Object.create(UI.prototype);
FeaturesUI.prototype.constructor=FeaturesUI;

var __=FeaturesUI.prototype;

	
__.getEvents=function(){
	//For events, keyword 'this' refers to the event callers context
	//The 'this' that refers to the FeaturesUI instance, is passed in ev.data 
	return [
		{name:'input', data:this, handler:this.onInput},
		{name:'pick', data:this, handler:this.onPick}
	];
};

//override
__.getInputHandlers=function(){
	//get inherited inputHandlers, commands such as 'events' & 'keywords'
	var ih=UI.prototype.getInputHandlers.call(this);
	
	//commands or inputHandlers for partsUI...
	return ih.concat([{
		inputs:['features', 'fu'], 
		desc:'Brings up/down the features dialog box and tab',
		handler:function(ev){ev.data.toggle(); return false;}
	},{
		inputs:['peek','_meshAdded', '_meshPicked'],
		desc:'Show features of the current mesh',
		handler:function(ev){ev.data.start(BIM.get.cMesh());}
	}]);
};

//utility
__.matchAll=function(sourceMesh, targetMesh) {
	var tfc=targetMesh.bimhandle.getfeatures(targetMesh);
	var sfc=sourceMesh.bimhandle.getfeatures(sourceMesh);
	//go thru each source feature and apply the target property updater with the source prop as argument
	for (var key in sfc) {
		//only match feature if there is a matching key in target 
		if (tfc[key] != 'undefined'){
			//what about Moveable.propUpdate() that may start the move process? Harmless!
			if (typeof sfc[key] !='undefined'){
				tfc[key].propUpdate(sfc[key].prop);
			}			
		} 
	}
}

__.start=function(mesh){
	//this.reset();
	//Dispose previously used control objs to free memory, new ones to be created
	this.controls.forEach(function(fc){fc.remove();});
	this.controls=[];

	if (typeof mesh=='undefined' || mesh==null){ return false; }
	
	var f, fc, features, i;
	features=mesh.bimhandle.getfeatures(mesh); 

	for (i in features){
		f=features[i];
		//if (f.control.prototype instanceof FC) {
		try {
			fc=new f.control(this.div$, f);
			fc.start();
			this.controls.push(fc);
		//} else { BIM.fun.log('Feature not editable'); }
		} catch(er) { console.log(er);}
	}
};
	
	
/*
usage:
myFeaturesUI=new Features(board, uiStore, evManager, isDialog);
To create a feature editor UI that stands alone:
myFeaturesUI=new Features($("#myNavbar"), BIM.ui, BIM.ui.uiBlackboard, true);
*/

return FeaturesUI;

});


