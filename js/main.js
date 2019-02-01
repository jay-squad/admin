$(document).ready(function() {
    $( "#search-restaurant" ).click(function() {
      window.location.href = "pages/forms/restaurant_search.html";
    });

    $( "#create-restaurant" ).click(function() {
      window.location.href = "pages/forms/new_restaurant.html";
    });

    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
          appId: '2097330147147894',
          version: 'v3.2' // or v2.1, v2.2, v2.3, ...
        });
        FB.getLoginStatus(statusChangeCallback);
    });
});

function statusChangeCallback(response) {

    if(response.status == 'connected') {
        FB.api('/me', function(fb_me) {
            $('#fb-status').text("FB Connected: " + fb_me.name);
         });
        $('#fb-login-button').hide();
        setCookie("fb_access_token", response.authResponse.accessToken, response.authResponse.expiresIn)
    } else {
        $('#fb-login-button').show();
    }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function setCookie(cname, cvalue, expire_secs) {
    var d = new Date(Date.now() + expire_secs*1000);
    var expires = "expires="+ d.toUTCString();
    var cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=foodie-server-prod.herokuapp.com;"
    document.cookie = cookie;
}
