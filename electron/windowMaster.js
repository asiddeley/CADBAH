/*****
CASBAH
Contract Administration System Be Architectural Heroes
Copyright (c) 2018 Andrew Siddeley
MIT License
*****/

///// IMPORTS
const windowManager = require('electron-window-manager')

///// MODULE Scope Variables & Functions
//const HTML=`file://${__dirname}/CAD.html`

//holds name of window that was closed -- DEPRECATED?
//var closed=[]

//deprecated, use <.. :class=windowName> instead
/*
var colours=[
	'aquamarine', 'blueviolet', 'coral', 'darkmagenta', 'cyan',
	'white', 'orange', 'orange', 'blue', 'blue', 'gold',
	'gold', 'green', 'green', 'brown', 'brown', 'black',
	'black', 'black', 'black', 'black', 'black', 'purple',
	'purple', 'purple',	'purple', 'purple',	'purple', 'black',
	'black'
]
*/

var themes=[
	'light','dark','light','dark','light',
	'light','light','light', 'dark', 'dark', 'light',
	'light','dark','dark','dark','dark', 'dark',
	'dark','dark','dark','dark','dark', 'dark',
	'light','light','light','light','light', 'light',
	'dark'
]

var names=[
	"Alpha", 
	"Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", 
	"Hotel", "India", "Juliet", "Kilo", "Lima", "Mike", 
	"November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", 
	"Tango", "Uniform", "Victor", "Whiskey", "Xray", "Yankee", 
	"Zulu"
]

var OPTIONS={
	width: 1200,
	height: 400,
	//position: 'topLeft',
	position:[20, 20],
	resizable:true,
	showDevTools:true,
	frame:true,
	webPreferences: {nodeIntegration: true}
}

//var prefix='CA'
//var positionDelta=[20,20]

//names of windows to reuse beacuse of refresh or closed
//var reuse=[]

//var windex=-1

//function getNextWindowName(){
	////assign a new name from the list
	//windex+=1
	//if(windex<names.length){return names[windex]}
	//else{return ( prefix + windex.toString() ) }
//}

function getFreeWindowName(name){
	
	return names.find(function(n){
		return !windowManager.get(n)
	})
	
}

///// Exports 
exports.get=function(name){return windowManager.get(name)}

//exports.getWindowName=getWindowName
exports.getCurrent=function(){return windowManager.getCurrent()}

/*
//deprecated, use class instead 
exports.getColour=function(name){
	var i=names.indexOf(name)
	//modulus operation ensures colours won't run out
	if (i!=-1){ return colours[(i % colours.length)]}
	else { return colours[0] }
}

exports.getTheme=function(name){
	var i=names.indexOf(name)
	if (i!=-1){ return themes[(i % themes.length)] }
	else { return themes[0] }
}

exports.getReloaded=function(){	
	return Object.create({reuse:reuse, closed:closed})
}
*/

exports.isolate=function(name){
	names.forEach(function(n){
		var win=windowManager.get(n)		
		if (win!=name && name!=null){windowManager.close(win)}		
	})	
}

exports.list=function(key){
	var openWindows=[]
	key=key||'Name'
	names.forEach(function(n){
		var o={}, win=windowManager.get(n)		
		if (win){o[key]=n; openWindows.push(o)}	
	})
	return openWindows
}

//exports.onBeforeUnload=function(windowName){
//	reuse.push(windowName)
//}

//window onClose event listener not working
//exports.onClose=function(windowName){
//	closed.push(windowName)
//}

exports.open=function(options){
	options=options||{cascadeFrom:null, html:'CAD.html'}
	
	if (options.cascadeFrom){
		//Cascade new window from callingWindowName
		var win=windowManager.get(options.cascadeFrom)
		//console.info('Caller properties:', win)
		var pos=win.object.getPosition().map(function(v, i){
			return v+positionDelta[i]
		})
	}
	var name=getFreeWindowName()
	var html=`file://${__dirname}/options.html`

	if (names.includes(name)){
		windowManager.open(name, name, html, false, Object.assign(options,{position:pos}))
		return true
	} else { 
		return 'window limit reached.'
	}
}











