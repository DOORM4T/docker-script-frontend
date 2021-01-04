//
// FUNCTIONS FOR INTERACTING WITH THE SERVER BASH SCRIPTS
//
const path = require("path")
const { spawn } = require("child_process")
const cwd = path.join(__dirname, "../scripts")
const toggleScriptPath = `${cwd}/toggle_server_state.sh`
const refreshScriptPath = `${cwd}/refresh_status.sh`

/**
 * Run the toggle script
 */
function toggleServerState() {
  const child = spawn("bash", ["-x", toggleScriptPath], { detached: true, cwd })

  child.stdout.on("data", (data) => console.log(`[toggle]: ${data.toString()}`))
  child.stderr.on("data", (data) =>
    console.log(`[toggle][DEBUG]: ${data.toString()}`),
  )
}

/**
 * Run the refresh script
 */
function refreshServerStatus() {
  const child = spawn("bash", [refreshScriptPath], { cwd })

  child.stdout.on("data", (data) =>
    console.log(`[refresh]: ${data.toString()}`),
  )
  child.stderr.on("data", (data) =>
    console.log(`[refresh][DEBUG]: ${data.toString()}`),
  )
}

module.exports = {
  toggleServerState,
  refreshServerStatus,
}
