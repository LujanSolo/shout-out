import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  onValue
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const firebaseConfig = {
  databaseURL: "https://shoutout-a4642-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const endorsementsDB = ref(database, "endorsements");

const endorseInputEl = document.getElementById("endorsement");
const fromEl = document.getElementById("from-field");
const toEl = document.getElementById("to-field");

const publishBtn = document.getElementById("publish-btn");
const endorseResults = document.getElementById("output-container");
const heartIconBtn = document.getElementById("heart-icon");


publishBtn.addEventListener("click", () => {

  // send the info from the 3 fields to firebase server
  // using those values from firebase, populate the necessary fields in the "endorse-box"

  endorseResults.innerHTML = `<div class="endorse-box">
      <h3 class="endorse-to">To ${toValue}</h3>
      <p class="endorse-paragraph">${endorseValue}</p>
      <h3 class="endorse-from">From ${fromValue}</h3>
      <button id="heart-icon">❤️ <span id="heart-count">${heart - count}</span></button> //* add eventlistener to span
    </div>`;
})

heartIconBtn.addEventListener("click", () => {
  let heartCountEl = document.getElementById("heart-count");

})