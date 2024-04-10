function r_e(id) {
  return document.querySelector(`#${id}`);
}

// configure the message bar
function configure_message_bar(msg) {
  // enforce message bar being visible
  r_e("message_bar").classList.remove("is-hidden");

  // alert(msg);
  r_e("message_bar").innerHTML = msg;

  // hide the message bar after 1 seconds
  setTimeout(() => {
    r_e("message_bar").innerHTML = ""; //clear the text from the message bar
    r_e("message_bar").classList.add("is-hidden");
  }, 4000);
}

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

  // Function to animate typing with a delay between sentences and letter-by-letter appearance
  async function typewriterWithDelay(textElement, delay) {
    if (!textElement) {
      console.error("Element not found:", textElement);
      return;
    }

    var text = textElement.textContent.trim();
    textElement.textContent = ""; // Clear existing text

    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          textElement.textContent += text[i]; // Append each character
          resolve();
        }, delay);
      });
    }
  }

  // Function to animate typing for each sentence with a delay between sentences
  async function animateSentences(sentences, delay) {
    for (const sentence of sentences) {
      await typewriterWithDelay(sentence, delay);
      await new Promise((resolve) => setTimeout(resolve, delay * 10)); // Delay between sentences
    }
  }

  // click test page nav actions
  testLink.addEventListener("click", async function (event) {
    // hide other html page
    homePage.style.display = "none";
    executiveLeadersPage.style.display = "none";
    votingPage.style.display = "none";
    aboutUsPage.style.display = "none";
    title1.style.display = "none";

    testPage.style.display = "block";

    // Prevent the default link behavior
    event.preventDefault();

    var firstSentence = document.querySelector("#main1");
    var secondSentence = document.querySelector("#main2");
    var thirdSentence = document.querySelector("#main3");

    const delay = 100; // Delay between each character in milliseconds

    await animateSentences(
      [firstSentence, secondSentence, thirdSentence],
      delay
    );
  });

  // login modal
  const logIn = document.querySelector("#logIn");
  const modalLogin = document.querySelector("#modalLogin");
  const loginBackground = document.querySelector("#loginBackground");
  const logInButton = document.querySelector("#LoginButton");

  r_e("loginFB").addEventListener("submit", (e) => {
    e.preventDefault(); //prevent default behaviour of browser (no page refresh)

    // grab the email and password combination from the form

    let email = r_e("email_").value;
    let password = r_e("password_").value;

    // call the Firebase function to sign-in the user

    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // console.log(`${user.user.email} is successfully logged in!`);

        // reset the form
        // r_e('loginFB').reset();

        // close the modal
        r_e("modalLogin").classList.remove("is-active");
      })
      .catch((err) => {
        r_e("modalLogin").classList.remove("is-active");
        configure_message_bar(`Email or password is incorrect.`);

        r_e("loginFB").reset();
      });
  });

  // sign out user
  //test
  // r_e("signoutbtn").addEventListener("click", () => {
  //   auth.signOut().then(() => {});
  // });

  // sign up modal - using js for login modals - code below is here just in case
  const signUp = document.querySelector("#signUp");
  const modalSignUp = document.querySelector("#modalSignUp");
  const signupBackground = document.querySelector("#signupBackground");

  signUp.addEventListener("click", () => {
    // console.log("signup button has been clicked");
    modalSignUp.classList.add("is-active");
  });

  signupBackground.addEventListener("click", () => {
    modalSignUp.classList.remove("is-active");
  });

  r_e("signUpFB").addEventListener("submit", (e) => {
    e.preventDefault(); //prevent default behaviour of browser (no page refresh)

    // grab the email and password combination from the form

    let email = r_e("email").value;
    let password = r_e("password").value;
    let auth = firebase.auth();

    // call the Firebase function to create the user

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(`${user.user.email} is successfully created!`);

        // show sign up successful message on message bar
        configure_message_bar(`${user.user.email} is successfully created!`);

        // reset the form
        // r_e('signup_form').reset();

        // close the modal + setup correct buttons
        r_e("modalSignUp").classList.remove("is-active");
        r_e("logOut").classList.remove("is-hidden");
      })
      .catch((err) => {
        r_e("modalSignUp").classList.remove("is-active");
        configure_message_bar(`${err.message} Please try a different account.`);

        // reset the form
        r_e("signUpFB").reset();

        // modalSignUp.querySelector('.error').innerHTML = err.message;
      });
  });

//   // Get the currently authenticated user
//   var user = firebase.auth().currentUser;

//   // If a user is signed in
//   if (user) {
//     // Get the UID of the user
//     var uid = user.uid;

//     // Reference to Firestore
//     var db = firebase.firestore();

//     // Example data to be saved
//     var documentData = {
//       email: "Example Email",
//       password: "Password",
//       user_type: "Admin",
//       vote: "Lead_Poisoning",
//     };

//     // Define the document reference using the UID
//     var docRef = db.collection("users").doc(uid);

//     // Save the data to Firestore
//     docRef
//       .set(documentData)
//       .then(function () {
//         console.log("Document successfully written!");
//       })
//       .catch(function (error) {
//         console.error("Error writing document: ", error);
//       });
//   } else {
//     console.log("No user signed in.");
//   }
// });
