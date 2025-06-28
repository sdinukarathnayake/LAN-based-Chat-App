let username = sessionStorage.getItem("callingName") || "Anonymous";
document.getElementById("user-display").textContent = "You are: " + username;

const client = Stomp.over(new SockJS("/chat"));
client.connect({}, function () {
    client.subscribe("/topic/messages", function (msg) {
        const message = JSON.parse(msg.body);
        const list = document.getElementById("chat-messages");
        const item = document.createElement("li");

        item.className = message.sender === username ? "sent" : "received";
        item.innerHTML = `<span class="sender">${message.sender}:</span> ${message.content}`;
        list.appendChild(item);
        list.scrollTop = list.scrollHeight;
    });
});

function sendMessage() {
    const input = document.getElementById("chat-input");
    const content = input.value.trim();
    if (content) {
        client.send(
            "/app/message",
            {},
            JSON.stringify({ sender: username, content })
        );
        input.value = "";
    }
}