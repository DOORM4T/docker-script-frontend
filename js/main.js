// SERVER STATE FORM
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
  let statusMessage
  if(status === 0) {
    statusMessage = "SERVER IS DOWN."    
    statusMessageSpan.classList.remove('text-green-800')
    statusMessageSpan.classList.add('text-red-800')
    statusMessageSpan.parentNode.classList.remove('bg-green-400')
    statusMessageSpan.parentNode.classList.add('bg-red-400')
    toggleButton.classList.add('active')
    toggleButton.textContent = "LAUNCH SERVER"
} else {
    statusMessage = "SERVER IS UP!"    
    statusMessageSpan.classList.remove('text-red-800')
    statusMessageSpan.classList.add('text-green-800')
    statusMessageSpan.parentNode.classList.remove('bg-red-400')
    statusMessageSpan.parentNode.classList.add('bg-green-400')
    toggleButton.classList.remove('active')
    toggleButton.textContent = "CLOSE SERVER"
}
  
  
  statusMessageSpan.textContent = statusMessage;
})();

toggleButton.addEventListener("click", () => {
  if (activeState === -1) return;
  activeState = -1;
  toggleButton.setAttribute("disabled", "true");
  form.submit();
});


// LOGS
const refreshLogButton = document.getElementById('refresh-log');
const logsElement = document.getElementById('logs');

let logInterval = setInterval(getLogs,1000)
refreshLogButton.addEventListener('click', ()=>{
    if(logInterval === null) {
        logInterval = setInterval(getLogs,1000)
        refreshLogButton.classList.add('text-green-500')
    }
    else {
        clearInterval(logInterval);
        logInterval=null;
        refreshLogButton.classList.remove('text-green-500')
    }
})

async function getLogs() {
    const response = await fetch('/log')
    let logs = await response.text();
    const prevLogs = logsElement.textContent
    if(prevLogs === logs) return;
    logsElement.textContent = logs
}
getLogs()