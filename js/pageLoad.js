function calcHeight() {
	//find the height of the internal page
	var the_height = document.getElementById('page-content').contentWindow.document.body.scrollHeight;

	//change the height of the iframe
	document.getElementById('page-content').height = the_height;
}

$(function() {
	$("#headerSlideshow").carousel();
});