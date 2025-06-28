// Fetch and display IP
fetch("/api/ip")
    .then((response) => response.text())
    .then((ip) => {
        document.getElementById("ip-address").textContent = ip;
    })
    .catch(() => {
        document.getElementById("ip-address").textContent = "Unavailable";
    });