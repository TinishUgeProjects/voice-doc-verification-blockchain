var signUpButton = document.getElementById('signUp');
var signInButton = document.getElementById('signIn');
var container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

document.addEventListener('DOMContentLoaded', function() {
	var signUpButton = document.getElementById('signup');
	var signInButton = document.getElementById('signin');

	signUpButton.addEventListener('click', function() {
		window.location.href = 'upload.html'; 
	});

	signInButton.addEventListener('click', function() {
		window.location.href = 'upload.html'; 
	});
});

// Handle signup process
document.getElementById("signup").addEventListener("click", (e) => {
	e.preventDefault();
	var name = document.querySelector('input[placeholder="Name"]').value;
	var email = document.querySelector('input[placeholder="Email"]').value;
	var password = document.querySelector('input[placeholder="Password"]').value;
  
	createUserWithEmailAndPassword(auth, email, password)
	  .then((userCredential) => {
		var user = userCredential.user;
		// Save user information to the Firebase Realtime Database
		set(ref(database, 'users/' + user.uid), {
		  name: name,
		  email: email,
		  password: password
		});
		console.log("User signed up:", user);
	  })
	  .catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.error("Error signing up:", errorCode, errorMessage);
	  });
  });

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCP-SX4O0ENh1pzqqyLHPSpyjXynDjxI3s",
	authDomain: "docverify-ca74e.firebaseapp.com",
	projectId: "docverify-ca74e",
	storageBucket: "docverify-ca74e.appspot.com",
	messagingSenderId: "624109621209",
	appId: "1:624109621209:web:aa46ff4317297326ee93c8"
  };

  firebase.initializeApp(firebaseConfig);

	var database = firebase.database();
	var app = initializeApp(firebaseConfig);
	var auth = getAuth();
	var database = getDatabase();
	var db = firebase.firestore();

	document.getElementById('signup').addEventListener('click', submitForm);

	// Function to save user data to Firestore
	function saveUserData(name, email, password) {
		db.collection("users").add({
		  name: name,
		  email: email,
		  password: password
		})
		.then((docRef) => {
		  console.log("Document written with ID: ", docRef.id);
		  alert("You have signed up successfully!");
		})
		.catch((error) => {
		  console.error("Error adding document: ", error);
		  alert("An error occurred. Please try again.");
		});
	  }
	  
	  // Event listener for the signup button
	  var signupButton = document.getElementById("signup");
	  signupButton.addEventListener("click", () => {
		var name = document.querySelector('input[placeholder="Name"]').value;
		var email = document.querySelector('input[placeholder="Email"]').value;
		var password = document.querySelector('input[placeholder="Password"]').value;
	  
		saveUserData(name, email, password);
	  
		// Clear the input fields
		document.querySelector('input[placeholder="Name"]').value = "";
		document.querySelector('input[placeholder="Email"]').value = "";
		document.querySelector('input[placeholder="Password"]').value = "";
	  });

	////////////////////////////////////////////////////////////////////////////////
