var extend=function(){
	return{
		init:function(el,ty,sw,ew,d,st){
			e=document.getElementById(el);if(!e){return;}a=e.getElementsByTagName("a");
			for(i=0;i<a.length;i++){
				a[i].d=d;a[i].st=st;a[i].ty=ty;
				a[i].onmouseover=extend.o;a[i].onmouseout=extend.o;a[i].o=sw;a[i].n=sw+ew;
				if(ty=='h'){a[i].style.width=sw+"px";}
				else if(ty=='v'){a[i].style.height=sw+"px";}
				else{return;}
			}
		},
		o:function(e){
			e=e||window.event;c=e.target!=null?e.target:e.srcElement;
			if(c.nodeName=='A' && e.type=="mouseover"){c.w=c.n;extend.s(c);}
			else if(c.nodeName=='A'){c.w=c.o;extend.s(c);}
		},
		s:function(e){
			if(e.ti){clearTimeout(e.ti);}
			if(e.ty=='h'){e.sw=e.d=parseFloat(e.style.width);}
			else{e.sw=e.d=parseFloat(e.style.height);}			
			e.t=Math.abs(e.d/e.st);e.sx=Math.abs(e.sw-e.w)/e.st;
			e.ti=setTimeout(function(){extend.r(e)}, e.t);
		},
		r:function(e){
			if(e.sw<e.w){if(e.d<e.w){e.d+=e.sx;}else{var wd=true;}if(e.d>e.w){e.d=e.w;}}
			else{if(e.d>e.w){e.d-=e.sx;}else{var wd=true;}if(e.d<e.w){e.d=e.w;}}
			if(e.ty=='h'){e.style.width=e.d+"px";}
			else{e.style.height=e.d+"px";}
			if(wd){e.ti=null;return;}e.ti=setTimeout(function(){extend.r(e)}, e.t);
		}
	}
}();