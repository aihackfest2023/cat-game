const url = "https://api.twinword.com/api/emotion/analyze/latest/";

async function sendMessage() {
    var userInput = document.getElementById("user-input");
    var userMessage = userInput.innerHTML;

    if (userMessage.trim() !== "") {
        var chatMessages = document.getElementById("chat-messages");
        chatMessages.style = "overflow-y: scroll;";

        var userBubble = document.createElement("div");
        userBubble.classList.add("bubble");
        var text = document.createElement("p");
        text.innerHTML = userMessage;

        chatMessages.appendChild(userBubble);
        userBubble.appendChild(text);
        userInput.innerHTML = ""; // Clear input field

        // Call bot response function here
        try {
            var emotion = await queryGPT(userMessage);
            console.log(emotion);
        } catch (error) {
            console.log("error: ", error);
            var emotion = "confusion";
        }

        var catImg = document.querySelector(".cat");
        switch (emotion) {
            case "joy":
                catImg.src = "Assets/gingercatjoy.gif";
                break;
            case "sadness":
                catImg.src = "Assets/gingercatsad.gif";
                break;
            case "fear":
                catImg.src = "Assets/gingercatscared.gif";
                break;
            case "anger":
                catImg.src = "Assets/gingercatanger.gif";
                break;
            case "disgust":
                catImg.src = "Assets/gingercatjudge.gif";
                break;
            case "surprise":
                catImg.src = "Assets/gingercatsurprised.gif";
                break;
            case "confusion":
            default:
                catImg.src = "Assets/gingercatconfused.gif";
                break;
        }
    }
}

async function queryGPT(userMessage) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Twaip-Key": key,
            Host: "api.twinword.com",
        },
        body: new URLSearchParams({
            text: userMessage,
        }),
    };

    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    const data = JSON.parse(result);

    // Extract emotion scores
    const highestEmotion = data.emotions_detected[0] == undefined ? "confusion" : data.emotions_detected[0];

    // Find the highest value
    //const highestEmotion = Object.keys(emotionScores).reduce((a, b) => (emotionScores[a] > emotionScores[b] ? a : b));

    // Print the highest emotion
    console.log(highestEmotion);
    return highestEmotion;
}

window.onload = () => {
    document.querySelector("#send-button").addEventListener("click", async () => {
        await sendMessage();
    });
};
