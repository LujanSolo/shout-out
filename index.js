const endorseInputEl = document.getElementById("endorsement");
const fromEl = document.getElementById("from-field");
const toEl = document.getElementById("to-field");

const publishBtn = document.getElementById("publish-btn");

publishBtn.addEventListener("click", () => {
  console.log('clicked')

  // send the info from the 3 fields to firebase server
  // using those values from firebase, populate the necessary fields in the "endorse-box"

  // <div class="endorse-box">
  //     <h3 class="endorse-to">To Example</h3>
  //     <p class="endorse-paragraph">Example Text of how great someone is today!</p>
  //     <h3 class="endorse-from">From Me</h3>
  //     <p id="heart-icon">❤️ <span id="heart-count">4</span></p>

  //   </div>
})