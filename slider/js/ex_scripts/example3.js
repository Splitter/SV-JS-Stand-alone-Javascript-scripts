function example3(){
	/////////////////////////////////////
	/////// EXAMPLE 1 ///////////////////
	/////////////////////////////////////
	var options = {
		"id":		'container',
		"width":	590,
		"height":	345,
		"delay":	3000,
		"speed":	300,
		"steps":	6,
		"onend":	null,
		"onstart":	function(c,l){
						ss.type=(ss.type=="slidein")?"riseout":"slidein";
						c_div= document.getElementById('bottom_bar');
						divs=c_div.getElementsByTagName('li');
						divs[l].className='inactive';
						divs[c].className='active';
					}
	};


	var ss= new sv_slider(options);
	ss.st();

	var c_div= document.getElementById('bottom_bar');
	var divs=c_div.getElementsByTagName('li');
	for(i=0;i<divs.length;i++){
		divs[i].num=i;
		divs[i].onclick=function(){ss.gt(this.num+1);};
	}

	ss.ti=setTimeout(ss.pl,ss.del);




	/////////////////////////////////////
	/////// EXAMPLE 2 ///////////////////
	/////////////////////////////////////
	var types=['dropandscroll',
				'scrollanddrop',
				'dropin',
				'slidein',
				'slideout',
				'riseout']
	var options = {
		"id":		'container2',
		"width":	590,
		"height":	345,
		"delay":	5000,
		"speed":	300,
		"steps":	6,
		"onend":	null,
		"onstart":	function(c,l){
						sc.type=types[Math.floor(Math.random()*6)];
						c_div= document.getElementById('bottom_bar2');
						divs=c_div.getElementsByTagName('li');
						divs[l].className='inactive';
						divs[c].className='active';
					}
	};

	var sc= new sv_slider(options);
	sc.st();
	
	var c_div= document.getElementById('bottom_bar2');
	var divs=c_div.getElementsByTagName('li');
	for(i=0;i<divs.length;i++){
		divs[i].num=i;
		divs[i].onclick=function(){sc.gt(this.num+1);};
	}

	sc.ti=setTimeout(sc.pl,sc.del);

}