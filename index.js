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
let likeClicksEl = document.getElementById("likes-count");

publishBtn.addEventListener("click", () => {
  
  let endorsementInput = {
    comment: endorseInputEl.value,
    fromInput: fromEl.value,
    likes: likeClicksEl,
    toInput: toEl.value
  };

  if (endorsementInput.comment && endorsementInput.fromInput && endorsementInput.toInput) {
    push(endorsementsDB, endorsementInput);
    clearAllInputs();
  } else {
    alert('Please enter a value in each field.');
  }
});

onValue(endorsementsDB, function (snapshot) {
  
  if (snapshot.exists()) {
    let endorseArray = Object.entries(snapshot.val());
    console.log(endorseArray)
    clearEndorsementField();

    for (let i = 0; i < endorseArray.length; i++) {
      let endorsementItem = endorseArray[i];
      let endorsementItemID = endorseArray[0];
      // let endorsementItemValue = endorseArray[1].comment;
      // let fromValue = endorseArray[1].fromInput;
      // let toValue = endorseArray[1].toInput;
      // let likesValue = endorseArray[1].likes;
      
      appendEndorsement(endorsementItem);
    };

    document.addEventListener("click", likeButtonListener);
    likeButtonListener();
  } else {
    endorsementResults.innerHTML = "nothing here, yet..."
  };
  
  
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
  console.log(likesValue)
  
  endorsementResults.innerHTML += `
    <div class="endorse-box">
      <h3 class="endorse-to">To ${toValue}</h3>
      <p class="endorse-paragraph">${endorsementValue}</p>
      <h3 class="endorse-from">From ${fromValue}</h3>
      <button id="like-btn">❤️ <span id="likes-count">${likesValue}</span></button> 
    </div>
  `;
}

function likeButtonListener(event) {
  let element = event.target;
  if(element.tagName == 'button' && element.idList.contains("like-btn")){
    console.log('clicked')
  }
  
}

// ${likesValue === undefined ? likesValue = 0 : likesValue}
