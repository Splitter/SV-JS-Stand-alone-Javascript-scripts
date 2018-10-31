var riseout=function(o){
	if(!o||!o.id||!o.width||!o.height){return;}
	this.d=document.getElementById(o.id);if(!this.d){return;}
	var m=this;m.w=o.width;m.h=o.height;
	m.cb=(o&&o.onstart)?o.onstart:null;
	m.ce=(o&&o.onend)?o.onend:null;	
	m.d.style.width=m.w+"px";m.d.style.height=m.h+"px";
	m.sts=(o&&o.steps)?o.steps:10;
	t=(o&&o.speed)?o.speed:400;m.tm=t/m.sts;
	m.del=(o&&o.delay)?o.delay:1000;
	m.l=m.c=0;m.a=0;
	m.sw=Math.abs(m.w/m.sts);m.sh=Math.abs(m.w/m.sts);
	var ls=m.d.getElementsByTagName('li');m.e=0;
	if(ls.length>0){	
		for(var i=0;i<ls.length;i++){ls[i].style.display=(i==0)?"block":"none";ls[i].style.position="relative";m.e++;}
	}	
	m.pl=function(){m.st();m.l=m.c;if(m.c==(m.e-1)){m.c=0;}else{m.c++;}if(m.cb){m.cb(m.c,m.l);}m.an(true);};	
	m.gt=function(num){if(!m.a&&(num-1)!=m.c){m.st();m.l=m.c;m.c=num-1;m._c();}};
	m._c=function(){if(m.cb){m.cb(m.c,m.l);}m.an(false);};
	m.nx=function(){if(!m.a){m.st();m.l=m.c;if(m.c==(m.e-1)){m.c=0;}else{m.c++;}m._c();}};
	m.pr=function(){if(!m.a){m.st();m.l=m.c;if(m.c==0){m.c=(m.e-1);}else{m.c--;}m._c();}};
	m.an=function(cn){
		ls=m.d.getElementsByTagName('li');
		el=ls[m.l].style;ec=ls[m.c].style;
		if(!m.a){
			ec.zIndex=1;
			el.zIndex=1000;ec.display=el.display="block";
			el.left=ec.left="0px";
			if(m.l<m.c){el.top="0px";ec.top=-m.h+"px";m.ct=0;}
			else{ec.top="0px";el.top=-m.h+"px";m.ct=-m.h;}					
			m.a=1;			
		}
		if(m.l<m.c && m.ct>-m.h){
			if(m.ct-m.sh<(-m.h)){m.ct=-m.h;}else{m.ct-=m.sh;}
			el.top=m.ct+"px";	
		}
		else if(m.l>m.c && m.ct>-(2*m.h)){
			if(m.ct-m.sh<-(2*m.h)){m.ct=-(2*m.h);}else{m.ct-=m.sh;}
			el.top=m.ct+"px";	
		}
		else{
			el.display="none";ec.top="0px";
			m.ct=m.h;m.a=0;m._e(cn);return;		
		}
		m.ti=setTimeout(function(){m.an(cn);},m.tm);			
	};	
	m._e=function(cn){if(m.ce){m.ce(m.c,m.l);}if(cn){m.ti=setTimeout(m.pl,m.del)};};
	m.st=function(){clearTimeout(m.ti);m.ti=null;};	
	m.ti=setTimeout(m.pl,m.del);
};