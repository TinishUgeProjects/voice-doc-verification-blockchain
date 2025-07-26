$("#myCarousel").carousel({
  interval: false
});

let chatOpen = false;

function openChat() {
  const chatbotContainer = document.getElementById('chatbot-container');
  chatbotContainer.style.display = 'block';
  chatOpen = true;
}

function closeChat() {
  const chatbotContainer = document.getElementById('chatbot-container');
  chatbotContainer.style.display = 'none';
  chatOpen = false;
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    const userInput = document.getElementsByClassName('user-input')[0];
    const message = userInput.value;
    displayMessage(message, true);
    // Here you can add logic to generate a response from the chatbot
    const reply = generateReply(message);
    displayMessage(reply, false);
    speakText(reply);
    userInput.value = '';
  }
}

function displayMessage(message, isUser) {
  const chatMessages = document.getElementById('chat-messages');
  const newMessage = document.createElement('div');
  newMessage.textContent = message;
  newMessage.classList.add(isUser ? 'user-message' : 'bot-message');
  chatMessages.appendChild(newMessage);
}

function generateReply(message) {
  // Implement a simple rule-based approach for generating replies based on user messages
  const lowercaseMessage = message.toLowerCase();

  if (lowercaseMessage.includes("hello")) {
    return "Hello from DocVerify! How can I help you today?";
  } else if (lowercaseMessage.includes("help")) {
    return "Sure, I can help you. What do you need assistance with? DocVerify will try to assisst you!";
  } else if (lowercaseMessage.includes("thanks")) {
    return "DocVerify, Welcomes you for every doubt you have regarding our site.";
  } else if (lowercaseMessage.includes("what does DocVerify do?")) {
    return "DocVerify Validates documents by give you the OCR format for your documents.";
  } else if (lowercaseMessage.includes("What about verification?")) {
    return "DocVerify is still under development for verification as pre-assesst data in needed for verification.";
  } else if (lowercaseMessage.includes("okay")) {
    return "yes, docVerify will be soon ready for verification and assisstive feature as it is collecting data governance.";
  } else {
    return "I'm sorry, I don't understand. DocVerify is still under development, We will connect very soon functionally!";
  }
}

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

var firebaseConfig = {
  apiKey: "AIzaSyCP-SX4O0ENh1pzqqyLHPSpyjXynDjxI3s",
  authDomain: "docverify-ca74e.firebaseapp.com",
  projectId: "docverify-ca74e",
  storageBucket: "docverify-ca74e.appspot.com",
  messagingSenderId: "624109621209",
  appId: "1:624109621209:web:aa46ff4317297326ee93c8"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.getDatabase();

document.querySelector('form').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  var name = document.querySelector('input[name="Name"]').value;
  var surname = document.querySelector('input[name="Surname"]').value;
  var email = document.querySelector('input[name="Email"]').value;
  var phone = document.querySelector('input[name="Phone"]').value;
  var message = document.querySelector('textarea').value;

  saveContactData(name, surname, email, phone, message);
  document.querySelector('form').reset();
}

function saveContactData(name, surname, email, phone, message) {
  const newContactRef = firebase.push(ref(database, 'contacts'));
  set(newContactRef, {
    name: name,
    surname: surname,
    email: email,
    phone: phone,
    message: message
  });
  alert('Contact information saved successfully!');
}