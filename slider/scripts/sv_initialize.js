//SETUP
$('document').ready(function(){	

	
	Cufon.replace('.small_text', {
					textShadow: '1px 2px rgba(0, 0, 0, 0.6)'
				});
	Cufon.replace('.big_text', {
					textShadow: '0px 2px rgba(0, 0, 0, 0.6)',
					color: '-linear-gradient(#ccc, #777)'
				});
	
	Cufon.replace('.heading', {
					textShadow: '1px 2px rgba(0, 0, 0, 0.6)'
				});
	Cufon.replace('h3', {
					textShadow: '1px 2px rgba(0, 0, 0, 0.1)'
				});
	Cufon.replace('h4', {
					textShadow: '1px 2px rgba(0, 0, 0, 0.1)'
				});
	Cufon.replace('.block p');

		
             
});
$(window).load( function() {
type=['faderows_out','half_out',"splice_out","drop_out","fade_out","thin_out"];
var options = {
	"id":		'container', // 			Required ID
	"width":	600,//			Required Width
	"height":	250,//			Required Height
	"delay":	3000,//Optional Delay
	"speed":	1000,//			Optional Speed
	"steps":	18,//			Optional Steps
	"columns":	10,//			Optional Columns
	"onstart":	function(c,l){//Optional OnEnd Callback Function
					//Continually Alternate the type of slide transition effect
					sc.type=type[Math.floor(Math.random()*6)];
					//Change the class of the controls to reflect which slide is active
					c_div= document.getElementById('control_wrap');
					divs=c_div.getElementsByTagName('div');
					divs[l].className='control_inactive';
					divs[c].className='control_active';					
				}
};		

var sc= new sv_slider(options);
sc.st();

var c_div= document.getElementById('control_wrap');
c_div.style.position="relative";
c_div.style.top=-(options.height-10)+"px";
c_div.style.zIndex=10000;

var divs=c_div.getElementsByTagName('div');
for(i=0;i<divs.length;i++){
	divs[i].num=i;
	divs[i].onclick=function(){
							sc.gt(this.num+1);
							};
}

sc.ti=setTimeout(function(){sc.pl(sc);},sc.del);

						   
});
//END SETUP
