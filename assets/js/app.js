$(document).on('ready', function() {

    // Initialize slider
    $('.screen-background').slick({
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 700,
    });

    // Initialize Foundation
    $(document).foundation();

    let yesteryesterday = new Date();
    yesteryesterday.setDate(yesteryesterday.getDate() - 2);
    const day = yesteryesterday.getDate();
    const locale = 'en-us';
    const month = yesteryesterday.toLocaleString(locale, { month: "long" });
    const year = yesteryesterday.getFullYear();
    
    $('.date').text(' ' + month + ' ' + day + ', ' + year + ', ');

});

// If the user changes cities, reinitialize the map
$('#cities').change(initMap);

// Social ads tracking
$('.start-playing').click(function() {
  fbq('track', 'ViewContent');
});

// Smooth scrolling from CSS Tricks
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    }
  });