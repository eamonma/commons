const fs = require("fs")
const handlebars = require("handlebars")

const files = [
    "./public/index.html",
    "./books/index.html"
]

var template = handlebars.compile(
    fs.readFileSync("./play/src/index.html", "utf-8")
)
var generated = template( {  } )

console.log(generated);


fs.writeFileSync("./play/dist/" + "index" + ".html", generated, "utf-8")
