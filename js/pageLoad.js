/*function calcHeight() {
	//find the height of the internal page
	var the_height = document.getElementById('page-contentfr').contentWindow.document.body.scrollHeight;

	//change the height of the iframe
	document.getElementById('page-contentfr').height = the_height;
}*/

$(function() {
	$("#headerSlideshow").carousel();
});

removeHash = function() { 
	history.pushState("", document.title, window.location.pathname + window.location.search);
	scrollSpy();
}

window.onhashchange = function() { 
    removeHash();
}

$(document).ready(function() {
	
	var file = window.location.hash;
	var setLocation = window.location.hash.replace('#', '');
	
	if(setLocation != '' && setLocation != 'About' && setLocation != 'about') {
		$('#page-content').load(setLocation + '.html', function() {
			
			if(file == '#team' || file == '#thesparce' || file == '#changelog') {
				window.history.pushState({id: setLocation}, setLocation, setLocation);
				removeHash();
			} else {
				removeHash();
			}
			
			return false;
			
		})
	}

});

$(document).ready(function() {
	
	var hfile = 'home';
	var hfilec = window.location.pathname.split('/').slice(-1);
	var hfileh = window.location.hash;
	
	if((hfilec == 'index.html' || hfilec == 'index' || hfilec == '') && hfileh == '' && hfilec != 'about') {
		$('#page-content').load(hfile.toLowerCase() + '.html', function() {
			
			if((hfilec == 'index.html' || hfilec == 'index' || hfilec == '') && hfileh == '') {
				window.history.pushState({id: hfile.toLowerCase()} + '.html', hfile.toLowerCase() + '.html', '..');
			}
			
			removeHash();
			
			return false;
			
		})
	} else if(hfilec == 'about') {
		$('#page-content').load('home.html#About', function() {
			window.history.pushState({id: 'index'} + '.html#About', 'index.html#About', 'about');
			urlChange();
		})
	}
	
	$(".pushURL").click(function() {
		
		var file = $(this).data("url");
		
		if(file.toLowerCase() != 'about') {
			
			$('#page-content').load(file.toLowerCase() + '.html', function() {
				
				if(file.toLowerCase() == 'home') {
					window.history.pushState({id: file.toLowerCase()} + '.html', file.toLowerCase() + '.html', '..');
				} else {
					window.history.pushState({id: file.toLowerCase()} + '.html', file.toLowerCase() + '.html', file.toLowerCase());
				}
				
				removeHash();
				
				return false;
				
			})
			
		} else if(file.toLowerCase() == 'about') {
			$('#page-content').load('home.html#About', function() {
				window.history.pushState({id: 'index'} + '.html', 'index.html#About', 'about');
				urlChange();
			})
		}
		
	});
	
	fixContent = function() {
		
		var file = 'home';
		
		$('#page-content').load(file.toLowerCase() + '.html', function() {
			
			if(file.toLowerCase() == 'home') {
				window.history.pushState({id: file.toLowerCase()} + '.html', file.toLowerCase() + '.html', '..');
			}
			
			removeHash();
			
			return false;
			
		})
		
	}
	
});

$('#About').ready(function() {
    urlChange();
});

$.fn.gotoAnchor = function(anchor) {
    location.href = this.selector;
}

urlChange = function() {
	
	var page = window.location.pathname.split('/').slice(-1);
	
	if(page == 'about') {
		$('#About').gotoAnchor();
	}
}

scrollSpy = function() {
	$('body').scrollspy({target: ".navbar", offset: 350});
}

/*$(document).load(function() {
	var rfile = window.location.pathname.split('/').slice(-1);
	
	console.log(rfile);
	
	if(rfile == '' || rfile == 'index' || rfile == 'index.html' || rfile == '../' || rfile == '.html') {
		window.location.href = '#home';
		window.history.pushState({id: rfile}, rfile, '');
	}

});*/
