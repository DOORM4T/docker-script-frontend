//
// FUNCTIONS FOR INTERACTING WITH THE SERVER BASH SCRIPTS
//
const path = require("path")
const fs = require("fs")
const { spawn } = require("child_process")
const toggleScriptPath = path.resolve(
  __dirname,
  "../scripts/toggle_server_state.sh",
)
const refreshScriptPath = path.resolve(
  __dirname,
  "../scripts/refresh_status.sh",
)

/**
 * Run the toggle script
 */
const toggleStream = fs.createWriteStream(
  path.resolve(__dirname, "../scripts/logs/toggle.log"),
  {
    flags: "a",
  },
)
function toggleServerState() {
  const toggleScript = spawn("bash", [toggleScriptPath], {
    cwd: __dirname,
    detached: true,
  })

  toggleScript.on("error", console.error)

  toggleScript.stdout.pipe(toggleStream)
  toggleScript.stderr.pipe(toggleStream)
}

/**
 * Run the refresh script
 */
const refreshStream = fs.createWriteStream(
  path.resolve(__dirname, "../scripts/logs/refresh.log"),
  {
    flags: "a",
  },
)
function refreshServerStatus() {
  const refreshScript = spawn("bash", [refreshScriptPath])

  refreshScript.on("error", console.error)

  refreshScript.stdout.pipe(refreshStream)
  refreshScript.stderr.pipe(refreshStream)
}

module.exports = {
  toggleServerState,
  refreshServerStatus,
}

toggleStream.on("error", console.error)
refreshStream.on("error", console.error)
