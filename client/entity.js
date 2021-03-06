/***
CADBAH = Computer Aided Design Be Architectural Heroes
Copyright (c) 2019 Andrew Siddeley
MIT License
***/

// PRIVATE STATIC

// Default entity data with random location
var Entity=function(){
	/* Constructor of an object identical to applicable object created by dxf-parser node library */

	this.type="entity";
	this.color="BYLAYER";
	this.layer="0";
	this.linetype="BYLAYER";
	this.vertices=[{
		x:function(){return Math.trunc(Math.random()*1000);},
		y:function(){return Math.trunc(Math.random()*1000);}
	}];
};

// MIXINS - None

// PUBLIC
exports.activate=function(drawing){
	//meant to activate this library... why is this necessary?	
	this.drawing=drawing;
	//this.desc='foundation of all CADbah scene-model entities';
	//this.dxf=new entity();	
};

exports.create=function(){
	return new Entity();	
};

exports.description="Foundation for all graphical drawing elements";

exports.setGC=function(gc, entity){
	//Caddeley rendering with canvas
	//defaults
	
};

exports.setScene=function(scene, mesh, entdxf){
	//defaults
	if (typeof entdxf=="undefined"||entdxf==null){entdxf=this.dxf();}
	if (typeof mesh=="undefined"||mesh==null){
		//TODO diameter=pdsize (acad system variable)
		mesh=BABYLON.Mesh.CreateSphere("mySphere", {diameter:10},scene);
	}
	//set colour
	if (entdxf.color=="BYLAYER"){
		//console.log("Entity.setScene():", entdxf);
		//mesh.color=this.docdxf.getColorByLayer(entdxf.layer);			
	}
	else {
		//mesh.color=this.docdxf.getColorByIndex(entdxf.color);	
	}
};

exports.addFeatures=function(){
	//adds a feature constructor function to the handler being constructed
	for (var a in arguments) {
		this.Features.push(arguments[a]);
		//console.log(arguments[a]);
	}
};

exports.deserialize=function(scene, entityData){
	//overwrite default element data with data from serial source
	$.extend(this.data, entityData);
	this.setScene(scene);
};

exports.dispose=function(mesh){
	//disposes mesh and any children, that is someMesh where someMesh.parent == mesh
	var cc=mesh.getChildren();
	for (var c in cc){cc[c].dispose();}
	mesh.dispose();
}

exports.getFeatures=function(mesh) {
	/**********
	Returns a fresh object of features:
	{name:{feature}, position:{feature}...}
	A feature is a object scoped to a particular mesh like this:
	{label:'name', valu:mesh.variable, onFeatureChange:fn(ev,mesh,res){...}, editor:featureEditer}
	**********/
	//console.log('getfeatures(), this:');console.log(this);
	//Hope there's no confusion with Features, features & feature.
	var i, feature, features={};
	for (i in this.Features){
		feature=new this.Features[i](mesh);
		features[feature.alias]=feature;
	}
	return features;
}

exports.getType=function() {
	return this.constructor.name;
}

exports.serialize=function(){
	var json={};
	
	return json;
}

