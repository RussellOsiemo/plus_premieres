// Get the form element
const form = document.querySelector("form");

// Get the chat container
const chatContainer = document.getElementById("chat-container");

// Fetch the chat data from the JSON file
fetch("../js/messages.json")
  .then(response => response.json())
  .then(data => {
    // Loop through each message and create HTML elements for it
    let counter = 0;
    data.forEach(message => {
      const messageElement = document.createElement("div");
      messageElement.classList.add("p-2", "ms-3", "mb-2");
      messageElement.classList.add(counter % 2 === 0 ? "bg-light" : "bg-dark-subtle");
      messageElement.innerHTML = `<strong>${message.username}:</strong> ${message.text}`;
      chatContainer.appendChild(messageElement);
      counter++;
    });
  })
  .catch(error => console.log(error));


// Listen for the form submission event
form.addEventListener("submit", event => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the username and message inputs
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;

  // Create a new message object
  const newMessage = { username: username, text: message };

  // Fetch the existing messages from the JSON file
  fetch("../js/messages.json")
    .then(response => response.json())
    .then(data => {
      // Append the new message to the existing messages array
      data.push(newMessage);

      // Write the updated messages array back to the JSON file
      fetch("../js/messages.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          // Create HTML elements for the new message and append them to the chat container
          createMessageElement(newMessage);

          // Clear the input fields
          document.getElementById("username").value = "";
          document.getElementById("message").value = "";
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});
