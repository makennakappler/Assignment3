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
  // sign out any old sessions
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });

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

  // Event listener for executive leaders link
  executiveLeadersLink.addEventListener("click", function (event) {
    executiveLeadersPage.style.display = "block";

    // Hide other HTML pages
    homePage.style.display = "none";
    votingPage.style.display = "none";
    pastEventsPage.style.display = "none";
    aboutUsPage.style.display = "none";
    testPage.style.display = "none";
  });

  // Event listener for voting page link
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
  // if we want vote page to only be visable if logged in
  // var user = auth.currentUser;

  // if (user) {
  //   // User is logged in
  //   console.log("User is signed in:", user);
  //   // Show executive leaders page
  //   votingLink.addEventListener("click", function (event) {
  //     // Prevent the default link behavior
  //     votingPage.style.display = "block";

  //     // hide other html page
  //     homePage.style.display = "none";
  //     executiveLeadersPage.style.display = "none";
  //     pastEventsPage.style.display = "none";
  //     aboutUsPage.style.display = "none";
  //     testPage.style.display = "none";
  //   });
  // } else {
  //   // No user signed in
  //   homePage.style.display = "none";
  //   executiveLeadersPage.style.display = "none";
  //   pastEventsPage.style.display = "none";
  //   aboutUsPage.style.display = "none";
  //   testPage.style.display = "none";
  //   // Optionally, you can display a message or redirect to a login page
  //   configure_message_bar("You need to be logged in to access this page.");
  // }

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
  let auth = firebase.auth();

  logIn.addEventListener("click", () => {
    // console.log("signup button has been clicked");
    modalLogin.classList.add("is-active");
  });

  loginBackground.addEventListener("click", () => {
    modalLogin.classList.remove("is-active");
  });

  r_e("loginFB").addEventListener("submit", (e) => {
    e.preventDefault(); //prevent default behaviour of browser (no page refresh)

    // grab the email and password combination from the form

    let email = r_e("email_").value;
    let password = r_e("password_").value;
    // set authorization variable
    let auth = firebase.auth();

    // call the Firebase function to sign-in the user

    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(`${user.user.email} is successfully logged in!`);

        // reset the form
        // r_e('loginFB').reset();

        // close the modal
        r_e("modalLogin").classList.remove("is-active");
        r_e("logOut").classList.remove("is-hidden");
        r_e("userName").innerHTML = user.user.email;
        r_e("userName").classList.remove("is-hidden");
        configure_message_bar(`${user.user.email} sucessfully logged in`);
      })
      .catch((err) => {
        r_e("modalLogin").classList.remove("is-active");
        configure_message_bar(`Email or password is incorrect.`);

        r_e("loginFB").reset();
      });

    // sign out button
    r_e("logOut").addEventListener("click", () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          r_e("userName").classList.add("is-hidden");
        })
        .catch((error) => {
          // An error happened.
        });
      r_e("logOut").classList.add("is-hidden");
    });

    var user = firebase.auth().currentUser;

    if (user) {
      // Get the Email of the user
      var user_email = user.email;
      //console.log(user);

      // Reference to Firestore
      var db = firebase.firestore();

      // Example data to be saved
      var documentData = {
        email: user_email,
        user_type: "Admin",
        vote: "Medical Malpractice",
      };

      // Define the document reference using the UID
      var docRef = db.collection("users").doc(user_email);
      //.collection("documents")
      //.doc();

      // Save the data to Firestore
      docRef
        .set(documentData)
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    } else {
      console.log("No user signed in.");
    }
  });

  // sign out button
  r_e("logOut").addEventListener("click", () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("sucessfully signed out");
      })
      .catch((error) => {
        // An error happened.
      });
    r_e("logOut").classList.add("is-hidden");
  });

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
});

// show doc of past events

document.querySelector("#showFormButton").addEventListener("click", () => {
  r_e("showFormButton").classList.add("is-hidden");
  r_e("hideFormButton").classList.remove("is-hidden");
  r_e("event_form").classList.remove("is-hidden");

  let html = ``;
  html += `<form id="myForm">
    <!-- Your form fields go here -->
    <label> Event Name </label>
    <input type="text" id="event_name"><br><br>
    <label>Date:</label>
    <input type="date" id="event_date"><br><br>
    <label>Location:</label>
    <input type="location" id="event_location"><br><br>
    <label>Description:</label>
    <input type="text" id="event_description"><br><br>
    <button id="submit">Submit</button>`;
  document.querySelector("#event_form").innerHTML = html;
});

//Submit form to dbv
document.querySelector("#event_form").addEventListener("click", (e) => {
  let db = firebase.firestore();
  if (e.target && e.target.id === "submit") {
    e.preventDefault(); // Prevent default behavior of browser (no page refresh)
    // Construct event object
    let event = {
      name: document.querySelector("#event_name").value,
      date: Date(document.querySelector("#event_date").value),
      location: document.querySelector("#event_location").value,
      description: document.querySelector("#event_description").value,
    };
    // Store event object into collection
    db.collection("events")
      .add(event)
      .then(() => alert("Event added"));
  }
});

// show doc of past events

document.querySelector("#showFormButton").addEventListener("click", () => {
  let html = ``;
  html += `<div class= "pastevent has-text-centered"><form id="myForm">
  <!-- Your form fields go here -->
  <h1 class="is-size-2"> Add a New Event </h1>
  <label> Event Name </label>
  <input type="text" id="event_name"><br><br>
  <label>Date:</label>
  <input type="date" id="event_date"><br><br>
  <label>Location:</label>
  <input type="location" id="event_location"><br><br>
  <label>Description:</label>
  <input type="text" id="event_description"><br><br>
  <button id="submit">Submit</button></div>`;
  document.querySelector("#event_form").innerHTML = html;
});

// hide past events button
document.querySelector("#hideFormButton").addEventListener("click", () => {
  r_e("showFormButton").classList.remove("is-hidden");
  r_e("hideFormButton").classList.add("is-hidden");
  r_e("event_form").classList.add("is-hidden");
});

//Submit form to dbv
document.querySelector("#event_form").addEventListener("click", (e) => {
  let db = firebase.firestore();
  if (e.target && e.target.id === "submit") {
    e.preventDefault(); // Prevent default behavior of browser (no page refresh)
    // Construct event object
    let event = {
      name: document.querySelector("#event_name").value,
      date: date(document.querySelector("#event_date").value),
      location: document.querySelector("#event_location").value,
      description: document.querySelector("#event_description").value,
    };
    // Store event object into collection
    db.collection("events")
      .add(event)
      .then(() => alert("Event added"));
  }
});

document.querySelector("#submitvote").addEventListener("click", () => {
  // Check if the user is logged in
  db = firebase.firestore();
  const user = firebase.auth().currentUser;
  if (user) {
    // User is logged in
    const userId = user.uid; // Get the user's unique ID

    // Check if the user has already voted
    const voteRef = db.collection("voteresults").doc(userId);
    voteRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // User has already voted
          configure_message_bar("You have already voted.");
        } else {
          // User has not voted yet, proceed to add the vote
          const vote = {
            userId: userId,
            vote: document.querySelector("#eventvote").value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          };

          // Add the vote to the voteresults collection
          db.collection("voteresults")
            .doc(userId)
            .set(vote)
            .then(() => alert("Vote counted!"))
            .catch((error) => console.error("Error adding vote:", error));
        }
      })
      .catch((error) => {
        console.error("Error checking vote:", error);
      });
  } else {
    // User is not logged in, prompt them to log in or sign up
    configure_message_bar("Please log in or sign up to vote.");
  }

  // voting chart

  // Reference to the canvas element
  const voteChartCanvas = document.getElementById("voteChart");

  // Initialize an empty chart
  const voteChart = new Chart(voteChartCanvas, {
    type: "bar",
    data: {
      labels: ["Disease A", "Disease B"],
      datasets: [
        {
          label: "Votes",
          data: [0, 0], // Initial vote counts for each disease
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Function to update the chart with live vote data
  function updateChart(voteData) {
    // Update the chart dataset with the new vote counts
    voteChart.data.datasets[0].data = [
      voteData.DiseaseA || 0,
      voteData.DiseaseB || 0,
    ];
    voteChart.update(); // Update the chart
  }

  // Real-time listener for vote data changes
  db.collection("voteresults").onSnapshot((snapshot) => {
    const voteData = {}; // Object to store vote counts
    snapshot.forEach((doc) => {
      const vote = doc.data();
      // Increment vote count for each disease
      if (vote.vote === "Disease A") {
        voteData.DiseaseA = (voteData.DiseaseA || 0) + 1;
      } else if (vote.vote === "Disease B") {
        voteData.DiseaseB = (voteData.DiseaseB || 0) + 1;
      }
    });
    // Update the chart with the latest vote data
    updateChart(voteData);
  });

  // Reference to the voting title element and update form
  const votingTitleElement = document.getElementById("votingTitle");
  const updateTitleForm = document.getElementById("updateTitleForm");
  const newTitleInput = document.getElementById("newTitleInput");

  // Function to update the voting title in Firestore
  function updateVotingTitle(newTitle) {
    const titleDocRef = db.collection("adminData").doc("votingTitle");
    titleDocRef
      .set({ title: newTitle })
      .then(() => {
        console.log("Voting title updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating voting title:", error);
      });
  }

  // Listen for form submission to update the title
  updateTitleForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const newTitle = newTitleInput.value.trim();
    if (newTitle) {
      updateVotingTitle(newTitle);
      newTitleInput.value = ""; // Clear the input field after update
    } else {
      console.error("Please enter a valid voting title.");
    }
  });

  // Fetch and display the current voting title from Firestore
  const titleDocRef = db.collection("adminData").doc("votingTitle");
  titleDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const titleData = doc.data();
        votingTitleElement.textContent = titleData.title;
      } else {
        console.error("No voting title found in Firestore.");
      }
    })
    .catch((error) => {
      console.error("Error fetching voting title:", error);
    });
});

//ANNOUNCEMENTS
//add announcments
// r_e("announcements_button").addEventListener("click", () => {
//   let html = ``;
//   html += `<div class= "has-text-centered"><form id="myannouncmentsform"><h1 class="is-size-5"> Add a new announcment </h1><label>Description:</label><textarea id="announcement_description"></textarea><br><br><button id="submit">Submit</button></div>`;
//   r_e("announcements_button").innerHTML = html;
// });

// //Submit form to db for announcments
// r_e("myannouncmentsform").addEventListener("click", (e) => {
//   let db = firebase.firestore();
//   if (e.target && e.target.id === "submit") {
//     e.preventDefault(); // Prevent default behavior of browser (no page refresh)
//     // Construct event object
//     let announcment = {
//       description: document.querySelector("#announcement_description").value,
//     };
//     // Store event object into collection
//     db.collection("announcments")
//       .add(announcment)
//       .then(() => alert("Event added"));
//   }
// });

// show doc of past events

r_e("showAnnouncementButton").addEventListener("click", () => {
  r_e("showAnnouncementButton").classList.add("is-hidden");
  r_e("hideAnnouncementButton").classList.remove("is-hidden");
  r_e("announcements_form").classList.remove("is-hidden");

  let html = ``;
  html += `<form id="myForm">
  <div class= "has-text-centered"><form id="myannouncmentsform"><h1 class="is-size-5"> Add a new announcement </h1><label>Description:</label><textarea id="announcement_description"></textarea><br><br><button id="submit">Submit</button></div>`;
  document.querySelector("#announcements_form").innerHTML = html;
});

//Submit form to dbv
r_e("announcements_form").addEventListener("click", (e) => {
  let db = firebase.firestore();
  if (e.target && e.target.id === "submit") {
    e.preventDefault(); // Prevent default behavior of browser (no page refresh)
    // Construct event object
    let announcement = {
      description: document.querySelector("#announcement_description").value,
    };
    // Store event object into collection
    db.collection("announcements")
      .add(announcement)
      .then(() => alert("announcments added"));
  }
});
