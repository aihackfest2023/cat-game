const url = "https://api.twinword.com/api/emotion/analyze/latest/";

async function sendMessage() {
    console.log("clicked on send");
    var userInput = document.getElementById("user-input");
    var userMessage = userInput.innerHTML;

    if (userMessage.trim() !== "") {
        var chatMessages = document.getElementById("chat-messages");

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
                catImg.src = "Assets/happycat1.png";
                break;
            case "sadness":
                catImg.src = "Assets/catsadcry.png";
                break;
            case "fear":
                catImg.src = "Assets/catfear.png";
                break;
            case "anger":
                catImg.src = "Assets/catangry.png";
                break;
            case "disgust":
                catImg.src = "Assets/catjudge.png";
                break;
            case "surprise":
                catImg.src = "Assets/catsurprised.png";
                break;
            case "confusion":
            default:
                catImg.src = "Assets/catconfused.png";
                break;
        }
    }
}

async function queryGPT(userMessage) {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "twinword-emotion-analysis-v1.p.rapidapi.com",
        },
        body: new URLSearchParams({
            text: userMessage,
        }),
    };

    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);

    // Extract emotion scores
    const emotionScores = data.emotion_scores;

    // Find the highest value
    const highestEmotion = Object.keys(emotionScores).reduce((a, b) => (emotionScores[a] > emotionScores[b] ? a : b));

    // Print the highest emotion
    console.log(highestEmotion);
    return highestEmotion;
}

window.onload = () => {
    document.querySelector("#send-button").addEventListener("click", async () => {
        await sendMessage();
    });
};
