var sv_slider=function(o){
	this.d=document.getElementById(o.id);
	if(!o||!o.id||!o.width||!o.height||!this.d){return;}
	this.ex_d=null;
	var m=this;m.w=o.width;m.h=o.height;
	m.cb=(o&&o.onstart)?o.onstart:null;m.ce=(o&&o.onend)?o.onend:null;	
	m.d.style.width=m.w+"px";m.d.style.height=m.h+"px";
	m.sts=(o&&o.steps)?o.steps:10;t=(o&&o.speed)?o.speed:400;m.tm=t/m.sts;
	m.del=(o&&o.delay)?o.delay:1000;m.type=(o&&o.type)?o.type:'dropin';
	m.l=m.c=0;m.a=0;m.sw=Math.abs(m.w/m.sts);m.sh=Math.abs(m.w/m.sts);
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
		switch(m.type){
			case "slidehorizontal":			
				if(!m.a){
					m._cd(2);
					m.d.appendChild(m.ex_d[0]);
					m.ex_d[0].style.zIndex=1000;
					el.zIndex=ec.zIndex=1;
					m.cl=0;
					m.a=true;
				}
				
				m.ti=setTimeout(function(){m.an(cn);},m.tm);		
				
				break;
		}
	};	
	m._cd(num){
		m.ex_d =[];
		m.ex_d[0]= document.createElement('div');
		m.ex_d[0].style.width=m.w+"px";m.ex_d[0].style.height=m.h+"px";
		m.ex_d[0].style.overflow="hidden";
		m.ex_d[0].style.background="#000";
		m.ex_d[0].style.position="relative";
		m.ex_d[0].style.top=(-m.h)+"px";
		var wi=(m.w/num);
		for(var i=0;i<num;i++){
			m.ex_d[i+1]= document.createElement('div');
			m.ex_d[i+1].style.width=wi+"px";
			m.ex_d[i+1].style.height=m.h+"px";
			m.ex_d[i+1].style.background="red";
			m.ex_d[i+1].style.position="absolute";
			m.ex_d[i+1].style.left=(wi*i)+"px";	
			m.ex_d[0].appendChild(m.ex_d[i+1]);				
		}
		
		
		
	};
	m._e=function(cn){if(m.ce){m.ce(m.c,m.l);}if(cn){m.ti=setTimeout(m.pl,m.del)};};
	m.st=function(){clearTimeout(m.ti);m.ti=null;};	
	m.ti=setTimeout(m.pl,m.del);
};