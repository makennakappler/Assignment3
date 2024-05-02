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
  // var testPage = document.getElementById("testPage");

  // Click home page nav actions
  homePageLink.addEventListener("click", function (event) {
    homePage.style.display = "block";

    // hide other html pages
    executiveLeadersPage.style.display = "none";
    votingPage.style.display = "none";
    pastEventsPage.style.display = "none";
    aboutUsPage.style.display = "none";
    // testPage.style.display = "none";
  });

  // Event listener for executive leaders link
  executiveLeadersLink.addEventListener("click", function (event) {
    executiveLeadersPage.style.display = "block";

    // Hide other HTML pages
    homePage.style.display = "none";
    votingPage.style.display = "none";
    pastEventsPage.style.display = "none";
    aboutUsPage.style.display = "none";
    // testPage.style.display = "none";
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
    // testPage.style.display = "none";
  });

  // voting admin availability
  // Check if the user is logged in and their email is admin@example.com
  firebase.auth().onAuthStateChanged(function (user) {
    if (user && user.email === "ardadmin@gmail.com") {
      document.getElementById("adminSection").style.display = "block";
    } else {
      document.getElementById("adminSection").style.display = "none";
    }
  });

  // Initialize Firebase Firestore
  var db = firebase.firestore();

  // Reference to the document in Firestore where you want to store the inputs
  var docRef = db.collection("votetitle").doc("Z52PouO3nYX49NhFNjyL");

  // this puts info from box into database
  // Add event listener to the Change Titles button
  document.getElementById("titleChange").addEventListener("click", () => {
    var dAValue = document.getElementById("d_a_box").value;
    var dBValue = document.getElementById("d_b_box").value;

    // Update the document in Firestore with the input values
    docRef
      .set({
        diseaseA: dAValue,
        diseaseB: dBValue,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });

  // Fetch the data from Firestore when HTML loads - this updates the titles to databse
  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        // Get the data from the document
        var data = doc.data();

        // Update the content of votingTitleA and votingTitleB
        votingTitleA.textContent = data.diseaseA;
        votingTitleB.textContent = data.diseaseB;

        console.log("Document data loaded successfully!");
      } else {
        console.log("No such document!");
        configure_message_bar("There was an error changing the titles");
      }
    })
    .catch(function (error) {
      console.error("Error getting document:", error);
    });

  // Initialize Firebase Firestore
  var db = firebase.firestore();

  // Reference to the document in Firestore where the labels are stored
  var docRef = db.collection("votetitle").doc("Z52PouO3nYX49NhFNjyL");

  // Get the canvas element for the pie chart
  var ctx = r_e("myPieChart").getContext("2d");

  // Initialize Chart.js with default labels
  var myPieChart;

  // Fetch the data from Firestore when HTML loads
  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        // Get the data from the document
        var data = doc.data();

        // Update the labels for the pie chart
        myPieChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: [data.diseaseA, data.diseaseB], // Update labels dynamically
            datasets: [
              {
                label: "Votes",
                data: [0, 0],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
              },
            ],
          },
        });

        console.log("Document data loaded successfully!");
      } else {
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.error("Error getting document:", error);
    });

  // Update Chart Data Function
  function updateChart(votesA, votesB) {
    myPieChart.data.datasets[0].data = [votesA, votesB];
    myPieChart.update();
  }

  // Logic for submitting vote for Option A
  submitvoteA.addEventListener("click", function () {
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection("voteresults")
        .where("userID", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // User has not voted yet, add a new vote for Option A
            db.collection("voteresults").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              userID: user.uid,
              votedFor: "Option A",
            });

            // Check if the document for Option A exists
            db.collection("votes")
              .doc("optionA")
              .get()
              .then((doc) => {
                if (doc.exists) {
                  // Increment count for Option A
                  db.collection("votes")
                    .doc("optionA")
                    .update({
                      count: firebase.firestore.FieldValue.increment(1),
                    });
                } else {
                  // Create a new document for Option A with count 1
                  db.collection("votes").doc("optionA").set({ count: 1 });
                }

                // Change button color to green
                submitvoteA.style.backgroundColor = "green";
                submitvoteB.style.backgroundColor = "white"; // Change the other button color back to white
              });
          } else {
            // User has already voted, show message or prevent further voting
            configure_message_bar("You have already voted.");
          }
        });
    } else {
      configure_message_bar("Please sign in to vote.");
    }
  });

  // Logic for submitting vote for Option B
  submitvoteB.addEventListener("click", function () {
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection("voteresults")
        .where("userID", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // User has not voted yet, add a new vote for Option B
            db.collection("voteresults").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              userID: user.uid,
              votedFor: "Option B",
            });

            // Increment count for Option B
            db.collection("votes")
              .doc("optionB")
              .update({ count: firebase.firestore.FieldValue.increment(1) });

            // Change button color to green
            submitvoteB.style.backgroundColor = "green";
            submitvoteA.style.backgroundColor = "white"; // Change the other button color back to white
          } else {
            // User has already voted, show message or prevent further voting
            configure_message_bar("You have already voted.");
          }
        });
    } else {
      configure_message_bar("Please sign in to vote.");
    }
  });

  // Check if "votes" collection is empty, add initial documents if needed
  db.collection("votes")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        // Collection is empty, add initial documents
        db.collection("votes").doc("optionA").set({ count: 0 });
        db.collection("votes").doc("optionB").set({ count: 0 });
      }
    });

  // Real-time Updates for Option A
  db.collection("votes")
    .doc("optionA")
    .onSnapshot((doc) => {
      if (doc.exists) {
        const votesA = doc.data()["count"];
        const votesB = myPieChart.data.datasets[0].data[1];
        updateChart(votesA, votesB);
      } else {
        console.log("Document not found");
      }
    });

  // Real-time Updates for Option B
  db.collection("votes")
    .doc("optionB")
    .onSnapshot((doc) => {
      if (doc.exists) {
        const votesA = myPieChart.data.datasets[0].data[0];
        const votesB = doc.data()["count"];
        updateChart(votesA, votesB);
      } else {
        console.log("Document not found");
      }
    });

  // Reference to the collection in Firestore where the vote counts are stored
  var votesRef = db.collection("votes");
  var voterResultsRef = db.collection("voteresults");

  // Add event listener to the chartReset button
  document.getElementById("chartReset").addEventListener("click", function () {
    // Reset counts in Firestore documents
    votesRef
      .doc("optionA")
      .update({
        count: 0,
      })
      .then(function () {
        console.log("Votes for Option A reset successfully!");
        configure_message_bar("Votes reset successfully");
      })
      .catch(function (error) {
        console.error("Error resetting votes for Option A:", error);
      });

    votesRef
      .doc("optionB")
      .update({
        count: 0,
      })
      .then(function () {
        console.log("Votes for Option B reset successfully!");
        // Update chart data after resetting votes
        myPieChart.data.datasets[0].data = [0, 0];
        myPieChart.update();
      })
      .catch(function (error) {
        console.error("Error resetting votes for Option B:", error);
      });

    // Clear all vote results documents in the collection
    voterResultsRef
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref
            .delete()
            .then(function () {
              console.log("Document deleted successfully!");
            })
            .catch(function (error) {
              console.error("Error deleting document:", error);
            });
        });
      })
      .catch(function (error) {
        console.error("Error getting documents:", error);
      });
  });
  // end of chart logic and initialization

  // click past events page nav actions
  pastEventsLink.addEventListener("click", function (event) {
    // Prevent the default link behavior
    pastEventsPage.style.display = "block";

    // hide other html page
    homePage.style.display = "none";
    executiveLeadersPage.style.display = "none";
    votingPage.style.display = "none";
    aboutUsPage.style.display = "none";
    // testPage.style.display = "none";
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
    // testPage.style.display = "none";
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

        // make username appear
        r_e("userName").innerHTML = user.user.email;

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

// PAST EVENTS
// show doc of past events
// Function to hide the form
// Function to hide the form
// function hideEventForm() {
//   r_e("showFormButton").classList.add("is-hidden");
//   r_e("hideFormButton").classList.add("is-hidden");
//   r_e("event_form").classList.add("is-hidden");
// }

// Function to check if the current user's email matches the allowed email address
function EventscheckAllowedEmail(id) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      // Check the email address of the user
      const allowedEmail = "ardadmin@gmail.com"; // Change this to the allowed email address

      if (user.email === allowedEmail) {
        // User's email matches the allowed email, show the form
        document.querySelector(id).classList.remove("is-hidden");
      } else {
        // User's email doesn't match the allowed email, hide the form
        //hideEventForm();
      }
    } else {
      // User is signed out.
      // Hide the form if the user is not logged in
      //hideEventForm();
    }
  });
}

// Event listener to show the form when the button is clicked
r_e("showFormButton").addEventListener("click", () => {
  r_e("showFormButton").classList.add("is-hidden");
  r_e("hideFormButton").classList.remove("is-hidden");
  r_e("event_form").classList.remove("is-hidden");

  let html = `<div class= "pastevent has-text-centered"><form id="eventForm">
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
    <input type="file" id="fileInput" name="fileInput">
    <button type="button" id="upload">Upload</button> </div>`;

  r_e("event_form").innerHTML = html;

  // Attach event listener for file upload
  r_e("upload").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (file) {
      // Create a storage reference
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);

      // Upload the file to Firebase Storage
      fileRef
        .put(file)
        .then((snapshot) => {
          console.log(
            "File uploaded successfully:",
            snapshot.metadata.fullPath
          );
          alert("File uploaded successfully!");

          // Once the file is uploaded, get its download URL
          return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
          // Get other form data
          let eventName = r_e("event_name").value;
          let eventDate = r_e("event_date").value;
          let eventLocation = r_e("event_location").value;
          let eventDescription = r_e("event_description").value;

          // Create an object with form data and download URL
          let eventData = {
            name: eventName,
            date: eventDate,
            location: eventLocation,
            description: eventDescription,
            imageUrl: downloadURL, // Add the download URL of the uploaded image
          };

          // Store event data into Firestore
          return firebase.firestore().collection("events").add(eventData);
        })
        .then(() => {
          // After successful upload to Firestore
          console.log("Event data added to Firestore");
          alert("Event data added to Firestore");
          r_e("eventForm").reset();
        })
        .catch((error) => {
          console.error("Error uploading file or adding event data:", error);
          alert("Error: " + error.message);
        });
    } else {
      alert("Please select a file to upload.");
    }
  });
});

// Event listener to hide the form when the button is clicked
document.querySelector("#hideFormButton").addEventListener("click", () => {
  document.querySelector("#showFormButton").classList.remove("is-hidden");
  document.querySelector("#hideFormButton").classList.add("is-hidden");
  document.querySelector("#event_form").classList.add("is-hidden");
});

function deleteEvent_doc(id) {
  let db = firebase.firestore();
  db.collection("events")
    .doc(id)
    .delete()
    .then(() => alert("user deleted!"));
}

function renderEvent(event) {
  let html = `
  <div class="pastevent">
    <h2 class="is-size-2">${event.name}</h2>
    <p class="is-size-5"><strong>Date:</strong> ${event.date}</p>
    <p class="is-size-5"><strong>Location:</strong> ${event.location}</p>
    <p class="is-size-5"><strong>Description:</strong> ${event.description}</p>
    <figure class="image">
      <img src="${event.imageUrl}" alt="Event image" />
    </figure>
    <button class ="is-hidden" id="deleteEvent_${event.id}" onclick="deleteEvent_doc('${event.id}')">Delete</button>
  </div>
  `;
  // Append new event to the existing list
  r_e("eventscontainer").innerHTML += html;
}

// Load announcements from Firebase when the page loads
window.addEventListener("load", () => {
  let db = firebase.firestore();
  db.collection("events")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Render each event
        renderEvent({ id: doc.id, ...doc.data() });
      });

      // Call the function to check allowed email when the page loads
      execCheckAllowedEmail("#showFormButton");

      // Loop through each delete button and call execCheckAllowedEmail for each
      querySnapshot.forEach((doc) => {
        execCheckAllowedEmail(`#deleteEvent_${doc.id}`);
      });
    })
    .catch((error) => console.error("Error getting events: ", error));
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

//ANNOUNCEMENTS
//add announcements

function hideAnnouncementsForm() {
  r_e("showAnnouncementButton").classList.add("is-hidden");
  r_e("hideAnnouncementButton").classList.add("is-hidden");
  r_e("announcements_form").classList.add("is-hidden");
}

// Function to check if the current user's email matches the allowed email address
function AnnouncecheckAllowedEmail(id) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      // Check the email address of the user
      const allowedEmail = "ardadmin@gmail.com"; // Change this to the allowed email address

      if (user.email === allowedEmail) {
        // User's email matches the allowed email, show the form
        document.querySelector(id).classList.remove("is-hidden");
      } else {
        // User's email doesn't match the allowed email, hide the form
        hideAnnouncementsForm();
      }
    } else {
      // User is signed out.
      // Hide the form if the user is not logged in
      hideAnnouncementsForm();
    }
  });
}

r_e("showAnnouncementButton").addEventListener("click", () => {
  r_e("showAnnouncementButton").classList.add("is-hidden");
  r_e("hideAnnouncementButton").classList.remove("is-hidden");
  r_e("announcements_form").classList.remove("is-hidden");

  let html = ``;
  html += `<form id="announcementsForm">
  <div class= "has-text-centered"><form id="myannouncmentsform"><h1 class="is-size-5"> Add a new announcement </h1><label>Description:</label><textarea id="announcement_description"></textarea><br><br><button id="submit">Submit</button></div>`;
  document.querySelector("#announcements_form").innerHTML = html;
});

//Submit form to db for announcements
r_e("showAnnouncementButton").addEventListener("click", (e) => {
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

function deleteAnnounce_doc(id) {
  let db = firebase.firestore();
  db.collection("announcements")
    .doc(id)
    .delete()
    .then(() => alert("user deleted!"));
}

function renderAnnouncement(announcement) {
  let html = `
    <div>
      <p>${announcement.description} <button class ="is-hidden" id="deleteAnnounce_${announcement.id}" onclick="deleteAnnounce_doc('${announcement.id}')">Delete</button></p>
      <div style="width: 100%; margin: 0 auto">
      <hr class="styled-hr" style="border-top: 2px solid black; width: 100%"/>
      </div>
      
    </div>
  `;
  // Append new announcement to the existing list
  document.querySelector("#announcements").innerHTML += html;
}

// Add event listener to show announcements
r_e("showAnnouncementButton").addEventListener("click", () => {
  r_e("showAnnouncementButton").classList.add("is-hidden");
  r_e("hideAnnouncementButton").classList.remove("is-hidden");
  r_e("announcements_form").classList.remove("is-hidden");
});

// Submit form to db for announcements
r_e("announcements_form").addEventListener("click", (e) => {
  let db = firebase.firestore();
  if (e.target && e.target.id === "submit") {
    e.preventDefault();
    let announcement = {
      description: document.querySelector("#announcement_description").value,
    };
    db.collection("announcements")
      .add(announcement)
      .then((docRef) => {
        // Update HTML with the new announcement
        renderAnnouncement({ id: docRef.id, ...announcement });
        alert("announcement added");
        r_e("announcementsForm").reset();
      });
  }
});

// Load announcements from Firebase when the page loads
window.addEventListener("load", () => {
  let db = firebase.firestore();
  db.collection("announcements")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Render each event
        renderAnnouncement({ id: doc.id, ...doc.data() });
      });

      // Call the function to check allowed email when the page loads
      AnnouncecheckAllowedEmail("#showAnnouncementButton");

      // Loop through each delete button and call execCheckAllowedEmail for each
      querySnapshot.forEach((doc) => {
        AnnouncecheckAllowedEmail(`#deleteAnnounce_${doc.id}`);
      });
    })
    .catch((error) => console.error("Error getting events: ", error));
});

r_e("hideAnnouncementButton").addEventListener("click", () => {
  r_e("showAnnouncementButton").classList.remove("is-hidden");
  r_e("hideAnnouncementButton").classList.add("is-hidden");
  r_e("announcements_form").classList.add("is-hidden");
});

// EXECUTIVE PAGE

function execCheckAllowedEmail(id) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      // Check the email address of the user
      const allowedEmail = "ardadmin@gmail.com"; // Change this to the allowed email address

      if (user.email === allowedEmail) {
        // User's email matches the allowed email, show the form
        document.querySelector(id).classList.remove("is-hidden");
      } else {
        // User's email doesn't match the allowed email, hide the form
        //hideEventForm();
      }
    } else {
      // User is signed out.
      // Hide the form if the user is not logged in
      //hideEventForm();
    }
  });
}

// Event listener to show the form when the button is clicked
r_e("showExecFormButton").addEventListener("click", () => {
  r_e("showExecFormButton").classList.add("is-hidden");
  r_e("hideExecFormButton").classList.remove("is-hidden");
  r_e("exec_form").classList.remove("is-hidden");

  let html = `<div class= "has-text-centered" style="border: 1px solid #ccc; border-radius: 5px;background-color: #f9f9f9;"><form id="eventForm">
    <!-- Your form fields go here -->
    <h1 class="is-size-2"> Change Executives </h1>
    <label> Exec Position </label>
    <input type="text" id="exec_position"><br><br>
    <label>Name:</label>
    <input type="text" id="exec_name"><br><br>
    <label>Description:</label>
    <input type="text" id="exec_description"><br><br>
    <input type="file" id="ExecfileInput" name="ExecfileInput">
    <button type="button" id="uploadPicture">Upload</button></div>`;

  r_e("exec_form").innerHTML = html;

  // Attach event listener for file upload
  r_e("uploadPicture").addEventListener("click", () => {
    const fileInput = document.getElementById("ExecfileInput");
    const file = fileInput.files[0];

    if (file) {
      // Create a storage reference
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);

      // Upload the file to Firebase Storage
      fileRef
        .put(file)
        .then((snapshot) => {
          console.log(
            "File uploaded successfully:",
            snapshot.metadata.fullPath
          );
          alert("File uploaded successfully!");

          // Once the file is uploaded, get its download URL
          return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
          // Get other form data
          let execPosition = r_e("exec_position").value;
          let execName = r_e("exec_name").value;
          let execDescription = r_e("exec_description").value;

          // Create an object with form data and download URL
          let execData = {
            position: execPosition,
            name: execName,
            description: execDescription,
            imageUrl: downloadURL, // Add the download URL of the uploaded image
          };

          // Store event data into Firestore
          return firebase.firestore().collection("executive").add(execData);
        })
        .then(() => {
          // After successful upload to Firestore
          console.log("Event data added to Firestore");
          alert("Event data added to Firestore");
        })
        .catch((error) => {
          console.error("Error uploading file or adding event data:", error);
          alert("Error: " + error.message);
        });
    } else {
      alert("Please select a file to upload.");
    }
  });
});

// Event listener to hide the form when the button is clicked
document.querySelector("#hideExecFormButton").addEventListener("click", () => {
  document.querySelector("#showExecFormButton").classList.remove("is-hidden");
  document.querySelector("#hideExecFormButton").classList.add("is-hidden");
  document.querySelector("#exec_form").classList.add("is-hidden");
});

function deleteExec_doc(id) {
  let db = firebase.firestore();
  db.collection("executive")
    .doc(id)
    .delete()
    .then(() => alert("user deleted!"));
}

function renderExec(exec) {
  let html = `
  <div class="executiveholder">
    <figure class="image" style="width: 100%; height: 350px; border-radius: 50%; margin-bottom: 10px;">
      <img src="${exec.imageUrl}" alt="Exec image" />
    </figure>
    <p class="is-size-4"><b>${exec.position}</b></p>
    <p class="is-size-5"><strong>Name:</strong> ${exec.name}</p>
    <br>
    <p class="is-size-5"><strong>Bio:</strong> ${exec.description}</p>
    <button class ="is-hidden" id="deleteExec_${exec.id}" onclick="deleteExec_doc('${exec.id}')">Delete</button>
  </div>
  `;
  // Append new event to the existing list
  r_e("exec_section").innerHTML += html;
}

// Load announcements from Firebase when the page loads
window.addEventListener("load", () => {
  let db = firebase.firestore();
  db.collection("executive")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Render each event
        renderExec({ id: doc.id, ...doc.data() });
      });

      // Call the function to check allowed email when the page loads
      execCheckAllowedEmail("#showExecFormButton");

      // Loop through each delete button and call execCheckAllowedEmail for each
      querySnapshot.forEach((doc) => {
        execCheckAllowedEmail(`#deleteExec_${doc.id}`);
      });
    })
    .catch((error) => console.error("Error getting events: ", error));
});
