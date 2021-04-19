// Seat Booking Funtionality

const ticketPrice = 8;

// Seleciting DOM Elements
const passengerSeats = document.querySelectorAll(
  ".passenger-seat-container .passenger-seat:not(.occupied)"
);
const passengerSeatContainer = document.querySelector(
  ".passenger-seat-container"
);
const count = document.getElementById("count");
const total = document.getElementById("total");

populateUI();

// Save ticket data into Local Storage
function saveTicketDat(seatIndex, seatPrice) {
  localStorage.setItem("selectedSeatIndex", seatIndex);
  localStorage.setItem("selectedSeatPrice", seatPrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(
    ".passenger-seat-container .passenger-seat.selected"
  );
  const seatsIndex = [...selectedSeats].map((seat) =>
    [...passengerSeats].indexOf(seat)
  );
  // Save to LS
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from LS and Populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    passengerSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedSeatIndex = localStorage.getItem("selectedSeatIndex");

  if (selectedSeatIndex !== null) {
    seatSelect.selectedIndex = selectedSeatIndex;
  }
}

// Seat Select Event Listener
passengerSeatContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("passenger-seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  updateSelectedCount();
});

// Countdown Timer

const dateToday = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

var countDownDate = new Date(
  `${currentMonth + 1} ${dateToday}, ${currentYear} 18:00:00`
);
var myfunc = setInterval(function () {
  var now = new Date().getTime();
  var timeleft = countDownDate - now;

  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
  document.getElementById("date").innerHTML =
    hours + "h " + minutes + "m " + seconds + "s ";
}, 1000);

// Initial Count and Total Set

updateSelectedCount();
