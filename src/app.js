const path = require("path")
const express = require("express")
const hbs = require("hbs");

const app = express()

const publicDirPath = path.join(__dirname, "../public")

app.set("view engine", "hbs")

app.use(express.static(publicDirPath))


app.listen(3000, () => {
  console.log("Server up on port 3000");
})
