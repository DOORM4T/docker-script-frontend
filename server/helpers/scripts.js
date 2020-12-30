//
// FUNCTIONS FOR INTERACTING WITH THE SERVER BASH SCRIPTS
//
const path = require("path")
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
// const toggleStream = fs.createWriteStream(
//   path.resolve(__dirname, "../scripts/logs/toggle.log"),
//   {
//     flags: "a",
//   },
// )
function toggleServerState() {
  const child = spawn("bash", ["-x", toggleScriptPath], {
    cwd: __dirname,
    detached: true,
  })

  child.stdout.on('data', (data)=>console.log(`[toggle]: ${data.toString()}`))
  child.stderr.on('data', (data)=>console.log(`[toggle][DEBUG]: ${data.toString()}`))
}

/**
 * Run the refresh script
 */
function refreshServerStatus() {
  const child = spawn("bash", [refreshScriptPath])
  
  child.stdout.on('data', (data)=>console.log(`[refresh]: ${data.toString()}`))
  child.stderr.on('data', (data)=>console.log(`[refresh][DEBUG]: ${data.toString()}`))
}

module.exports = {
  toggleServerState,
  refreshServerStatus,
}

