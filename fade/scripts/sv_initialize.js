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

	fademenu.init('navigation',0,-70,700,10);
	fademenu.init('nav_container',0,0,600,10);
						   
});
//END SETUP
