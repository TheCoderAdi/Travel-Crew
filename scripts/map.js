function adjustLayout() {
  var width = $(window).width();
  if (width <= 900) {
    $(".navbar-brand").html("Travel Crew");
  } else {
    $(".navbar-brand").html(
      `<img src="./images/logo.png" alt="" style="width: 25vw; height: 13vh" />`
    );
  }
}

let map;

$(document).ready(function () {
  adjustLayout();
  var user = localStorage.getItem("email");
  if (user) $(".auth").html("Logout");
  else $(".auth").html("Login");

  $(".auth").click(function (e) {
    e.preventDefault();
    if ($(".auth").html() == "Login") {
      window.location.href = "login.html";
    } else {
      window.location.href = "login.html";
      localStorage.removeItem("email");
      localStorage.removeItem("name");
    }
  });
  $(window).resize(function () {
    adjustLayout();
  });
  map = L.map("map").setView([20.2976, 85.8173], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let marker;
  let loading = false;

  $("#search-button").click(getAddress);
  $("#search-input").keypress(function (e) {
    if (e.which == 13) {
      getAddress();
    }
  });

  function getAddress() {
    loading = true;
    updateLoadingState();

    const address = $("#search-input").val();
    if (!address) {
      alert("Please enter an address");
      loading = false;
      updateLoadingState();
      return;
    }

    $.getJSON(
      `https://nominatim.openstreetmap.org/search?format=json&q=${address}`,
      function (data) {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          map.setView([lat, lon], 15);

          if (marker) {
            map.removeLayer(marker);
          }
          marker = L.marker([lat, lon]).addTo(map);
          marker.bindPopup(`<b>${address}</b>`).openPopup();
        } else {
          alert("Location not found");
        }
        loading = false;
        updateLoadingState();
      }
    ).fail(function () {
      alert("An error occurred while fetching the location");
      loading = false;
      updateLoadingState();
    });
  }

  function updateLoadingState() {
    if (loading) {
      $("#search-button").html(
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...'
      );
      $(".loader").css("display", "block");
      $("#map").css({
        opacity: "0.5",
        "pointer-events": "none",
      });
    } else {
      $("#search-button").html("Search");
      $(".loader").css("display", "none");
      $("#map").css({
        opacity: "1",
        "pointer-events": "auto",
      });
    }
  }
});
