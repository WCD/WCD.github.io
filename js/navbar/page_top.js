var currPage = jQuery(location).attr('href').toString().split('/')[3];
var scroll = 0;

var navBar = $('.navbar.navbar-inverse');
var navbarFixed = $('.navbar-fixed-top');
var navbarStatic = $('.navbar-static-top');
var headerHeight = 300;

$(window).scroll(function() { 
    
    var scroll = $(window).scrollTop(); 
    
    if(scroll < headerHeight + 1) { 
        
        navBar.removeClass('navbar-fixed-top');
        navBar.addClass('navbar-static-top');
        
    } 
    
    else if(scroll >= headerHeight + 1) {
        
        navBar.removeClass('navbar-static-top');
        navBar.addClass('navbar-fixed-top');
        
    } 
    
});

/*$(window).scroll(function() { 
    
    scroll = $(window).scrollTop();

    $('.HudsonGTV.omg-stop-viewing-da-source-code').css({'top': '' + (-scroll / 3 + 100) + 'px', 'margin-left': 'calc(50% - 530px)'});
    
    if(scroll >= 300) {
        
        //if(scroll < 420) {
        //    $('.box').css({'display': 'none', 'position': 'absolute', 'top': (-scroll / 4 + 200) + 'px'});
        //}
        
        //if(scroll >= 420) {
            $('#mainwrapper .box').css({'display': 'block', 'position': 'absolute', 'top': (-scroll / 4 + 200) + 'px'});
            $('#mainwrapper .box').addClass('animated');
            $('#mainwrapper .box').addClass('fadeIn');
        //}
        
    } else if(scroll < 300) {
        $('#mainwrapper .box').removeClass('animated');
        $('#mainwrapper .box').removeClass('fadeIn');
        $('#mainwrapper .box').css({'display': 'none', 'position': 'absolute'});
        $('#mainwrapper .box').css({'display': 'block', 'position': 'absolute', 'top': (-scroll / 4 + 200) + 'px'});
    }
});*/