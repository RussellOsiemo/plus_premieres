// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1R7YXAEqFxs7JYz9IS0iNUA3dS4bZlxk",
  authDomain: "pluschat-4d2a3.firebaseapp.com",
  databaseURL: "https://pluschat-4d2a3-default-rtdb.firebaseio.com",
  projectId: "pluschat-4d2a3",
  storageBucket: "pluschat-4d2a3.appspot.com",
  messagingSenderId: "904651604947",
  appId: "1:904651604947:web:ae3741b304ece157c66526",
  measurementId: "G-3NKS0VJYBV"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const db = firebase.database(app);

// User Authentication
firebase.auth().onAuthStateChanged((user) => {
  const authButton = document.getElementById('auth-btn');
  const sendForm = document.getElementById('send-request');
  const userDisplay = document.getElementById('user-display'); // Get the user display element


  if (user) {
    // User is signed in
    console.log('User is signed in:', user.displayName);
    authButton.innerText = 'Logout'; // Change the button text to "Logout"
    sendForm.style.display = 'block'; // Show the send message form
    userDisplay.innerText = 'Username: ' + user.displayName; // Display the username
  } else {
    // No user is signed in
    console.log('No user is signed in');
    authButton.innerText = 'Authenticate'; // Change the button text to "Authenticate"
    sendForm.style.display = 'none'; // Hide the send message form
    userDisplay.innerText = ''; // Clear the username display
  }
});

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    },
  },
};

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Handle authentication button click
const authButton = document.getElementById('auth-btn');
authButton.addEventListener('click', () => {
  if (auth.currentUser) {
    // User is already signed in, so perform sign out
    firebase.auth().signOut();
  } else {
    // User is not signed in, show FirebaseUI authentication
    ui.start('#firebaseui-auth-container', uiConfig);
  }
});

// Send Message
const sendButton = document.getElementById('send-btn');
const form = document.getElementById('send-request');
const chatContainer = document.getElementById('chat-container');
const usernameDisplay = document.getElementById('user-display');

sendButton.addEventListener('click', (e) => {
  e.preventDefault();

  const messageInput = document.getElementById('message');
  const message = messageInput.value;

  if (message) {
    const newMessage = {
      username: usernameDisplay.innerText.replace('Username: ', ''), // Retrieve the username from the display
      message: message,
      timestamp: Date.now()
    };

    const messagesRef = db.ref('messages');
    messagesRef.push(newMessage);

    messageInput.value = '';
  }
});

// Display Messages
const messagesRef = db.ref('messages');
messagesRef.on('child_added', (snapshot) => {
  const message = snapshot.val();
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${message.username}:</strong> ${message.message}`;

  chatContainer.appendChild(messageElement);
});
