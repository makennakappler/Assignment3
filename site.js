document.addEventListener("DOMContentLoaded", function () {
  // Find the link elements by their IDs
  var homePageLink = document.getElementById("homePageLink");
  var executiveLeadersLink = document.getElementById("executiveLeadersLink");

  // Find the section elements by their IDs
  var homePage = document.getElementById("homePage");
  var executiveLeadersPage = document.getElementById("executiveLeadersPage");

  // Add event listeners to the links
  homePageLink.addEventListener("click", function (event) {
    homePage.style.display = "block";

    // hide other html pages
    executiveLeadersPage.style.display = "block";
  });

  executiveLeadersLink.addEventListener("click", function (event) {
    // Prevent the default link behavior
    executiveLeadersPage.style.display = "block";

    // hide other html page
    homePage.style.display = "none";
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
