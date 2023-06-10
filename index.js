import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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

plublishBtn.addEventListener("click", () => {
  let endorsement = textArea.value;
  if (endorsement === "") {
    return;
  }
  push(endorsementInDB, endorsement);

  clearTextArea();
});

onValue(endorsementInDB, (snapshot) => {
  let itemsArray = Object.entries(snapshot.val());

  console.log(snapshot.val());
  clearListEndorsement();
  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];
    let currentItemID = currentItem[0];
    let currentItemValue = currentItem[1];
    appendEndorsement(currentItem);
  }
});

function clearTextArea() {
  textArea.value = "";
}

function clearListEndorsement() {
  endorsementList.innerHTML = "";
}

function appendEndorsement(value) {
  let itemID = value[0];
  let itemValue = value[1];
  let paraEndorsement = document.createElement("p");
  paraEndorsement.classList.add("style");
  endorsementList.append(paraEndorsement);
  paraEndorsement.innerHTML = `${itemValue}`;

  paraEndorsement.addEventListener("click", () => {
    let exactLocationInDB = ref(database, `endorsement/${itemID}`);
    remove(exactLocationInDB);
  });
}
