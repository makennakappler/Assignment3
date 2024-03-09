// site.js

document.addEventListener("DOMContentLoaded", function () {
  // FullCalendar initialization code here
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: [
      {
        title: "Event 1",
        start: "2024-03-01",
      },
      {
        title: "Event 2",
        start: "2024-03-07",
        end: "2024-03-10",
      },
      // Add more events as needed
    ],
  });
  calendar.render();
});
