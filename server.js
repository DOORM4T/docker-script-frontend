const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));



/** run script */
const { spawn } = require("child_process");

function toggleServerState() {
  const child = spawn("sh", ["toggle_server_state.sh"])
  console.log(child);
  console.log('PROCESS ID: ', child.pid);
}



/**
 * ROUTES
 */

app.use("/", express.static("dist"));

app.post("/toggle-server-state", (_, res) => {
  toggleServerState();
  res.redirect("/");
});

app.get("*", (_, res) => {
  res.status(404).send("Page not found.");
});
