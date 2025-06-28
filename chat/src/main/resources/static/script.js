// Fetch and display IP + URL + QR
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

// Copy to clipboard functionality
function copyUrl() {
    const input = document.getElementById("full-url");
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices

    try {
        // Use Clipboard API if supported
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard
                .writeText(input.value)
                .then(() => alert("Copied to clipboard: " + input.value))
                .catch((err) => fallbackCopy());
        } else {
            fallbackCopy(); // Fallback for insecure context or unsupported API
        }
    } catch (err) {
        fallbackCopy();
    }

    function fallbackCopy() {
        const successful = document.execCommand("copy");
        if (successful) {
            alert("Copied to clipboard: " + input.value);
        } else {
            alert("Failed to copy. Please copy manually.");
        }
    }
}