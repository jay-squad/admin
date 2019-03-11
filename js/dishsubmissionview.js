let uploaded = {};
let restaurant_id = 0;
let promise = $.Deferred().resolve().promise();

// wait for the DOM to be loaded
$(document).ready(function() {
      $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
        if (results==null){
           return null;
        }
        else{
           return results[1] || 0;
        }
      }
      restaurant_id = $.urlParam("id");
      var title = document.createElement('h4');
      title.setAttribute('class', 'card-title');
      title.textContent = 'Restuarant id: '+ restaurant_id;
      $('#dishes-container').prepend(title);

      var d = new Date();
      d.setMinutes(d.getMinutes() + 30);

      // Some options to pass to the uploader are discussed on the next page
      var uploader = new qq.s3.FineUploader({
          element: document.getElementById("uploader"),
          request: {
              endpoint: 'https://foodie-prod-menu-item-images.s3.amazonaws.com',
          },
          credentials: {
              accessKey: 'AKIAIFYHWL2HA2CTAWFQ',
              secretKey: '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',
              expiration: d
          },
          signature: {
              version: 4
          },
          objectProperties: {
              region: 'us-east-2',
              acl: 'public-read-write',
              key: function(id) {
                  uploaded[id] = 'admin/' + uuidv4() + '.png';
                  return uploaded[id];
              }
          },
          callbacks: {
              onComplete: function(id, name, responseJSON, xhr) {
                  uploaded[id] = 'https://s3.us-east-2.amazonaws.com/foodie-prod-menu-item-images/' + uploaded[id]
              },
              onAllComplete: function(succeeded, failed) {
                  for (id in succeeded) {
                      appendForm(id);
                  }
              }
          }
      });
});

function appendForm(id) {
    var f = document.createElement("form");
    f.setAttribute('method',"post");
    f.setAttribute('action',"https://foodie-server-prod.herokuapp.com/restaurant/" + restaurant_id + "/item");
    // f.setAttribute('target',"_blank");
    f.setAttribute('class',"forms-sample");

    var spacer = document.createElement("div");
    spacer.setAttribute('style', 'height:150px;');
    f.appendChild(spacer);

    var imgthumb = document.createElement("img");
    imgthumb.setAttribute('src', uploaded[id]);
    imgthumb.setAttribute('style', 'width: 150px; height: 150px;');
    f.appendChild(imgthumb);

    var formgroup = document.createElement("div");
    formgroup.setAttribute('class', 'form-group');
    formgroup.appendChild(imgthumb);

    f.appendChild(formgroup);

    addTextFormComponent('section_name', 'Section Name', 'dish section in menu', f);
    addTextFormComponent('item_name', 'Dish Name', 'dish name', f);
    addTextFormComponent('price', 'Price', 'price', f);
    addTextFormComponent('description', 'Description', 'description', f);
    addTextFormComponent('item_image', 'Image', uploaded[id], f, false);

    var submitbtn = document.createElement("button");
    submitbtn.setAttribute('type','submit');
    submitbtn.setAttribute('class','btn btn-success mr-2');
    submitbtn.setAttribute('id', 'submit-'+id)
    submitbtn.textContent = "Submit"
    f.appendChild(submitbtn);

    f.setAttribute('id','dish-form-'+id)
    $('#dishes-container').append(f);

    $('#dish-form-'+id).submit(function(event) {
            event.preventDefault();

            promise = promise.then(function() {
              return $.ajax({
                  type: 'POST',
                  url: $('#dish-form-'+id).attr('action'),
                  data: $('#dish-form-'+id).serialize(),
                  dataType: 'json',
                  success: function(json) {
                      document.getElementById('submit-'+id).textContent = "Success";
                      document.getElementById('submit-'+id).disabled = true;
                  },
                  error: function(json) {
                      document.getElementById('submit-'+id).textContent = "Failed, resubmit";
                  }
              });
            });

            return false;
      });
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

function addTextFormComponent(id, textContent, placeholder, form, isEnabled = true) {
    var div = document.createElement("div");
    div.setAttribute('class',"form-group");
    var label = document.createElement("label");
    label.setAttribute('for',id);
    label.textContent = textContent;
    var input = document.createElement("input");
    input.setAttribute('type','text');
    input.setAttribute('name',id);
    input.setAttribute('class','form-control');
    input.setAttribute('id',id);

    if (isEnabled) {
        input.setAttribute('placeholder',placeholder);
    } else {
        input.setAttribute('value', placeholder);
        input.readonly = true;
    }

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
}
