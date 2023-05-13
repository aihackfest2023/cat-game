function sendMessage() {
    var userInput = document.getElementById("user-input");
    var userMessage = userInput.innerHTML;

    if (userMessage.trim() !== "") {
        // var chatMessages = document.getElementById("message-container");
        var chatMessages = document.getElementById("chat-messages");

        var userBubble = document.createElement("div");
        userBubble.classList.add("bubble");
        var text = document.createElement("p");
        text.innerHTML = userMessage;

        chatMessages.appendChild(userBubble);
        userBubble.appendChild(text);
        userInput.innerHTML = ""; // Clear input field

        // Call bot response function here (e.g., botResponse(userMessage))
        // Display bot's response in a chat bubble similar to the user's message
        var catImg = document.querySelector(".cat");
        switch (userMessage) {
            case "happy":
                catImg.src = "Assets/happycat1.png";
                break;
            case "sad":
                catImg.src = "Assets/catsadcry.png";
                break;
            case "angry":
                catImg.src = "Assets/catangry.png";
                break;
            case "judge":
                catImg.src = "Assets/catjudge.png";
                break;
            case "surprised":
                catImg.src = "Assets/catsurprised.png";
                break;
            default:
                catImg.src = "Assets/catconfused.png";
                break;
        }
    }
}

window.onload = () => {
    document.querySelector("#send-button").addEventListener("click", () => {
        sendMessage();
    });
};
