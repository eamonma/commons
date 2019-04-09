const fs = require("fs")
const hbs = require("hbs")

const files = [
    "index.html",
    "books/index.html",
    "bugs/index.html",
    "faq/index.html",
    "resources/index.html",
    "resources/apai.pdf",
    "resources/mla.pdf",
    "resources/mlai.pdf",
    "resources/mlaw.pdf",
    "teachers/index.html",
    "tutor/index.html",
    "tutor/signup.docx",
    "styles.css",
    "app.js",
    "blocks.js",
    "burger.css",
    "carousel.js",
    "favicon.ico",
    "print.css"
]

let filesDirs = files.map((element) => element.split("/")[0])
filesDirs = filesDirs.filter((element) => !element.includes("."))

try {
    filesDirs.forEach((element) => {
        console.log("/dist/" + element);
        
        if (!fs.existsSync("./dist/" + element)){
            fs.mkdirSync("./dist/" + element)
        }
    })
    
  } catch (e) {
    console.error(e)
  }

var partialsDir = __dirname + '/partials';
var filenames = fs.readdirSync(partialsDir);
filenames.forEach(function (filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
        return;
    }
    var name = matches[1];
    var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    hbs.registerPartial(name, template);
});

files.forEach((element) => {

    if(element.includes("html")) {
        var template = hbs.compile(
            fs.readFileSync("./public/" + element, "utf-8")
        )

        var generated = template( {  } )
    } else {
        fs.copyFileSync("./public/" + element, "./dist/" + element, "utf-8")
        return;
    }
        
    
    fs.writeFileSync("./dist/" + element, generated, "utf-8")
    
})