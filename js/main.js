// SERVER STATE FORM
const form = document.getElementById("form");
const progressBar = document.getElementById("progress-bar");
const statusMessageSpan = document.getElementById("status-message");
const toggleButton = document.getElementById("toggle");
toggleButton.setAttribute("disabled", "true");

let activeState = -1; // 1: Server up; 2: Server down
setTimeout(() => {
  (async function getActiveState() {
    const response = await fetch("/status");
    const status = Number(await response.text());
    console.log("status: ", status);
    activeState = status;
    toggleButton.removeAttribute("disabled");
    statusMessageSpan.parentNode.classList.remove("bg-yellow-400");
    statusMessageSpan.parentNode.classList.remove("hover:bg-yellow-500");

    let statusMessage;
    if (status === 0) {
      statusMessage = "SERVER IS DOWN.";
      statusMessageSpan.classList.remove("text-green-800");
      statusMessageSpan.classList.add("text-red-800");
      statusMessageSpan.parentNode.classList.remove("bg-green-400");
      statusMessageSpan.parentNode.classList.add("bg-red-400");
      statusMessageSpan.parentNode.classList.remove("hover:bg-green-500");
      statusMessageSpan.parentNode.classList.add("hover:bg-red-500");
      toggleButton.classList.add("active");
      toggleButton.classList.remove("inactive");
      toggleButton.textContent = "LAUNCH SERVER";
    } else {
      statusMessage = "SERVER IS UP!";
      statusMessageSpan.classList.remove("text-red-800");
      statusMessageSpan.classList.add("text-green-800");
      statusMessageSpan.parentNode.classList.remove("bg-red-400");
      statusMessageSpan.parentNode.classList.add("bg-green-400");
      statusMessageSpan.parentNode.classList.remove("hover:bg-red-500");
      statusMessageSpan.parentNode.classList.add("hover:bg-green-500");
      toggleButton.classList.add("inactive");
      toggleButton.classList.remove("active");
      toggleButton.textContent = "CLOSE SERVER";
    }

    statusMessageSpan.textContent = statusMessage;
  })();
}, 10);

const usernameInput = document.querySelector("input[name=username]");
usernameInput.focus();

const passwordInput = document.querySelector("input[name=password]");
const inputs = [usernameInput, passwordInput];
inputs.forEach((input) => {
  input.addEventListener("focus", (e) => {
    e.target.classList.remove("border-red-500");
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = form["username"].value;
  const password = form["password"].value;

  // Validate input
  if (username === "" || password === "") {
    if (username === "") usernameInput.classList.add("border-red-500");
    if (password === "") passwordInput.classList.add("border-red-500");
    return;
  }

  toggleButton.setAttribute("disabled", "true");

  // Request server state toggle
  const requestBody = JSON.stringify({ username, password });
  const response = await fetch("/toggle-server-state", {
    method: "POST",
    body: requestBody,
    headers: { "Content-Type": "application/json" },
  });

  // Stop if invalid request (e.g. bad login)
  if (response.status !== 200) {
    alert(await response.text());
    window.location.reload();
  }

  // Loading visuals
  toggleButton.classList.remove("active");
  toggleButton.classList.remove("inactive");
  toggleButton.innerHTML = "LOADING...";
  progressBar.classList.remove("hidden");

  const progressInterval = setInterval(() => {
    progressBar.value += (progressBar.max / 5000) * 10;
  }, 10);

  setTimeout(() => {
    clearInterval(progressInterval);
    window.location.reload();
  }, 5000);
});

toggleButton.addEventListener("click", () => {
  if (activeState === -1) return;
  activeState = -1;
});

// LOGS
const refreshLogButton = document.getElementById("refresh-log");
const logsElement = document.getElementById("logs");

let logInterval;

if (localStorage.getItem("subscribed-to-log") === "true") {
  refreshLogButton.classList.add("text-green-500");
  refreshLogButton.classList.add("rotating");
  logInterval = setInterval(getLogs, 1000);
} else {
  logInterval = null;
  logsElement.textContent = "";
}

refreshLogButton.addEventListener("click", () => {
  if (logInterval === null) {
    refreshLogButton.classList.add("rotating");
    localStorage.setItem("subscribed-to-log", "true");
    logInterval = setInterval(getLogs, 1000);
    refreshLogButton.classList.add("text-green-500");
  } else {
    clearInterval(logInterval);
    localStorage.setItem("subscribed-to-log", "false");
    logInterval = null;
    refreshLogButton.classList.remove("text-green-500");
    refreshLogButton.classList.remove("rotating");
  }
});

async function getLogs() {
  const response = await fetch("/log");
  let logs = await response.text();
  const prevLogs = logsElement.textContent;
  if (prevLogs === logs) return;
  logsElement.textContent = logs;
}

getLogs();

window.addEventListener('visibilitychange', ()=>{
  if(!document.hidden)
    window.location.reload()
}, false)