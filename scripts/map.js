let map;

$(document).ready(function () {
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
