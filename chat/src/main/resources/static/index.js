fetch("/api/ip")
    .then((response) => response.text())
    .then((ip) => {
        const fullUrl = `http://${ip}:8080/`;
        document.getElementById("ip-address").textContent = ip;
        document.getElementById("full-url").value = fullUrl;
    })
    .catch(() => {
        document.getElementById("ip-address").textContent = "Unavailable";
        document.getElementById("full-url").value = "Unavailable";
    });

function copyUrl() {
    const input = document.getElementById("full-url");
    const text = input.value;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
            .writeText(text)
            .then(() => showToast("Copied to clipboard!"))
            .catch(() => fallbackCopy());
    } else {
        fallbackCopy();
    }

    function fallbackCopy() {
        input.select();
        input.setSelectionRange(0, 99999);
        const successful = document.execCommand("copy");
        if (successful) {
            showToast("Copied to clipboard!");
        } else {
            showToast("Failed to copy. Please copy manually.");
        }
    }

    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2000);
    }
}

function goToChat() {
    const nameInput = document.getElementById("calling-name");
    const name = nameInput.value.trim();
    if (name) {
        sessionStorage.setItem("callingName", name);
        window.location.href = "chat.html";
    }
    return false;
}