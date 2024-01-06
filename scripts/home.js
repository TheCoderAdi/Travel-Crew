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
}

function checkHeight() {
  var height = $(window).scrollTop();
  if (height > 60) {
    $(".scroll-to-top").show();
  } else {
    $(".scroll-to-top").hide();
  }
}

$(document).ready(function () {
  $(".navbar-brand").hide();
  $(".plane").css("animation", "udanta-plane 3s linear");

  setTimeout(() => {
    $(".navbar-brand").show();
  }, 1600);
  setTimeout(() => {
    $(".plane").hide();
  }, 1800);

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
});
