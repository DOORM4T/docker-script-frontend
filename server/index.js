const path = require("path")
const fs = require("fs")

const express = require("express")
const app = express()

/* bash script-calling functions */
const { refreshServerStatus, toggleServerState } = require("./helpers/scripts")

/* view config */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

/* POST JSON */
app.use(express.json())

/**
 * ROUTES
 */
app.use("/js", express.static(path.join(__dirname, "./views/js")))
app.use("/css", express.static(path.join(__dirname, "./views/css/output.css")))
app.use("/status", express.static(path.join(__dirname, "./scripts/is_up.txt")))

/* Main page */
app.get("/", (_, res) => {
  refreshServerStatus()
  res.render("index")
})

/**
 * Handle attempts to toggle the server
 */
const allowList = fs.readFileSync(
  path.join(__dirname, "./scripts/allow_list.json"),
)
const allowedUsers = JSON.parse(allowList.toString())
const allowedUsernames = Object.keys(allowedUsers)

app.post("/toggle-server-state", (req, res) => {
  /* simple user authentication */
  const { username, password } = req.body
  const userExists = allowedUsernames.some((name) => name === username)
  const correctPassword = allowedUsers[username] === password

  /* stop if invalid user/password */
  if (!userExists || !correctPassword)
    return res.status(403).send("Invalid credentials.")

  /* run server */
  toggleServerState()

  res.redirect("/")
})

/**
 * Invalid pages
 */
app.get("*", (_, res) => {
  res.status(404).send("Page not found.")
})

/* start server */
const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
