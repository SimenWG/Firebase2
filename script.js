
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set, get, update, remove, child } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQgNhr3cbErvOTM44c0XR92FwKYxIcyTY",
    authDomain: "js17-firebase2.firebaseapp.com",
    projectId: "js17-firebase2",
    storageBucket: "js17-firebase2.appspot.com",
    messagingSenderId: "952317645513",
    appId: "1:952317645513:web:63389167772fe6689c7318"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


var enterID = document.querySelector("#enterID");
var enterName = document.querySelector("#enterName");
var enterAge = document.querySelector("#enterAge");
var findID = document.querySelector("#findID");
var findName = document.querySelector("#findName");
var findAge = document.querySelector("#findAge");

var insertBtn = document.querySelector("#insert");
var updateBtn = document.querySelector("#update");
var removeBtn = document.querySelector("#remove");
var findBtn = document.querySelector("#find");

function InsertData() {
    set(ref(db, "People/" + enterID.value), {
        Name: enterName.value,
        ID: enterID.value,
        Age: enterAge.value
    })
    .then(() => {
        alert("Data added successfully");
    })
    .catch((error) => {
        alert(error);
    });
}

function FindData() {
    const dbref = ref(db);
    get(child(dbref, "People/" + findID.value))
    .then((snapshot) => {
        if (snapshot.exists()) {
            findName.innerHTML = "Name: " + snapshot.val().Name;
            findAge.innerHTML = "Age: " + snapshot.val().Age;
        } else {
            alert("No data found");
        }
    })
    .catch((error) => {
        alert(error);
    });
}

function UpdateData() {
    update(ref(db, "People/" + enterID.value), {
        Name: enterName.value,
        Age: enterAge.value
    })
    .then(() => {
        alert("Data updated successfully");
    })
    .catch((error) => {
        alert(error);
    });
}

function RemoveData() {
    remove(ref(db, "People/" + enterID.value))
    .then(() => {
        alert("Data deleted successfully");
    })
    .catch((error) => {
        alert(error);
    });
}

// Event listeners
insertBtn.addEventListener('click', InsertData);
updateBtn.addEventListener('click', UpdateData);
removeBtn.addEventListener('click', RemoveData);
findBtn.addEventListener('click', FindData);

// ** Add event listener for "Enter" key to trigger FindData function **
findID.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        FindData(); 
    }
});

const toggleModeBtn = document.querySelector("#toggleMode");
toggleModeBtn.addEventListener("click", () => {
    const body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    if (body.classList.contains("dark-mode")) {
        toggleModeBtn.innerHTML = "Switch to Light Mode";
    } else {
        toggleModeBtn.innerHTML = "Switch to Dark Mode";
    }
});