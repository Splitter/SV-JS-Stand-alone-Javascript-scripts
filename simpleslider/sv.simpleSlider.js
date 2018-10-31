
/*
svSimplerSlider Script
Copyright (C) 2010 Mike Pippin
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




(function(){
	//svSimpleSlider object
	var ss = function(){
	
		//objects being animated
		var aniObjs = [], 		
		
		/**
		*handles actual processing of animations
		*
		*/
		ani = function(){ 
			if(aniObjs.length > 0){
				for(var i = 0; i < aniObjs.length ; i++){
					var obj = aniObjs[i];
					var time = +new Date();
					var t = (time - obj.startTime);
					var pos = time > obj.endTime ? 1 : t / obj.duration;
					for(var prop in obj.css){
						var p = obj.css[prop];
						pos = (obj.easing && ss.easing[obj.easing]) ? ss.easing[obj.easing](pos, t, 0, 1,obj.duration) : pos;
						((time > obj.endTime) ? ss.css(obj.elem,prop,p.to + (prop == 'opacity' ? '' : 'px')) : ss.css(obj.elem,prop,(p.from+(p.to-p.from)*pos).toFixed(3) + (prop == 'opacity' ? '' : 'px')));
					}
					if(time > obj.endTime){
						aniObjs.splice(i, 1);
						if(obj.onend){obj.onend();}
					}
				}					
			}
		},
		
		//animation timer
		aniTimer = setInterval(ani, 10);
		
		/**
		*Public Interface
		*
		*/
		return {
		
			/**
			*start/setup animations
			*
			*@param object - object that defines animation  
			*
			*/
			animate : function(obj){ 		
				for(var prop in obj.css){
					if(typeof(obj.css[prop])==='string'){
						var c = obj.css[prop];
						obj.css[prop]={};
						obj.css[prop].to=c;
						obj.css[prop].from = parseFloat(ss.css(obj.elem,prop));
					}			
					for(var i in obj.css[prop]){
						var nStr,str = ''+obj.css[prop][i];
						if(nStr = str.match(/\+\=|\-\=/)){
							obj.css[prop][i] =(nStr=='+=')?parseFloat(ss.css(obj.elem,prop))+parseFloat(obj.css[prop][i].replace(nStr, '')):parseFloat(ss.css(obj.elem,prop))-parseFloat(obj.css[prop][i].replace(nStr, ''));
						}
						else{
							obj.css[prop][i] = parseFloat(str);
						}
					}
				}
				obj.startTime = +new Date();
				obj.endTime= obj.startTime+obj.duration;
				aniObjs.push(obj);					
			}, //animate function
			
			
			/**
			*camalcase function
			*
			*@param string - string to convert
			*@param bool - whether to convert to camelcase
			*
			*/
			camelCase : function(str, to){ 
				if(to){
					return str.replace(/\-(.)/g, function(m, l){return l.toUpperCase();});
				}
				else{
					return str.replace(/([A-Z])/g, function(m, l){return "-"+l.toLowerCase();});
				}
			},//camelcase function
			
			
			/**
			*get children of specific tag name
			*
			*@param object - DOM element to search children of  
			*@param string - tagname of children to find
			*
			*/
			children : function(el,type){
				var nodes = [];
				for(var i = 0,l = el.childNodes.length ; i < l ; i++){
					if(el.childNodes[i].nodeName.toLowerCase()===type.toLowerCase()){
						nodes.push(el.childNodes[i]);
					}
				}
				return nodes;
			},//children function
			
			
			/**
			*CSS/Style getter and setter
			* - if value is set or prop is object of key/val pairs then setter
			* - otherwise getter
			*
			*@param object - DOM element
			*@param string/object - string of property name or object representing property/value pairs to set
			*@param depends - value to set property to if prop is string representing property name
			*
			*/
			css : function(el,prop,val){
				if(typeof prop === 'string' && val){
					ss.setCSS(el,prop,val);
				}
				else if(typeof prop === 'object'){
					for(type in prop){
						ss.setCSS(el,type,prop[type]);
					}
				}
				else{
					if(el.currentStyle){
						return el.currentStyle[ss.camelCase(prop,true)];
					}
					else{
						return getComputedStyle(el, null).getPropertyValue(ss.camelCase(prop,false));
					}	
				}
			}, //css function
			
			
			/**
			*easing object - holds easing functions
			*	- adapted from jQuery easing plugin
			* 	- http://gsgd.co.uk/sandbox/jquery/easing/
			*	- easing equations originally from Robert Penner
			*	- http://www.robertpenner.com/easing/
			*
			*/
			easing : {
				easeInOutExpo: function (x, t, b, c, d) {
					if (t==0) return b;
					if (t==d) return b+c;
					if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
					return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
				}			
			},//easing object
			
			
			/**
			*actual slider object
			*
			*/
			slider : {
			
					/**
					*slider initialization/constructor 
					*
					*@param object - object containing slider configuration
					*
					*/
					init : function(settings){
						
						var m = this,
							next = document.getElementById(settings.next),
							prev = document.getElementById(settings.prev),
							control = document.getElementById(settings.controls);
						
						m.ani = false;
						m.active = true;
						m.timer = null;
						m.settings = settings;
						m.ul = document.getElementById(settings.slideshow);
						
						if(!m.ul){return null};
						ss.css(m.ul,{left:'0px'});
						if(!!prev){
							prev.onclick = function(){
											m.prev();
										};
						}
						if(!!next){
							next.onclick = function(){
											m.next();
										};
						}
						if(!!control){
							m.controls = ss.children(control,'li');
							m.switchControls(0);
							for(var i = 0,l = m.controls.length; i < l ; i++){
								m.controls[i].svSimpleSliderIDX = i;
								m.controls[i].onclick = function(){
									m.switchTo(this.svSimpleSliderIDX);
								};
							}
						}
						m.slides = ss.children(m.ul,'li');
						m.cur = m.last = 0;
						if(settings.transition=='sideslide'){
							m.sideSetup();
						}
						else{						
							m.fadeSetup();
						}
						m.timer = setTimeout(function(){
												m.next();
											},settings.delay);
						return this;
					},//init function
					
					/**
					*setup slides for 'sideslide' transition
					*
					*/
					sideSetup : function(){
						for(var i=0,l=this.slides.length,w=0,t=0;i<l;i++){
							ss.css(this.slides[i],{
											position:'relative',
											left:w+"px",
											top:'-'+t+"px"
												});
							w+=this.settings.width;
							t+=this.settings.height;							
						}					
					},//sideSetup funciton
					
					/**
					*setup slides for 'fade' transition
					*
					*/
					fadeSetup : function(){
						for(var i=0,l=this.slides.length,t=0;i<l;i++){
								ss.css(this.slides[i],{
												position:'relative',
												left:"0px",
												top:'-'+t+"px",
												zIndex:1,
												opacity:0
													});
								if(i==0){
									ss.css(this.slides[i],{
										zIndex:2,
										opacity:1
									});
								}
								t+=this.settings.height;							
							}					
					},//fadeSetup funciton
					
					/**
					*add/remove 'active' CSS class from appropiate control
					*
					*@param integer - index for active control
					*
					*/
					switchControls : function(idx){
						for(var i = 0,l = this.controls.length; i < l ; i++){
							if(i == idx){
								var eleCls = this.controls[i].className;
								if (!(eleCls.length > 0 && (eleCls == 'active' || new RegExp("(^|\\s)active(\\s|$)").test(eleCls)))){
									this.controls[i].className += (this.controls[i].className ? ' ' : '') + 'active';
								}
							}
							else{
								this.controls[i].className = this.controls[i].className.replace(
									new RegExp("(^|\\s+)active(\\s+|$)"), ' ').replace(/^\s+|\s+$/g, '');
							}							
						}					
					},//switchControls function
					
					/**
					*switch to the next slide
					*
					*/
					next : function(){
						if(!this.ani && this.active){
							this.last = this.cur;
							this.ani = true;
							var cur = this.cur+1;
							if(cur > (this.slides.length-1)){
								cur =0;
							}
							this.cur = cur;	
							this.transition();
						}
					},//next function
					
					/**
					*switch to the previous slide
					*
					*/
					prev : function(){
						if(!this.ani && this.active){
							this.last = this.cur;
							this.ani = true;
							var cur = this.cur-1;
							if(cur < 0){
								cur = (this.slides.length-1);
							}
							this.cur = cur;	
							this.transition();
						}
					},//previous function
					
					/**
					*stop the autoplaying 
					*
					*/
					stop : function(){
						this.active = false;
						clearTimeout(this.timer);
					},//stop function
					
					/**
					*re-start the autoplaying
					*
					*/
					start : function(){
						var m = this;
						if(!m.ani && !m.active){
							m.active = true;
							clearTimeout(m.timer);
							m.timer = setTimeout(function(){
									m.next();
							},m.settings.delay);
						}
						else if(m.ani && !m.active){
							setTimeout(function(){
								m.start();
							},10);
						}
					},//start function
					
					/**
					*switch to specific slide
					*
					*@param integer - index for slide to switch to
					*
					*/
					switchTo : function( num ){
						if(!this.ani && this.active){
							if(num >= 0 && num < (this.slides.length)){
								this.ani = true;
								clearTimeout(this.timer);
								this.last = this.cur;
								this.cur = num;	
								this.transition();
							}						
						}
					},//switchTo function
					
					/**
					*initialize/begin transitions between slides
					*
					*/
					transition : function(){
						var m = this;
						clearTimeout(m.timer);
						m.switchControls(m.cur);
						if(m.settings.transition=='sideslide'){
							var l = (m.cur == 0)?'0px':'-'+(m.settings.width*m.cur)+'px';
						
							ss.animate({
								elem:m.ul,
								duration:m.settings.speed,
								css: {left:l},
								easing:'easeInOutExpo',
								onend: function(){
									m.ani = false;
									m.timer = setTimeout(function(){
													m.next();
												},m.settings.delay);
								}
							});	
						}
						else{
							ss.css(m.slides[m.cur],{
								zIndex:1,
								opacity:1
							});							
							ss.animate({
								elem:m.slides[m.last],
								duration:m.settings.speed,
								css: {opacity:'0'},
								onend: function(){
									ss.css(m.slides[m.cur],{
										zIndex:2,
										opacity:1
									});
									ss.css(m.slides[m.last],{
										zIndex:1,
										opacity:0
									});
									m.ani = false;
									m.timer = setTimeout(function(){
													m.next();
												},m.settings.delay);
								}
							});								
						}
					}//transition function
			},//slider object 
			
			/**
			*initialize slider object
			*
			*@param object - object containing slider configuration
			*
			*@return object - return slider object
			*/
			init : function(options){		
			
				if(!ss.slider.init.prototype.init){
					ss.slider.init.prototype = ss.slider;
				}		
				
				//create slide configuration settings
					// combine defaults and options passed in
				var defaults = {
					slideshow	: 'slideshow',
					next 		: 'slideshow_next',
					prev		: 'slideshow_prev',
					controls	: 'slideshow_controls',
					delay		: 2000,
					speed		: 800,
					transition	: 'fade',
					width		: 600,
					height	 	: 260
				};
				if(options){
					var name;
					for(name in options){
						defaults[name]=options[name];
					}
				}
				
				//create actual slider instance and return it
				return new ss.slider.init(defaults);;		
			},// init function
			
			
			/**
			*Set CSS/Style properties of element
			*
			*@param object - DOM element  
			*@param string/object - string of property name
			*@param depends - value to set property to
			*
			*/
			setCSS : function(el, prop, val){
				switch(prop){
					case 'opacity':
						val = parseFloat(val);
						el.style.filter = (val === 1) ? '' : 'alpha(opacity=' + (val * 100) + ')';
						el.style.opacity = val;
						break;				
					default:
						el.style[ss.camelCase(prop,true)]=val;
				}
			}//setcss function			
		
		};
	}();
	//expose simple slider to global namespace
	window.svSimpleSlider = ss;
})(); 



