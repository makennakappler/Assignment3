document.addEventListener("DOMContentLoaded", function () {
  // Get navbar burger and menu
  const navbarBurger = document.querySelector(".navbar-burger");
  const navbarMenu = document.querySelector(".navbar-menu");

  // Toggle navbar menu on burger click
  navbarBurger.addEventListener("click", () => {
    navbarBurger.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  });

  // Find the link elements by their IDs
  var homePageLink = document.getElementById("homePageLink");
  var executiveLeadersLink = document.getElementById("executiveLeadersLink");
  var votingLink = document.getElementById("votingLink");
  var pastEventsLink = document.getElementById("pastEventsLink");
  var aboutUsLink = document.getElementById("aboutUsLink");
  var testLink = document.getElementById("testLink");

  // Find the section elements by their IDs
  var homePage = document.getElementById("homePage");
  var executiveLeadersPage = document.getElementById("executiveLeadersPage");
  var votingPage = document.getElementById("votingPage");
  var pastEventsPage = document.getElementById("pastEventsPage");
  var aboutUsPage = document.getElementById("aboutUsPage");
  var testPage = document.getElementById("testPage");

  // Click home page nav actions
  homePageLink.addEventListener("click", function (event) {
    homePage.style.display = "block";

    // hide other html pages
    executiveLeadersPage.style.display = "none";
    votingPage.style.display = "none";
    pastEventsPage.style.display = "none";
    aboutUsPage.style.display = "none";
    testPage.style.display = "none";
  });

  // click executive leaders page nav actions
  executiveLeadersLink.addEventListener("click", function (event) {
    // Prevent the default link behavior
    executiveLeadersPage.style.display = "block";

    // hide other html page
    homePage.style.display = "none";
    votingPage.style.display = "none";
    pastEventsPage.style.display = "none";
    aboutUsPage.style.display = "none";
    testPage.style.display = "none";
  });

  // click voting page page nav actions
  votingLink.addEventListener("click", function (event) {
    // Prevent the default link behavior
    votingPage.style.display = "block";

    // hide other html page
    homePage.style.display = "none";
    executiveLeadersPage.style.display = "none";
    pastEventsPage.style.display = "none";
    aboutUsPage.style.display = "none";
    testPage.style.display = "none";
  });

  // click voting page page nav actions
  pastEventsLink.addEventListener("click", function (event) {
    // Prevent the default link behavior
    pastEventsPage.style.display = "block";

    // hide other html page
    homePage.style.display = "none";
    executiveLeadersPage.style.display = "none";
    votingPage.style.display = "none";
    aboutUsPage.style.display = "none";
    testPage.style.display = "none";
  });

  // click about us page nav actions
  aboutUsLink.addEventListener("click", function (event) {
    // Prevent the default link behavior
    aboutUsPage.style.display = "block";

    // hide other html page
    homePage.style.display = "none";
    executiveLeadersPage.style.display = "none";
    votingPage.style.display = "none";
    pastEventsPage.style.display = "none";
    testPage.style.display = "none";
  });

  // Function to animate typing
  function typewriter(header, delay) {
    var text = header.textContent.trim();
    header.textContent = ""; // Clear existing text

    for (var i = 0; i < text.length; i++) {
      (function (i) {
        setTimeout(function () {
          header.textContent += text[i];
        }, i * delay);
      })(i);
    }
  }

  // click test page nav actions
  testLink.addEventListener("click", function (event) {
    // Prevent the default link behavior
    testPage.style.display = "block";

    // Call the typewriter function for each header
    var headers = document.querySelectorAll("h1, h2, h3");
    const delay = 100; // Delay between each character in milliseconds

    headers.forEach(function (header) {
      typewriter(header, delay);
    });

    // hide other html page
    homePage.style.display = "none";
    executiveLeadersPage.style.display = "none";
    votingPage.style.display = "none";
    aboutUsPage.style.display = "none";
    title1.style.display = "none";
  });

  // login modal
  const logIn = document.querySelector("#logIn");
  const modalLogin = document.querySelector("#modalLogin");
  const loginBackground = document.querySelector("#loginBackground");

  logIn.addEventListener("click", () => {
    console.log("login button has been clicked");
    modalLogin.classList.add("is-active");
  });

  loginBackground.addEventListener("click", () => {
    modalLogin.classList.remove("is-active");
  });
  //

  // sign up modal - using js for login modals - code below is here just in case
  const signUp = document.querySelector("#signUp");
  const modalSignUp = document.querySelector("#modalSignUp");
  const signupBackground = document.querySelector("#signupBackground");

  signUp.addEventListener("click", () => {
    console.log("signup button has been clicked");
    modalSignUp.classList.add("is-active");
  });

  signupBackground.addEventListener("click", () => {
    modalSignUp.classList.remove("is-active");
  });

  // sign up user

  // signUp.addEventListener("submit", (e) => {
  //   e.preventDefault(); //prevent default behaviour of browser (no page refresh)

  //   // grab the email and password combination from the form

  //   let email = docuement.querySelector("email").value;
  //   let password = document.querySelector("password").value;

  //   // call the Firebase function to create the user

  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       // console.log(`${user.user.email} is successfully created!`);

  //       // show sign up successful message on message bar
  //       configure_message_bar(`${user.user.email} is successfully created!`);

  //       // reset the form

  //       // close the modal
  //       document.querySelector("modalSignUp").classList.remove("is-active");
  //     })
  //     .catch((err) => {
  //       document.querySelector("modalSignUp").classList.remove("is-active");
  //       configure_message_bar(`${err.message} Please try a different account.`);

  // // reset the form
  // docuement.querySelector("signUp").reset();

  // modalSignUp.querySelector('.error').innerHTML = err.message;
});
// });
// });
