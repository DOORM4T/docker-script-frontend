const form = document.getElementById("form");
const statusMessageSpan = document.getElementById("status-message");
const toggleButton = document.getElementById("toggle");
toggleButton.setAttribute("disabled", "true");

let activeState = -1; // 1: Server up; 2: Server down
(async function getActiveState() {
  const response = await fetch("/status");
  const status = Number(await response.text());
  console.log("status: ", status);
  activeState = status;
  toggleButton.removeAttribute("disabled");
  const statusMessage = status === 0 ? "Server is down." : "Server is up!";
  statusMessageSpan.textContent = statusMessage;
})();

toggleButton.addEventListener("click", () => {
  if (activeState === -1) return;
  activeState = -1;
  toggleButton.setAttribute("disabled", "true");
  form.submit();
});
