function example5(){
	var types=['dropandscroll',
				'scrollanddrop',
				'dropin',
				'slidein',
				'slideout',
				'riseout']
	var options = {
		"id":		'container',
		"width":	700,
		"height":	345,
		"delay":	2000,
		"speed":	400,
		"steps":	10,
		"onstart":	function(c,l){
							sc.type=types[Math.floor(Math.random()*6)];
							},
		"onend":	null
	};		
	var c_div= document.getElementById('control_wrap');
	c_div.style.position="relative";
	c_div.style.top="-30px";
	c_div.style.left="0px";
	c_div.style.zIndex=10000;



	var sc= new sv_slider(options);
	sc.st();

	document.getElementById('play').onclick=sc.pl;
	document.getElementById('pause').onclick=sc.st;
	document.getElementById('next').onclick=sc.nx;
	document.getElementById('prev').onclick=sc.pr;

	sc.ti=setTimeout(sc.pl,sc.del);

}