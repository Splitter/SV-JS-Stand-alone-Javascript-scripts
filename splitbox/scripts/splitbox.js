
/*
Splitbox LightBox Script
Copyright (C) 2011 Mike Pippin
Contact me at http://www.split-visionz.net


This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

/*
USAGE:
	1. Add rel="splitbox" or rel="splitbox[groupname]" to image links(similar to original lightbox)
	2. Call splitbox.init() to initialize script
		-usually done within window.onload, document ready or at end of HTML document
*/

(function(){
	var sb = function(){
		var aniObjs = [], //holds objects being animated
			aniTimer = null, //animation timer
			ani = function(){ //handles actual animation
				if(st!=0){
					if(aniObjs.length>0){
						for(var i = 0; i<aniObjs.length;i++){
							var obj = aniObjs[i];
							var time = +new Date();
							var t = (time-obj.startTime);
							var pos = time>obj.endTime ? 1 : t/obj.duration;
							for(var prop in obj.css){
								var p = obj.css[prop];
								pos =(obj.easing&&sb.easing[obj.easing])?sb.easing[obj.easing](pos, t, 0, 1,obj.duration):pos;
								((time>obj.endTime)?sb.css(obj.elem,prop,p.to + (prop=='opacity'?'':'px')):sb.css(obj.elem,prop,(p.from+(p.to-p.from)*pos).toFixed(3) + (prop=='opacity'?'':'px')));
							}
							if(time>obj.endTime){
								aniObjs.splice(i, 1);
								if(obj.onend){obj.onend();}
							}
						}
					}
				}
				else{
					aniObjs = [];
				}
			},
			ctn, //container div
			cur = 0, //current index in array of images
			curOptions ={}, //options for current item
			group, 	//group name
			hpad, //horizontal padding
			img, //current image
			imgs = [],	//array of images
			idiv, // inner div
			over,	//overlay div
			settings,	//settings
			src,	//cur image source
			st, //state variable 
			vpad; //vertical padding
		return {
			//start/setup animations		
			animate : function(obj){ 		
				for(var prop in obj.css){
					if(typeof(obj.css[prop])==='string'){
						var c = obj.css[prop];
						obj.css[prop]={};
						obj.css[prop].to=c;
						obj.css[prop].from = parseFloat(sb.css(obj.elem,prop));
					}			
					for(var i in obj.css[prop]){
						var nStr,str = ''+obj.css[prop][i];
						if(nStr = str.match(/\+\=|\-\=/)){
							obj.css[prop][i] =(nStr=='+=')?parseFloat(sb.css(obj.elem,prop))+parseFloat(obj.css[prop][i].replace(nStr, '')):parseFloat(sb.css(obj.elem,prop))-parseFloat(obj.css[prop][i].replace(nStr, ''));
						}
						else{
							obj.css[prop][i] = parseFloat(str);
						}
					}
				}
				obj.startTime = +new Date();
				obj.endTime= obj.startTime+obj.duration;
				aniObjs.push(obj);	
				if(!aniTimer){
					aniTimer = setInterval(ani, 10);
				}
			}, 
			//utility camelcase function
			camelCase : function(str, to){ 
				if(to){
					return str.replace(/\-(.)/g, function(m, l){return l.toUpperCase();});
				}
				else{
					return str.replace(/([A-Z])/g, function(m, l){return "-"+l.toLowerCase();});
				}
			},
			//css function
				//getter and setter
			css : function(el,prop,val){
				if(typeof prop === 'string' && val){
					sb.setCSS(el,prop,val);
				}
				else if(typeof prop === 'object'){
					for(type in prop){
						sb.setCSS(el,type,prop[type]);
					}
				}
				else{
					if(el.currentStyle){
						return el.currentStyle[sb.camelCase(prop,true)];
					}
					else{
						return getComputedStyle(el, null).getPropertyValue(sb.camelCase(prop,false));
					}	
				}
			},
			//utility function get document size
			docSize : function(){
				return {
						w:(document.body.scrollWidth||document.documentElement.scrollWidth)||(document.body.clientWidth||document.documentElement.clientWidth),
						h:(document.body.scrollHeight||document.documentElement.scrollHeight)||(document.body.clientHeight||document.documentElement.clientHeight)
						};
			},
			//easing
				//support easing for transitions
				//taken from the jQuery easing plugin
			easing : {
				easeInOutExpo: function (x, t, b, c, d) {
					if (t==0) return b;
					if (t==d) return b+c;
					if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
					return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
				}			
			},
			//empty containers before transition to next item in list
			empty : function(){
				if(st!=0){
					ctn.removeChild(ctn.childNodes[1]);
					idiv.removeChild(idiv.firstChild);
					idiv.removeChild(document.getElementById('sb_overDiv'));
				}
			},
			//initialize (for images as of now)
			init : function(options){
				//default settings
				settings = {
					//image directory
					image_directory : "images/", 
					//overlay opacity
					overlayOpacity : '0.8',
					//overlay transition speed
					overlayTransSpeed : 300,
					//transition speed
					transSpeed : 1000,
					//title transition speed
					titleTransSpeed : 300,
					//initial hieght
					iheight : 200,
					//initial width
					iwidth : 200
				}
				//overide defaults with options passed in
				if(options){
					var name;
					for(name in options){
						settings[name]=options[name];
					}
				}
				//grab all links
					// apply onlick to them
				var links = document.body.getElementsByTagName("a");
				for (var i=0, len = links.length ; i < len ; i++){
					var l = links[i];			
					if (l.rel=='splitbox'){
						l.onclick=sb.open;
					}
					else if(l.rel.search(/splitbox/i)>-1){	
						l.onclick=sb.open;					
					}
				}				
			},
			//loads the container div and all child divs
			loadContainer : function(){
				if(st!=0){
					ctn = document.createElement('div');
					ctn.id = 'sb_container';
					idiv = document.createElement('div');
					idiv.id = 'sb_innerdiv';	
					var pdiv = document.createElement('div');
					pdiv.className = 'sb_padding';	
					//add padding div to body to get padding
						//needed inorder to calculate outer container position
					document.body.appendChild(pdiv);
					document.body.appendChild(ctn);
						hpad = parseInt(sb.css(pdiv,'paddingLeft'))+parseInt(sb.css(pdiv,'paddingRight'))+ parseInt(sb.css(ctn,'paddingLeft'))+parseInt(sb.css(ctn,'paddingRight'));
						vpad = parseInt(sb.css(pdiv,'paddingBottom'))+parseInt(sb.css(pdiv,'paddingTop'))+ parseInt(sb.css(ctn,'paddingBottom'))+parseInt(sb.css(ctn,'paddingTop'));
					document.body.removeChild(pdiv);
					document.body.removeChild(ctn);
					//remove div after calculating padding
						hpad = parseInt(hpad/2);
						vpad = parseInt(vpad/2);
					
					sb.css(idiv,{
							width:settings.iwidth+"px",
							height:settings.iheight+"px",
							backgroundImage:"url("+settings.image_directory+"loading.gif)",
							backgroundPosition:" center center ",
							backgroundRepeat:"no-repeat"
							});
					var dim = sb.viewSize(),
						tp=(((dim.h/2)-((settings.iheight/2)+vpad))+sb.top()),
						lp=((dim.w/2)-((settings.iwidth/2)+hpad));
					sb.css(ctn,{left:lp+"px",top:tp+"px"});
					pdiv.appendChild(idiv);
					ctn.appendChild(pdiv);
					document.body.appendChild(ctn);
					img = new Image();
					img.onload=sb.loadImage;
					img.src = src;					
				}
			},
			//load the next/prev/close buttons and title/caption
			loadControls : function(){
				if(st!=0){
					var title = "",
						ndiv = document.createElement('div'),
						tdiv = document.createElement('div'),
						cdiv = document.createElement('div');
						tspan = document.createElement('span'),
						clear = document.createElement('div');
					if(imgs[cur].title){
						title = imgs[cur].title;
					}
					ndiv.className = 'sb_padding';
					tdiv.id = 'sb_titlediv';	
					cdiv.id = 'sb_close';
					cdiv.onclick = sb.remove;
					tspan.appendChild(document.createTextNode(title));
					tdiv.appendChild(tspan);
					tdiv.appendChild(cdiv);
					clear.className = 'clear';
					tdiv.appendChild(clear);
					document.body.appendChild(tdiv);
					var h = tdiv.offsetHeight+"px";
					document.body.removeChild(tdiv);
					sb.css(tdiv,{height:'0px',width:sb.css(idiv,'width'),overflow:'hidden'});
					ndiv.appendChild(tdiv);
					ctn.appendChild(ndiv);
					sb.animate({
							elem:tdiv,
							duration:settings.titleTransSpeed,
							css: {height:h},
							onend: function(){
								
								if(imgs.length>1){
									var next = document.createElement('a'),
										prev = document.createElement('a'),
										overDiv = document.createElement('div');
									prev.id = 'sb_prev';
									next.id = 'sb_next';
									overDiv.id = 'sb_overDiv';
									prev.href="#";
									next.href="#";
									sb.css(overDiv,{
										width:sb.css(idiv,'width'),
										height:sb.css(idiv,'height'),
										top:'-'+sb.css(idiv,'height'),
										position:'relative',
										zIndex : '3000'									
									});
									sb.css(prev, {
										width:'40%',
										height:sb.css(idiv,'height'),
										position:'relative',
										zIndex : '3000'
									});
									sb.css(next, {
										width:'40%',
										height:sb.css(idiv,'height'),
										position:'relative',
										zIndex : '3000'
									});
									next.onclick = sb.next;
									prev.onclick = sb.prev;
									overDiv.appendChild(prev);
									overDiv.appendChild(next);
									idiv.appendChild(overDiv);
								}
						
							}
							});	
					//idiv.insertBefore(next,idiv.childNodes[0]);
					//idiv.insertBefore(prev,idiv.childNodes[0]);
				}
			},			
			//resize/reposition div and load image
			loadImage : function(){
				if(st!=0){					
					var dim = sb.viewSize(),
						tp=(((dim.h/2)-((this.height/2)+vpad))+sb.top()),
						lp=((dim.w/2)-((this.width/2)+hpad));
					sb.animate({
							elem:ctn,
							duration:settings.transSpeed,
							easing:'easeInOutExpo',
							css: {top:tp+"px",left:lp+"px"}
							});	
					sb.animate({
							elem:idiv,
							duration:settings.transSpeed,
							easing:'easeInOutExpo',
							css: {width:parseInt(this.width)+"px",height:parseInt(this.height)+"px"},
							onend:function(){
								sb.css(img,{opacity:'0.0'});
								sb.css(idiv,{backgroundImage:''});
								idiv.appendChild(img);
								sb.animate({
										elem:img,
										duration:settings.transSpeed,
										css:{opacity:'1'},
										onend:sb.loadControls
										});						
							}
						});	
				}
			},
			//loads the overlay div			
			loadOverlay : function(){
				if(st!=0){
					d=document;
					over=d.createElement('div'); 
					d.body.appendChild(over);
					over.id='sb_overlay';
					var dim = sb.docSize();
					sb.css(over,{
						width:dim.w+"px",
						height:dim.h+"px",
						opacity:0.0
					});
					over.onclick=sb.remove;
					sb.animate({
							elem:over,
							duration:settings.overlayTransSpeed,
							css: {
								opacity:settings.overlayOpacity
								},
							onend:sb.loadContainer
							});		
				}
			},
			//next item in list
			next : function(){
				var tdiv = document.getElementById('sb_titlediv');
				var h = tdiv.offsetHeight+"px";
				sb.css(tdiv,{height:h,overflow:"hidden"});
				sb.animate({
						elem:tdiv ,
						duration:settings.titleTransSpeed,
						css: {
							height:'0px'
							},
						onend:function(){	
							if(st!=0){
								sb.empty();
								if(cur+1 > (imgs.length-1)){
									cur = 0;
								}
								else{
									cur = cur +1;
								}				
								sb.startSwitch();	
							}
						}
						});		
				return false;			
			},
			//open function
				//called when link clicked
				//TODO:  can be called directly with options object
			open : function(){
				if(!this){return;}
				group = (this.rel=='splitbox')?null:this.rel.match(/\[(.*)\]/)[1];
				src = this.href;
				if(group){
					var links = document.body.getElementsByTagName("a");
					for ( var i = 0,len = links.length ; i < len ; i++ ){
						var l = links[i];			
						if(l.rel.search(/splitbox/i)>-1 && l.rel.match(/\[(.*)\]/) && l.rel.match(/\[(.*)\]/)[1]==group){						
							imgs.push(l);
							if(l == this){
								cur = i;
							}
						}				
					}
				}
				else{
					imgs.push(this);
					cur = 0;
				}
				st = 1;
				sb.loadOverlay();
				return false;
			},
			//previous item in list
			prev : function(){			
				var tdiv = document.getElementById('sb_titlediv');
				var h = tdiv.offsetHeight+"px";
				sb.css(tdiv,{height:h,overflow:"hidden"});
				sb.animate({
						elem:tdiv ,
						duration:settings.titleTransSpeed,
						css: {
							height:'0px'
							},
						onend:function(){		
							if(st!=0){
								sb.empty();
								if(cur-1 < 0){
									cur = imgs.length-1;
								}
								else{
									cur = cur -1;
								}
								sb.startSwitch();	
							}
						}
						});		
				
				return false;
			},
			//remove function
				//removes all elements added by script
			remove : function(){
				st=0;
				if(ctn&&document.getElementById(ctn.id)){
					document.body.removeChild(ctn);
					ctn=null;
				}
				if(over&&document.getElementById(over.id)){
					document.body.removeChild(over);
					over=null;
				}
				imgs = [];
			},
			//set the css values
			setCSS : function(el, prop, val){
				switch(prop){
					case 'opacity':
						val = parseFloat(val);
						el.style.filter = (val === 1) ? '' : 'alpha(opacity=' + (val * 100) + ')';
						el.style.opacity = val;
						break;				
					default:
						el.style[sb.camelCase(prop,true)]=val;
				}
			},
			startSwitch : function(){
				idiv.style.backgroundImage="url("+settings.image_directory+"loading.gif)";
				idiv.style.backgroundPosition=" center center ";
				idiv.style.backgroundRepeat="no-repeat";
				
				img = new Image();
				img.onload=sb.loadImage;
				img.src = imgs[cur].href;	
						
			},
			//utility function get scrolltop
			top:function(){
				return document.body.scrollTop||document.documentElement.scrollTop
			},
			//utility function get viewport size
			viewSize : function(){
				return {
						w:self.innerWidth||(document.documentElement.clientWidth||document.body.clientWidth),
						h:self.innerHeight||(document.documentElement.clientHeight||document.body.clientHeight)
						};
			}
		};
	}();
	window.splitbox=sb;
})(); 
	
