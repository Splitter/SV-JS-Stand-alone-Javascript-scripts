(function($){
	$.fn.sv_animatehover = function(opts) {
		var defaults = {
			change: 125,
			attr : 'top',
			speed:600,
			queue:false
			};
		var opts = $.extend(defaults, opts);  	 
		return this.each(function() {
			if(!(typeof(opts.attr)=='object'&&(opts.attr instanceof Array))){
				opts.attr=[opts.attr];	
				opts.change=[opts.change];			
			}
			$(this).hover(
				function(){	
					if(!opts.queue){
						for(var i=0;i<opts.change.length;i++){
							p={};p[opts.attr[i]]='+='+opts.change[i];
							if(opts.selector){
									$(opts.selector,this).animate(p,opts.speed);
							}
							else{
								$(this).animate(p,opts.speed);
							}
						}
					}
					else{	
						var p={};
						for(var i=0;i<opts.change.length;i++){
							p[opts.attr[i]]='+='+opts.change[i];
						}
						if(opts.selector){
									$(opts.selector,this).animate(p,opts.speed);
						}
						else{
								$(this).animate(p,opts.speed);
						}
					}
				},
				function(){			
					if(!opts.queue){
						for(var i=0;i<opts.change.length;i++){
							p={};p[opts.attr[i]]='-='+opts.change[i];
							if(opts.selector){
									$(opts.selector,this).animate(p,opts.speed);
							}
							else{
								$(this).animate(p,opts.speed);
							}
						}
					}
					else{	
						var p={};
						for(var i=0;i<opts.change.length;i++){
							p[opts.attr[i]]='-='+opts.change[i];
						}
						if(opts.selector){
									$(opts.selector,this).animate(p,opts.speed);
						}
						else{
								$(this).animate(p,opts.speed);
						}
					}
				}
			);
		});
	};	
})(jQuery);

