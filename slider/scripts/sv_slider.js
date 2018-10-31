var sv_slider=function(o){
	this.d=document.getElementById(o.id);
	if(!o||!o.id||!o.width||!o.height||!this.d){return;}
	this.ex_d=null;
	var m=this;m.w=o.width;m.h=o.height;
	m.cb=(o&&o.onstart)?o.onstart:null;m.ce=(o&&o.onend)?o.onend:null;	
	m.d.style.width=m.w+"px";m.d.style.height=m.h+"px";
	m.sts=(o&&o.steps)?o.steps:10;t=(o&&o.speed)?o.speed:400;m.tm=t/m.sts;
	m.cols=(o&&o.columns)?o.columns:10;m.rows=(o&&o.rows)?o.rows:3;
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
			case "half_out":			
				if(!m.a){
					m._cd(2,1,ls[m.l]);
					m.d.appendChild(m.ex_d[0]);
					m.ex_d[0].style.zIndex=1000;
					el.zIndex=1;el.display="none";
					ec.zIndex=2;ec.display="block";
					m.ops=100/m.sts;
					m.opa=100;
					m.cl=0;m.a=1;
				}
				else if(m.cl<(m.w/2)){
					m.cl+=m.sw;
					m.opa-=m.ops;
					m.ex_d[1].style.left=(-m.cl)+"px";
					m.ex_d[2].style.left=((m.w/2)+m.cl)+"px";
					m.ex_d[0].style.opacity = (m.opa/100);
					m.ex_d[0].style.filter = 'alpha(opacity = ' + m.opa + ')';
				}
				else{
					m.cl=0;
					m.a=0;
					m.d.removeChild(m.ex_d[0]);
					m._e(cn);
					return;
				}
				m.ti=setTimeout(function(){m.an(cn);},m.tm);		
				break;
			case "splice_out":			
				if(!m.a){
					m._cd(m.cols,1,ls[m.l]);
					m.d.appendChild(m.ex_d[0]);
					m.ex_d[0].style.zIndex=1000;
					el.zIndex=1;el.display="none";
					ec.zIndex=2;ec.display="block";
					//m.ops=80/m.sts;
					//m.opa=120;
					m.cl=0;m.a=1;
				}
				else if(m.cl<m.h){
					m.cl+=m.sw;
					//m.opa-=m.ops;					
					for(var i=1;i<=m.cols;i++){
						if(i%2){
							m.ex_d[i].style.top=(-m.cl)+"px";
						}
						else{						
							m.ex_d[i].style.top=m.cl+"px";
						}				
					}
					//m.ex_d[0].style.opacity = (m.opa/100);
					//m.ex_d[0].style.filter = 'alpha(opacity = ' + m.opa + ')';
				}
				else{
					m.cl=0;
					m.a=0;
					m.d.removeChild(m.ex_d[0]);
					m._e(cn);
					return;
				}
				m.ti=setTimeout(function(){m.an(cn);},m.tm);		
				break;
			case "drop_out":			
				if(!m.a){
					m._cd(m.cols,1,ls[m.l]);
					m.d.appendChild(m.ex_d[0]);
					m.ex_d[0].style.zIndex=1000;
					el.zIndex=1;el.display="none";
					ec.zIndex=2;ec.display="block";
					m.ops=75/m.sts;
					m.opa=290;
					m.cl=0;m.a=1;
					m.cur_drop=1;
				}	
					if(m.cur_drop<m.cols && parseInt(m.ex_d[m.cur_drop].style.top)>(.1*m.h)){
						m.cur_drop++;
					}
					for(var i=1;i<=m.cur_drop;i++){
						//alert(parseInt(i+" "+m.ex_d[i].style.top));
						if(parseInt(m.ex_d[i].style.top)<m.h){
							m.ex_d[i].style.top=(parseInt(m.ex_d[i].style.top)+m.sw)+"px";
						}
						else{
							m.ex_d[i].style.top=m.h+"px";
						}
						if(m.ex_d[i].style.opacity>0){							
							m.opa=(m.ex_d[i].style.opacity*100)-m.ops;
							m.ex_d[i].style.opacity = (m.opa/100);
							m.ex_d[i].style.filter = 'alpha(opacity = ' + m.opa + ')';
						}
					}
					
					//m.ex_d[0].style.opacity = (m.opa/100);
					//m.ex_d[0].style.filter = 'alpha(opacity = ' + m.opa + ')';
				
				if(parseInt(m.ex_d[m.cols].style.top)>=m.h){
					m.cl=0;
					m.a=0;
					m.d.removeChild(m.ex_d[0]);
					m._e(cn);
					return;
				}
				m.ti=setTimeout(function(){m.an(cn);},m.tm);		
				break;
			
			
					
			
			case "fade_out":			
				if(!m.a){
					m._cd(m.cols,1,ls[m.l]);
					m.d.appendChild(m.ex_d[0]);
					m.ex_d[0].style.zIndex=1000;
					el.zIndex=1;el.display="none";
					ec.zIndex=2;ec.display="block";
					m.ops=180/m.sts;
					m.opa=290;
					m.cl=0;m.a=1;
					m.cur_drop=1;
				}	
					if(m.cur_drop<m.cols &&m.ex_d[m.cur_drop].style.opacity<=0.8){
						m.cur_drop++;
					}
					//alert(m.ex_d[m.cur_drop].style.opacity);
					for(var i=1;i<=m.cur_drop;i++){
						//alert(parseInt(i+" "+m.ex_d[i].style.top));
						//if(parseInt(m.ex_d[i].style.top)<m.h){
						//	m.ex_d[i].style.top=(parseInt(m.ex_d[i].style.top)+m.sw)+"px";
						//}
						//else{
						//	m.ex_d[i].style.top=m.h+"px";
						//}
						if(m.ex_d[i].style.opacity>0){							
							m.opa=(m.ex_d[i].style.opacity*100)-m.ops;
							m.ex_d[i].style.opacity = (m.opa/100);
							m.ex_d[i].style.filter = 'alpha(opacity = ' + m.opa + ')';
						}
					}
					
					//m.ex_d[0].style.opacity = (m.opa/100);
					//m.ex_d[0].style.filter = 'alpha(opacity = ' + m.opa + ')';
				
				if(m.ex_d[m.cols].style.opacity<=0){
					m.cl=0;
					m.a=0;
					m.d.removeChild(m.ex_d[0]);
					m._e(cn);
					return;
				}
				m.ti=setTimeout(function(){m.an(cn);},m.tm);		
				break;
				
			case "thin_out":			
				if(!m.a){
					m._cd(m.cols,1,ls[m.l]);
					m.d.appendChild(m.ex_d[0]);
					m.ex_d[0].style.zIndex=1000;
					el.zIndex=1;el.display="none";
					ec.zIndex=2;ec.display="block";
					m.ops=75/m.sts;
					m.opa=290;
					m.cl=0;m.a=1;
					m.cur_drop=1;
					m.wi_col=(m.w/m.cols)*.8;
					m.st_wi=(m.w/m.cols)/(m.sts/3)
				}	
					if(m.cur_drop<m.cols && parseFloat(m.ex_d[m.cur_drop].style.width)<m.wi_col){
						m.cur_drop++;
					}
					for(var i=1;i<=m.cur_drop;i++){
						//alert(parseFloat(m.ex_d[i].style.width));
						new_width=(parseFloat(m.ex_d[i].style.width)-m.st_wi);
						if(new_width>0){							
							m.ex_d[i].style.width=new_width+"px";
						}
						else{
							m.ex_d[i].style.width="0px";
						}
						//if(m.ex_d[i].style.opacity>0){							
						//	m.opa=(m.ex_d[i].style.opacity*100)-m.ops;
						//	m.ex_d[i].style.opacity = (m.opa/100);
						//	m.ex_d[i].style.filter = 'alpha(opacity = ' + m.opa + ')';
						//}
					}
					
					//m.ex_d[0].style.opacity = (m.opa/100);
					//m.ex_d[0].style.filter = 'alpha(opacity = ' + m.opa + ')';
				
				if(parseFloat(m.ex_d[m.cols].style.width)<=0){
					m.cl=0;
					m.a=0;
					m.d.removeChild(m.ex_d[0]);
					m._e(cn);
					return;
				}
				m.ti=setTimeout(function(){m.an(cn);},m.tm);		
				break;
			case "faderows_out":			
				if(!m.a){
					m._cd(m.cols,m.rows,ls[m.l]);
					m.d.appendChild(m.ex_d[0]);
					m.ex_d[0].style.zIndex=1000;
					el.zIndex=1;el.display="none";
					ec.zIndex=2;ec.display="block";
					m.ops=300/m.sts;
					m.opa=100;
					m.cl=0;m.a=1;
					m.cur_drop=1;
				}	
					if(m.cur_drop<(m.cols*m.rows) &&m.ex_d[m.cur_drop].style.opacity<=0.9){
						m.cur_drop++;
					}
					//alert(m.ex_d[m.cur_drop].style.opacity);
					for(var i=1;i<=m.cur_drop;i++){
						//alert(parseInt(i+" "+m.ex_d[i].style.top));
						//if(parseInt(m.ex_d[i].style.top)<m.h){
						//	m.ex_d[i].style.top=(parseInt(m.ex_d[i].style.top)+m.sw)+"px";
						//}
						//else{
						//	m.ex_d[i].style.top=m.h+"px";
						//}
						if(m.ex_d[i].style.opacity>0){							
							m.opa=(m.ex_d[i].style.opacity*100)-m.ops;
							m.ex_d[i].style.opacity = (m.opa/100);
							m.ex_d[i].style.filter = 'alpha(opacity = ' + m.opa + ')';
						}
					}
					
					//m.ex_d[0].style.opacity = (m.opa/100);
					//m.ex_d[0].style.filter = 'alpha(opacity = ' + m.opa + ')';
				
				if(m.ex_d[(m.cols*m.rows)-1].style.opacity<=0){
					m.cl=0;
					m.a=0;
					m.d.removeChild(m.ex_d[0]);
					m._e(cn);
					return;
				}
				m.ti=setTimeout(function(){m.an(cn);},m.tm);		
				break;	
				
		}
	};	
	m._cd=function(num,numr,obj){
		m.ex_d =[];
		m.ex_d[0]= document.createElement('div');
		m.ex_d[0].style.width=m.w+"px";m.ex_d[0].style.height=m.h+"px";
		m.ex_d[0].style.overflow="hidden";
		m.ex_d[0].style.position="relative";
		m.ex_d[0].style.top=(-m.h)+"px";
		var wi=(m.w/num);
		var he=(m.h/numr);
		ls=m.d.getElementsByTagName('li');
		for(var j=0;j<numr;j++){
		for(var i=0;i<num;i++){
			m.ex_d[((j*num)+i)+1]= document.createElement('div');
			m.ex_d[((j*num)+i)+1].style.width=(1+wi)+"px";
			m.ex_d[((j*num)+i)+1].style.height=(1+he)+"px";
			m.ex_d[((j*num)+i)+1].style.opacity=1;
			var div = document.createElement('div');
			div.innerHTML=obj.innerHTML;
			div.style.position="relative";
			div.style.top=-(he*j)+"px";
			div.style.left=(-(wi*i))+"px";	
			div.style.width=wi+"px";
			div.style.height=he+"px";	
			m.ex_d[((j*num)+i)+1].appendChild(div);	
			m.ex_d[((j*num)+i)+1].style.overflow="hidden";
			m.ex_d[((j*num)+i)+1].style.position="absolute";
			m.ex_d[((j*num)+i)+1].style.left=(wi*i)+"px";	
			m.ex_d[((j*num)+i)+1].style.top=(he*j)+"px";	
			m.ex_d[0].appendChild(m.ex_d[((j*num)+i)+1]);				
		}
		}
	};
	m._e=function(cn){if(m.ce){m.ce(m.c,m.l);}if(cn){m.ti=setTimeout(m.pl,m.del)};};
	m.st=function(){clearTimeout(m.ti);m.ti=null;};	
	m.ti=setTimeout(m.pl,m.del);
};