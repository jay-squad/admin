let promise = $.Deferred().resolve().promise();

// wait for the DOM to be loaded
$(document).ready(function() {
    $('#myForm').submit(function() {
        const query = $('#myForm').serializeArray()[0].value;

        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            dataType:'json',
            responseType:'application/json',
            url: $(this).attr('action') + '/' + query,
            success: function(json) {
                $('#search-result').empty();

                $.each(json, function(index, value) {
                    appendResult(value["restaurant"]);
                });
            }
        })
        return false;
    });
});

function appendResult(restaurant) {
    $(`<div class="row" id="result-id-${restaurant["id"]}">
              <div class="col-md-3"></div>
              <div class="col-md-6 d-flex align-items-stretch grid-margin">
                <div class="row flex-grow">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">${restaurant["name"]}</h4>
                        <p class="card-description">${restaurant["description"]}</p>
                        <p>
                        <b>ID:</b> ${restaurant["id"]}<br>
                        <b>Cuisine Type:</b> ${restaurant["cuisine_type"]}<br>
                        <b>Latitude:</b> ${restaurant["latitude"]}<br>
                        <b>Longitude:</b> ${restaurant["longitude"]}<br>
                        <b>Phone Number:</b> ${restaurant["phone_number"]}<br>
                        <b>Website:</b> ${restaurant["website"]}
                        </p>
                        <form class="forms-sample" id="myForm2" action="https://foodie-server-prod.herokuapp.com/restaurant" method="post">
                          <button type="button" class="btn btn-info mr-2" onclick="onClickInfo(${restaurant["id"]})">Edit Info</button>
                          <button type="button" class="btn btn-light" onclick="onClickAdd(${restaurant["id"]})">Add Menu Item</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`).appendTo($('#search-result'));
}

function onClickInfo(id) {
    window.location.href = "update_restaurant.html?id="+id;
}

function onClickAdd(id) {
    window.location.href = "dish_upload.html?id="+id;
}

