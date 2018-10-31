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

roller.init('nav_container','h',-200,0,100,20);
roller.init('nav_container4','v',-66,0,250,20);
roller.init('nav_container5','v',0,-45,80,15);
						   
});
//END SETUP
