const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
        addMessage("user", userMessage);
        fetchBotReply(userMessage);
    }
    userInput.value = "";
}

function addMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message " + sender;
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function fetchBotReply(message) {
    const APIkey = "4b8223d0b1024f41ba4b678847907de8";
    const ReqID = "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a";
    const projectName = "TEST";
    const deploymentName = "web";

    const url = "https://coco.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview";

    const headers = {
        "Ocp-Apim-Subscription-Key": APIkey,
        "Apim-Request-Id": ReqID,
        "Content-Type": "application/json"
    };

    const payload = {
        "kind": "Conversation",
        "analysisInput": {
            "conversationItem": {
                "id": "1",
                "text": message,
                "modality": "text",
                "participantId": "user1"
            }
        },
        "parameters": {
            "projectName": projectName,
            "verbose": true,
            "deploymentName": deploymentName,
            "stringIndexType": "TextElement_V8"
        }
    };

    fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        const topIntent = data.result.prediction.topIntent;
        addMessage("bot", topIntent);
    })
    .catch(error => console.log(error));
}

userInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
