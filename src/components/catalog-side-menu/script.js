window.addEventListener('load', function(event) {

    $('.js-mobile-filter').click(function() {
        $('.sidebar-filter').addClass('active');
    })

    $('.sidebar-filter__close .icon').click(function() {
        $('.sidebar-filter').removeClass('active');
    })
});