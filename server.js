const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

/** run bash script child processes */
const { spawn } = require("child_process");

function toggleServerState() {
  spawn("sh", ["toggle_server_state.sh"]);
}

function refreshServerStatus() {
  spawn("sh", ["refresh_status.sh"]);
}

/**
 * ROUTES
 */

app.use("/log", express.static("logs/latest.log"));
app.use("/js", express.static("js"));
app.use("/css", express.static("css/output.css"));
app.use("/status", express.static(`${__dirname}/server_is_up.txt`));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (_, res) => {
  refreshServerStatus();
  res.render("index");
});

const readMembers = fs.readFileSync(`${__dirname}/members.json`);
const allowedUsers = JSON.parse(readMembers.toString());
const allowedUsernames = Object.keys(allowedUsers);

app.post("/toggle-server-state", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  const userExists = allowedUsernames.some((name) => name === username);
  const correctPassword = allowedUsers[username] === password;
  console.log(userExists, correctPassword);

  if (!userExists || !correctPassword)
    return res.status(403).send("Invalid credentials.");

  toggleServerState();

  res.redirect("/");
});

app.get("*", (_, res) => {
  res.status(404).send("Page not found.");
});
