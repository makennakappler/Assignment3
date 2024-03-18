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

  // click about us page nav actions
  testLink.addEventListener("click", function (event) {
    // Prevent the default link behavior
    testPage.style.display = "block";

    // hide other html page
    homePage.style.display = "none";
    executiveLeadersPage.style.display = "none";
    votingPage.style.display = "none";
    aboutUsPage.style.display = "none";
  });
  // FullCalendar initialization
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: [
      { title: "Event 1", start: "2024-03-01" },
      { title: "Event 2", start: "2024-03-07", end: "2024-03-10" },
      // Add more events as needed
    ],
  });
  calendar.render();

  // Login Button JS
  var loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", function () {
    console.log("Login button clicked");
  });
});
