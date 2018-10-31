var example1=function(id,id2,ani,ani2){
// Set Script Options
//random delay
delay=[3000,4000,5000];

var options = {
	"id":		id, // 			Required ID
	"width":	700,//			Required Width
	"height":	345,//			Required Height
	"delay":	delay[Math.floor(Math.random()*3)],//Optional Delay
	"speed":	400,//			Optional Speed
	"steps":	30,//			Optional Steps
	"onstart":	function(c,l){//Optional OnEnd Callback Function
					//Continually Alternate the type of slide transition effect
					sc.type=(sc.type==ani)?ani2:ani;
					//Change the class of the controls to reflect which slide is active
					c_div= document.getElementById(id2);
					divs=c_div.getElementsByTagName('div');
					divs[l].className='control_inactive';
					divs[c].className='control_active';					
				}
};		

///////////////////////////
// Initialize The slider //
///////////////////////////
var sc= new sv_slider(options);
// Immediately stop the playing of the slideshow to give us time
// to setup the controls without interfering with the timing of 
// the script
sc.st();

//Position the controls to lay on top of slideshow
var c_div= document.getElementById(id2);
c_div.style.position="relative";
c_div.style.top=-(options.height-10)+"px";
// Have to set the Z-index to higher then 1000 as the 
// dropin,riseout,slidein and slideout animations set 
// the slides zindex to 1000 at certain points.
// This insures that the controls will always be visible
c_div.style.zIndex=10000;

//Add onclick event handlers to the controls
var divs=c_div.getElementsByTagName('div');
for(i=0;i<divs.length;i++){
	//The value of i coincides with the slide number that
	//each control will represent.
	//So all we have to do is call the 'goto' method of the class
	//and pass in the value of i.
	divs[i].num=i;
	divs[i].onclick=function(){sc.gt(this.num+1);};
}

//Now we start the slideshow back up by calling the play method.
//If we were to call the play method immediately then the script
//would switch to the next slide immediately.
//To avoid this we use setTimeout
// When setting the timeout it is best to catch the timer identifier 
// returned and store it in the objects ti variable as it will allow
// the controls to control the animation.
sc.ti=setTimeout(function(){sc.pl(sc);},sc.del);

};