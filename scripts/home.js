function adjustLayout() {
  var width = $(window).width();
  if (width < 770) {
    $(".shapes").hide();
    $("main ,div").removeClass("container");
  } else {
    $(".shapes").show();
    $("main ,.off-content").addClass("container");
  }
  if (width < 768) {
    $(".container-2").removeClass("px-5");
    $(".remove-ps").removeClass("ps-5").addClass("ps-3");
    $(".about-btn").removeClass("ms-5").addClass("ms-3");
    $(".get-about").addClass("about");
  } else {
    $(".container-2").eq(1).addClass("px-5");
    $(".remove-ps").addClass("ps-5").removeClass("ps-3");
    $(".about-btn").addClass("ms-5").removeClass("ms-3");
    $(".get-about").removeClass("about");
  }
  if (width < 992) {
    $(".md-2-class").removeClass("col-md-2").addClass("col-md-4");
  } else {
    $(".md-2-class").removeClass("col-md-4").addClass("col-md-2");
  }
  if (width <= 900) {
    $(".navbar-brand").html("Travel Crew");
  } else {
    $(".navbar-brand").html(
      `<img src="./images/logo.png" alt="logo" style="width: 17vw; height: 9vh" />`
    );
  }
}

function checkHeight() {
  var height = $(window).scrollTop();
  if (height > 60) {
    $(".scroll-to-top").show();
  } else {
    $(".scroll-to-top").hide();
  }
}

function showPlane() {
  $(".navbar-brand").hide();
  setTimeout(() => {
    $(".navbar-brand").show();
  }, 1600);
  setTimeout(() => {
    $(".plane").hide();
  }, 1800);
}

$(document).ready(function () {
  var width = $(window).width();

  $(".plane").css("animation", "udanta-plane 3s linear");

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

  adjustLayout();
  checkHeight();
  $(window).resize(function () {
    adjustLayout();
  });
  $(window).scroll(function () {
    checkHeight();
  });
  $(".scroll-to-top").click(function () {
    $("html, body").scrollTop(0);
  });

  if (width >= 900) {
    $(".plane").show();
    showPlane();
  } else {
    $(".plane").hide();
  }
});
