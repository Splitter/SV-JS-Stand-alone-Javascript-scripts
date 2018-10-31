var scrollanddrop=function(o){
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
			m.t=-m.h;m.cl=0;
			el.top="0px";el.left="0px";
			ec.top=-m.h+"px";ec.left="0px";
			m.a=1;
		}
		if(m.cl<m.w){	
			if(m.cl+m.sw>m.w){m.cl=m.w;}else{m.cl+=m.sw;}
			el.left=m.cl+"px";		
		}	
		else if(Math.abs(m.t)>0){
			el.display="none";ec.display="block";
			if(m.t+m.sh>0){m.t=0;}else{m.t+=m.sh;}
			ec.top=m.t+"px";	
		}				
		else{
			m.cl=0;m.t=-m.h;m.a=0;m._e(cn);return;		
		}
		m.ti=setTimeout(function(){m.an(cn);},m.tm);			
	};	
	m._e=function(cn){if(m.ce){m.ce(m.c,m.l);}if(cn){m.ti=setTimeout(m.pl,m.del)};};
	m.st=function(){clearTimeout(m.ti);m.ti=null;};	
	m.ti=setTimeout(m.pl,m.del);
};