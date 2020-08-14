const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));



/** run bash script */
const { spawn } = require("child_process");

function toggleServerState() {
  spawn("sh", ["toggle_server_state.sh"]);
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
  res.render("index");
});


app.post("/toggle-server-state", (_, res) => {
  toggleServerState();
  res.redirect("/");
});

app.get("*", (_, res) => {
  res.status(404).send("Page not found.");
});
