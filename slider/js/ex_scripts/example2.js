function example2(){
// Set Script Options
var options = {
	"id":		'container', // Required ID
	"width":	500,//			Required Width
	"height":	345,//			Required Height
	"delay":	3000,//			Optional Delay
	"speed":	200,//			Optional Speed
	"steps":	5,//			Optional Steps
	"onstart":	function(c,l){//Optional OnStart Callback Function
					//Change the class of the controls to reflect which slide is active
					c_div= document.getElementById('control_wrap');
					divs=c_div.getElementsByTagName('div');
					divs[l].className='control_inactive';
					divs[c].className='control_active';
				}
};		


///////////////////////////
// Initialize The slider //
///////////////////////////
var sc= new dropandscroll(options);
// Immediately stop the playing of the slideshow to give us time
// to setup the controls without interfering with the timing of 
// the script
sc.st();


//Position the controls to lay on top of slideshow
var c_div=document.getElementById('control_wrap');
c_div.style.position="relative";
c_div.style.top=-(options.height)+"px";
c_div.style.left="0px";
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
sc.ti=setTimeout(sc.pl,sc.del);


/////////////////////////////////////
/////// EXAMPLE 2 ///////////////////
/////////////////////////////////////


var options2 = {
	"id":		'container2', // Required ID
	"width":	500,//			Required Width
	"height":	345,//			Required Height
	"delay":	5000,//			Optional Delay
	"speed":	200,//			Optional Speed
	"steps":	5,//			Optional Steps
	"onstart":	function(c,l){//Optional OnStart Callback Function
					//Change the class of the controls to reflect which slide is active
					c_div= document.getElementById('control_wrap2');
					divs=c_div.getElementsByTagName('div');
					divs[l].className='control_inactive';
					divs[c].className='control_active';
				}
};		


///////////////////////////
// Initialize The slider //
///////////////////////////
var ss= new slidein(options2);
// Immediately stop the playing of the slideshow to give us time
// to setup the controls without interfering with the timing of 
// the script
ss.st();


//Position the controls to lay on top of slideshow
var c_divs= document.getElementById('control_wrap2');
c_divs.style.position="relative";
c_divs.style.top=-(options2.height)+"px";
c_divs.style.left="0px";
// Have to set the Z-index to higher then 1000 as the 
// dropin,riseout,slidein and slideout animations set 
// the slides zindex to 1000 at certain points.
// This insures that the controls will always be visible
c_divs.style.zIndex=10000;


//Add onclick event handlers to the controls
var divss=c_divs.getElementsByTagName('div');
for(i=0;i<divss.length;i++){
	//The value of i coincides with the slide number that
	//each control will represent.
	//So all we have to do is call the 'goto' method of the class
	//and pass in the value of i.
	divss[i].num=i;
	divss[i].onclick=function(){ss.gt(this.num+1);};
}

//Now we start the slideshow back up by calling the play method.
//If we were to call the play method immediately then the script
//would switch to the next slide immediately.
//To avoid this we use setTimeout
// When setting the timeout it is best to catch the timer identifier 
// returned and store it in the objects ti variable as it will allow
// the controls to control the animation.
ss.ti=setTimeout(ss.pl,ss.del);






/////////////////////////////////////
/////// EXAMPLE 3 ///////////////////
/////////////////////////////////////


var options2 = {
	"id":		'container3', // Required ID
	"width":	500,//			Required Width
	"height":	345,//			Required Height
	"delay":	3000,//			Optional Delay
	"speed":	200,//			Optional Speed
	"steps":	5,//			Optional Steps
	"onstart":	function(c,l){//Optional OnStart Callback Function
					//Change the class of the controls to reflect which slide is active
					c_div= document.getElementById('control_wrap3');
					divs=c_div.getElementsByTagName('div');
					divs[l].className='control_inactive';
					divs[c].className='control_active';
				}
};		


///////////////////////////
// Initialize The slider //
///////////////////////////
var sa= new dropin(options2);
// Immediately stop the playing of the slideshow to give us time
// to setup the controls without interfering with the timing of 
// the script
sa.st();


//Position the controls to lay on top of slideshow
var c_divs= document.getElementById('control_wrap3');
c_divs.style.position="relative";
c_divs.style.top=-(options2.height)+"px";
c_divs.style.left="0px";
// Have to set the Z-index to higher then 1000 as the 
// dropin,riseout,slidein and slideout animations set 
// the slides zindex to 1000 at certain points.
// This insures that the controls will always be visible
c_divs.style.zIndex=10000;


//Add onclick event handlers to the controls
var divss=c_divs.getElementsByTagName('div');
for(i=0;i<divss.length;i++){
	//The value of i coincides with the slide number that
	//each control will represent.
	//So all we have to do is call the 'goto' method of the class
	//and pass in the value of i.
	divss[i].num=i;
	divss[i].onclick=function(){sa.gt(this.num+1);};
}

//Now we start the slideshow back up by calling the play method.
//If we were to call the play method immediately then the script
//would switch to the next slide immediately.
//To avoid this we use setTimeout
// When setting the timeout it is best to catch the timer identifier 
// returned and store it in the objects ti variable as it will allow
// the controls to control the animation.
sa.ti=setTimeout(sa.pl,sa.del);
}