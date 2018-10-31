var fademenu = function(){
	return{
		init:function(ele,nx,ny,d,st){
			el=document.getElementById(ele);if(!el){return;}
			var lis = el.getElementsByTagName("li");
			for(var j=0; j<lis.length; j++){
		    	var a = lis[j].getElementsByTagName("a");a=a[0];
                var a2 = document.createElement("a");a2.href=a.href;
                lis[j].style.width=a.offsetWidth+"px";lis[j].style.height=a.offsetHeight+"px";
                a2.className=a.className;a2.target=a.target;
                lis[j].style.overflow="hidden";a2.style.position="relative";
                a2.style.backgroundImage= a.style.backgroundImage;
                a2.style.backgroundPosition = nx+'px '+ny+'px';
                a2.innerHTML=a.innerHTML; a2.style.top="-"+a.offsetHeight+"px";
                lis[j].appendChild(a2);a2.style.opacity = 0;a2.style.filter = 'alpha(opacity =0)';
                a2.id=ele+ele+j;
                a2.onmouseover=function(){c=(this.c)?this.c:0;fademenu.f.init(this.id,c,100,d,st);};
                a2.onmouseout=function(){c=(this.c)?this.c:100;fademenu.f.init(this.id,this.c,0,d,st);}
            }
        },
        f:function(){
        	return{
        		init:function(ele,s,e,d,st){
        			el=document.getElementById(ele);if(!el){return;}if(el.ti){clearTimeout(el.ti);}
        			el.c=el.s=s;el.e=e;el.t=d/st;el.st=Math.abs(el.e-el.s)/st;
        			el.ti=setTimeout(function(){fademenu.f.op(ele)}, el.t);
        		},
        		op:function(ele){
        			el=document.getElementById(ele);if(!el){return;}
        			if(el.s<el.e){if(el.c<el.e){el.c+=el.st;}else{el.ti=null;return;}}
        			else{if(el.c>el.e){el.c-=el.st;}else{el.ti=null;return;}}
        			el.style.opacity = (el.c/100);el.style.filter = 'alpha(opacity = ' + el.c + ')';
        			el.ti=setTimeout(function(){fademenu.f.op(ele)}, el.t);
        		}
        	}
        }()
    }
}();