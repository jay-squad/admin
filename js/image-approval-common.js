function imageStatusApprove(restaurant_id, item_id, image_link) {
  $.ajax({
      type: 'PUT',
      url: `${FOODIE_SERVER_BASE}/restaurant/${restaurant_id}/item/${item_id}/image`,
      data: {"approval_status": "approved", "item_image": image_link},
      dataType: 'json',
      xhrFields: { withCredentials:true },
      success: function(json) {
        setImageStatusButton(restaurant_id, item_id, image_link, "approved");
         //window.location.reload();
      }
  })
}

function imageStatusReject(restaurant_id, item_id, image_link) {
  $.ajax({
      type: 'PUT',
      url: `${FOODIE_SERVER_BASE}/restaurant/${restaurant_id}/item/${item_id}/image`,
      data: {"approval_status": "rejected", "item_image": image_link},
      dataType: 'json',
      xhrFields: { withCredentials:true },
      success: function(json) {
        setImageStatusButton(restaurant_id, item_id, image_link, "rejected");
         //window.location.reload();
      }
  })
}

function setImageStatusButton(restaurant_id, item_id, image_link, status) {
  var html;
  if (status === "pending") {
    html = `<button class="btn btn-warning btn-sm" width="45%" value="approve" onclick="imageStatusApprove('${restaurant_id}','${item_id}','${image_link}')">✔</button>
            <button class="btn btn-outline-warning btn-sm" width="45%" value="reject" onclick="imageStatusReject('${restaurant_id}','${item_id}','${image_link}')">x</button>`;

    document.getElementById("img_"+image_link).setAttribute("style", "opacity: 1; border:5px solid orange;");
  } else if (status === "approved") {
    html = `<button class="btn btn-outline-primary btn-sm" id="approved-image-button" onclick="imageStatusReject('${restaurant_id}','${item_id}','${image_link}')"><span>Approved</span></button>`;

    document.getElementById("img_"+image_link).setAttribute("style", "opacity: 1;");
  } else {
    html = `<button class="btn btn-outline-secondary btn-sm" id="rejected-image-button" onclick="imageStatusApprove('${restaurant_id}','${item_id}','${image_link}')"><span>Rejected</span></button>`;

    document.getElementById("img_"+image_link).setAttribute("style", "opacity: 0.5;");
  }

  document.getElementById(image_link).innerHTML = html;
}

