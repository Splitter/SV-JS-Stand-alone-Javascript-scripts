
var sv = ( function ( sv ) {
	sv.ajax = function( ){
		var queue = [],	
			xhr = function( ){
				if( !window.XMLHttpRequest ){
					try {
						return new window.ActiveXObject( "Msxml2.XMLHTTP.6.0" );
					} catch ( e ) {
						try {
							return new window.ActiveXObject( "Msxml2.XMLHTTP.3.0" );
						} catch ( er ) {}
					}					
				}
				return new window.XMLHttpRequest();
			},			
			monitor = function( ){
				for( var i = 0, l = queue.length ; i < l ; i++ ){
					var x = queue[i].xhr;
					if( x.readyState == 4 ){
						if( x.status >= 200 && x.status < 300 ){
							queue[i].onSuccess( x.responseText , x.status );
							queue[i].xhr = x = null;
							queue.splice( i , 1 );
							break;
						}	
						queue[i].onError( x.status );
						queue[i].xhr = x = null;
						queue.splice( i , 1 );
						break;
					}
				}
				queueTimer = setTimeout( monitor , 10 );	
			}, 			
			queueTimer = setTimeout( monitor , 10 );			
			
		return {
			request : function( url, options ){			
				req = {
					method : "GET",
					contentType : "application/x-www-form-urlencoded",
					headers : {},
					onSuccess : function(){},
					onError : function() {},
					data : "",
					async : true
				}				
				for ( var name in options ) {
						req[ name ] = options[ name ];
				}			
				req.xhr = xhr();
				if( !req.xhr ){ return; };	
				req.xhr.open( req.method, url, req.async );				
				if( req.method == "POST" ){
					req.xhr.setRequestHeader( 'Content-type' , req.contentType );
				}
				for( var name in req.headers ){
					req.xhr.setRequestHeader( name , req.headers[name] );					
				}
				var data = ( req.method == "POST" ? req.data : null );
				req.xhr.send( data );
				queue.push( req );
			}			
		}
	}();     
    return sv; 
}( window.sv || {} ));