function calcHeight() {
	//find the height of the internal page
	var the_height = document.getElementById('page-content').contentWindow.document.body.scrollHeight;

	//change the height of the iframe
	document.getElementById('page-content').height = the_height;
}

$(function() {
	$("#headerSlideshow").carousel();
});

var container = document.querySelector('#content');

$( document ).ready(function() {
	$( ".loadContent a" ).click(function() {
		var file = $(this).data("file");
		$('#content').load(file, function(){
			window.history.pushState({id: file}, file, file);
			return false;
		})
	});
});

container.addEventListener('click', function(e) {
  if (e.target != e.currentTarget) {
    e.preventDefault();
    // e.target is the image inside the link we just clicked.
  }
  e.stopPropagation();
}, false);