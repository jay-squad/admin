$(document).ready(function() {
    $( "#search-restaurant" ).click(function() {
      window.location.href = "pages/forms/restaurant_search.html";
    });

    $( "#create-restaurant" ).click(function() {
      window.location.href = "pages/forms/new_restaurant.html";
    });

    $( "#approve-dishes" ).click(function() {
      window.location.href = "pages/forms/approve_dishes.html";
    });

    $.ajaxSetup({ cache: true });
});
