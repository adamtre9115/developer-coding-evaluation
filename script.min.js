// contact form

// Grab submit button
var submit = document.querySelector("#submit");

submit.addEventListener("click", function(e) {
  //Gather all input fields from the contact form
  var name = document.querySelector("#name").value;
  var email = document.querySelector("#email").value;
  var message = document.querySelector("#message").value;
  var form = document.querySelector("#form");

  e.preventDefault();
  // place values into an oblect to send to imaginary server
  formMessage = {
    name: name,
    email: email,
    message: message
  };
  //   Gotcha, there is no server, take this message instead
  console.log(`This form doesn't go anywhere but thanks for using ${name}!`);

// clear the form 
  form.reset();
});
