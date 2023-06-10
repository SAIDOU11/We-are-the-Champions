import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  // onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-41ad1-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementInDB = ref(database, "endorsement");

let plublishBtn = document.getElementById("publish-btn");
let textArea = document.getElementById("text-area");
let endorsementList = document.getElementById("endorsement-list");

// onValue(endorsementInDB, (snapchot) => {
//   console.log(snapchot.val());
// });

plublishBtn.addEventListener("click", () => {
  let endorsement = textArea.value;
  console.log(endorsement);
  if (endorsement === "") {
    return;
  }
  push(endorsementInDB, endorsement);
  console.log(`${endorsement} add to database`);
  createEndorsement(endorsement);
  clearTextArea();
});

function clearTextArea() {
  textArea.value = "";
}

function createEndorsement(value) {
  let paraEndorsement = document.createElement("p");
  endorsementList.append(paraEndorsement);
  paraEndorsement.innerHTML = `${value}`;
}
