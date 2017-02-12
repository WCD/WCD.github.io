function calcHeight() {
	//find the height of the internal page
	var the_height = document.getElementById('page-content').contentWindow.document.body.scrollHeight;

	//change the height of the iframe
	document.getElementById('page-content').height = the_height;
}

$(function() {
	$("#headerSlideshow").carousel();
});

$(document).ready(function() {
	
	$("#link-push-state .pushURL").click(function() {
		
		var file = $(this).data("url");
		
		$('#page-content').load(file + '.html', function() {
			
			window.history.pushState({id: file} + '.html', file + '.html', file);
			
			return false;
			
		})
		
	});
	
});
