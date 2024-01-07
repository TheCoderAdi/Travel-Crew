$(document).ready(function () {
  $("#signUp").click(function () {
    $("#container").addClass("right-panel-active");
  });
  $("#signIn").click(function () {
    $("#container").removeClass("right-panel-active");
  });
  $("#test-account").click(function () {
    $("#email").val("test@gmail.com");
    $("#password").val("test");
  });
  $("#sign-in").click(function (e) {
    e.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    console.log({ email, password });
    if (email == "test@gmail.com" && password == "test") {
      localStorage.setItem("email", email);
      localStorage.setItem("name", "Test");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1000);
    }
  });
});
