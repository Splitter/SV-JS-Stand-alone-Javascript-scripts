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

extend.init('nav_container','h',145,30,200,20);
extend.init('nav_container2','h',140,30,200,20);
						   
});
//END SETUP
