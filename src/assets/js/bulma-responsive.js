document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  var $navItems = Array.prototype.slice.call(document.querySelectorAll('.mobileLink'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
  // Check if there are any navbar items with class .mobileLink
  if($navItems.length > 0) {

    // Add a click event on each of them
    $navItems.forEach(function ($e1) {
      $e1.addEventListener('click', function() {
        // Get the target from the "data-target" attribute
        var target = "navbarExampleTransparentExample"
        var $target = document.getElementById(target);

        var target2 = "navbarBurger"
        var $target2 = document.getElementById(target2);


        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $target.classList.toggle('is-active');
        $target2.classList.toggle('is-active');
      })
    })
  }

});
