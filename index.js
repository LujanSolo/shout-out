import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  push,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://shout-out-ee341-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const endorsementsDB = ref(database, "endorsements");

const endorseInputEl = document.getElementById("endorsement");
const fromEl = document.getElementById("from-field");
const toEl = document.getElementById("to-field");

const publishBtn = document.getElementById("publish-btn");

// field for pushing array items to dynamic field
const endorsementResults = document.getElementById("output-container");

let likeButton = document.getElementById("like-btn");
let likeCount = document.getElementById("likes-count");



publishBtn.addEventListener("click", () => {
  let endorsementInput = {
    comment: endorseInputEl.value,
    fromInput: fromEl.value,
    likes: likeCount.value,
    toInput: toEl.value
  };

  if (
    endorsementInput.comment &&
    endorsementInput.fromInput &&
    endorsementInput.toInput
  ) {
    push(endorsementsDB, endorsementInput);
    clearAllInputs();
  } else {
    alert("Please enter a value in each field.");
  }
});

onValue(endorsementsDB, function (snapshot) {
  if (snapshot.exists()) {
    let endorsementsArray = Object.entries(snapshot.val());
    console.log(endorsementsArray);
    clearEndorsementField();

    for (let i = 0; i < endorsementsArray.length; i++) {
      let endorsementItem = endorsementsArray[i];
      // let endorsementItemID = endorsementsArray[0];
      // let endorsementItemValue = endorsementsArray[1].comment;
      // let fromValue = endorsementsArray[1].fromInput;
      // let toValue = endorsementsArray[1].toInput;
      // let likesValue = endorsementsArray[1].likes;

      appendEndorsement(endorsementItem);

      document.addEventListener("click", function (e) {
        const target = e.target.closest("#like-btn");
        // likeCount = 0;
        if (target) {
          likeCount++;
          console.log("clicked");
        }
      });
    }

    
  } else {
    endorsementResults.innerHTML = "nothing here, yet...";
  }
});

function clearAllInputs() {
  endorseInputEl.value = "";
  fromEl.value = "";
  toEl.value = "";
}

function clearEndorsementField() {
  endorsementResults.innerHTML = "";
}

function appendEndorsement(endorsement) {
  let endorsementID = endorsement[0];
  let endorsementValue = endorsement[1].comment;
  let fromValue = endorsement[1].fromInput;
  let toValue = endorsement[1].toInput;
  let likesValue = endorsement[1].likes;

  endorsementResults.innerHTML += `
    <div class="endorse-box">
      <h3 class="endorse-to">To ${toValue}</h3>
      <p class="endorse-paragraph">${endorsementValue}</p>
      <h3 class="endorse-from">From ${fromValue}</h3>
      <button id="like-btn">❤️ <span id="likes-count">${likesValue}</span></button> 
    </div>
  `;
}

// function likeButtonListener(event) {
//   let element = event.target;
//   if(element.tagName == 'button' && element.idList.contains("like-btn")){
//     console.log('clicked')
//   }

// }

// ${likesValue === undefined ? likesValue = 0 : likesValue}
