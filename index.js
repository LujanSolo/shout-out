import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  push,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://shout-out-ee341-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const endorsementsDB = ref(database, "endorsements");

const endorsementInput = document.getElementById("endorsement");
const fromEl = document.getElementById("from-field");
const toEl = document.getElementById("to-field");
const publishBtn = document.getElementById("publish-btn");

// field for pushing array items to dynamic field
const endorsementResults = document.getElementById("output-container");

publishBtn.addEventListener("click", () => {
  let endorsementObject = {
    comment: endorsementInput.value,
    fromInput: fromEl.value,
    toInput: toEl.value,
  };
  if (
    endorsementObject.comment &&
    endorsementObject.fromInput &&
    endorsementObject.toInput
  ) {
    push(endorsementsDB, endorsementObject);
    clearAllInputs();
  } else {
    alert("Please enter a value in each field.");
  }
});

document.addEventListener("click", (e) => {
  const target = e.target.closest("#like-btn");

  if (target) {
    let currentLikesCountEl = target.querySelector("#likes-count");
    let currentLikesCount = parseInt(currentLikesCountEl.textContent);

    currentLikesCount += 1;
    currentLikesCountEl.textContent = currentLikesCount;

    let endorsementID = target.closest(".endorse-box").getAttribute("data-id");
    const endorsementRef = ref(database, `endorsements/${endorsementID}/likes`);

    set(endorsementRef, currentLikesCount);
  }
}, { once: true });

onValue(endorsementsDB, function (snapshot) {
  if (snapshot.exists()) {
    let endorsementsObject = snapshot.val();
    let endorsementsArray = Object.entries(endorsementsObject);

    clearEndorsementField();

    for (let i = 0; i < endorsementsArray.length; i++) {
      let currentEndorsement = endorsementsArray[i];
      let currentEndorsementID = currentEndorsement[0];
      appendEndorsement([currentEndorsementID, currentEndorsement[1]]);
    }
  } else {
    endorsementResults.innerHTML = "nothing here, yet...";
  }
});

function appendEndorsement(endorsement) {
  let endorsementID = endorsement[0];
  let endorsementValue = endorsement[1].comment;
  let fromValue = endorsement[1].fromInput;
  let toValue = endorsement[1].toInput;
  let likesValue = endorsement[1].likes;

  endorsementResults.innerHTML += `
  <div class="endorse-box" data-id="${endorsementID}">
      <h3 class="endorse-to">To ${toValue}</h3>
      <p class="endorse-paragraph">${endorsementValue}</p>
      <h4 class="endorse-from">From ${fromValue}</h4>
      <button id="like-btn">❤️ <span id="likes-count">${
        likesValue === undefined ? (likesValue = 0) : likesValue
      }</span></button>
    </div>
  `;
}

function clearAllInputs() {
  endorsementInput.value = "";
  fromEl.value = "";
  toEl.value = "";
}

function clearEndorsementField() {
  endorsementResults.innerHTML = "";
}
