function example4(){
	var options = {
		"id":		'container',
		"type":		'slideout',
		"width":	580,
		"height":	245,
		"delay":	3000,
		"speed":	330,
		"steps":	6,
		"onend":	null,
		"onstart":	function(c,l){
						c_div= document.getElementById('tabs');
						divs=c_div.getElementsByTagName('li');
						divs[l].className='inactive';
						divs[c].className='active';
					}
	};		




	var sc= new sv_slider(options);
	sc.st();
	var c_div= document.getElementById('tabs');
	var divs=c_div.getElementsByTagName('li');

	for(i=0;i<divs.length;i++){
		divs[i].num=i;
		divs[i].onmouseover=function(){sc.gt(this.num+1);};
	}



	sc.ti=setTimeout(sc.pl,sc.del);
}