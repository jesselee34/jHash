(function(){
	$.jHash = ( function( ) {
		var _hash, _params;
		
		var _setParams = function( ){
			var i, fragment,
				fragments = _hash ? _hash.split('&') : null,
				obj = {};
			
			if( fragments ){
				for( i=0; i<fragments.length; i++ ){
					fragment = fragments[i].split('=');
					try {
						obj[ fragment[0] ] = fragment[1];
					}catch( e ){
						throw( e );
					}
				}
				return obj;
			}else{
				return "";
			}
		};
		
		var _update = function( ){
			_hash = window.location.hash ? window.location.hash.split('#')[1] : null;
			_params = _setParams();
		}
		
		var _init = function( ){
			_update();
			//Update on hashchange
			$( window ).on('hashchange', _update);
			
			//Fire popHash event on page load if there are params.
			if( _params ){
				$( window ).trigger('onpophash');
			}
		};
		
		var getHash = function(){
			return _hash;
		}
		
		var getParams = function(){
			return _params;
		}
		
		var pushState = function( hashString ){
			window.location.hash = hashString;
		};
		
		// Initialize on pageload.
		$(function( ){
			_init();
		});
		
		return {
			getHash: getHash,
			getParams: getParams,
			pushState: pushState
		}
	})();
}());