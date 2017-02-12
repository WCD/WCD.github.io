/*function calcHeight() {
	//find the height of the internal page
	var the_height = document.getElementById('page-content').contentWindow.document.body.scrollHeight;

	//change the height of the iframe
	document.getElementById('page-content').height = the_height;
}*/

$(function() {
	$("#headerSlideshow").carousel();
});

removeHash = function() { 
	history.pushState("", document.title, window.location.pathname + window.location.search);
}

window.onhashchange = function() { 
    removeHash();
}

$(document).ready(function() {
		
		var file = window.location.hash;
		var setLocation = window.location.hash.replace('#', '');
		
		console.log(file);
		console.log(setLocation);
		
		$('#page-content').load(setLocation + '.html', function() {
			
			if(file == '#about' || file == '#team' || file == '#thesparce' || file == '#changelog') {
				window.history.pushState({id: setLocation}, setLocation, setLocation);
				removeHash();
			} else {
				removeHash();
			}
			
			return false;
			
		})
	
});

$(document).ready(function() {
	
	$(".pushURL").click(function() {
		
		var file = $(this).data("url");
		
		$('#page-content').load(file.toLowerCase() + '.html', function() {
			
			if(file.toLowerCase() == 'home') {
				window.history.pushState({id: file.toLowerCase()} + '.html', file.toLowerCase() + '.html', '..');
			} else {
				window.history.pushState({id: file.toLowerCase()} + '.html', file.toLowerCase() + '.html', file);
			}
			
			removeHash();
			
			return false;
			
		})
		
	});
	
});