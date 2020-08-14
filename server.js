const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));



/** run bash script */
const { spawn } = require("child_process");

function toggleServerState() {
  const child = spawn("sh", ["toggle_server_state.sh"]);
  console.log(child);
  console.log("PROCESS ID: ", child.pid);
}




/**
 * ROUTES
 */

app.use("/js", express.static("js"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (_, res) => {
  const serverStatus = +fs
    .readFileSync(path.join(__dirname, "server_is_up.txt"))
    .toString()
    .trim();
  console.log(serverStatus);
  const isServerOpen = serverStatus === 0 ? false : true;
  console.log(isServerOpen);
  res.render("index", { isServerOpen });
});


app.post("/toggle-server-state", (_, res) => {
  toggleServerState();
  res.redirect("/");
});

app.get("*", (_, res) => {
  res.status(404).send("Page not found.");
});
