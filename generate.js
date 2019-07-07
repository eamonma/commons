const fs = require("fs")
const hbs = require("hbs")
const uglify = require("uglify-js")
const uglifycss = require("uglifycss")
const uglifyhtml = require("html-minifier").minify

const files = [
    "index.html",
    "index.js",
    "books/index.html",
    // "books/lists/first-nations/index.html",
    // "books/lists/french/index.html",
    // "books/lists/lgbtq/index.html",
    // "books/lists/sports/index.html",
    // "books/lists/top-100/index.html",
    // "books/lists/travel/index.html",
    // "books/lists/junior-teen/index.html",
    // "books/lists/senior-teen/index.html",
    "bugs/index.html",
    "faq/index.html",
    "faq/peanuts.jpg",
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

const match = (file, arrayToPushTo, regex) => {
    const fileMatch = file.match(regex)
    if(fileMatch) 
        arrayToPushTo.push(fileMatch)
}

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

const jsFiles = []
const cssFiles = []
const htmlFiles = []
files.forEach((file) => {
    match(file, jsFiles, /.js$/)
    match(file, cssFiles, /.css$/)
    match(file, htmlFiles, /.html$/)
})

jsFiles.forEach((file) => { //minify js files
    const fileContent = fs.readFileSync("./public/" + file.input, "utf8")
    const generated = uglify.minify(fileContent)
    
    fs.writeFileSync("./dist/" + file.input, generated.code, "utf-8")
})

cssFiles.forEach((file) => {
    const fileContent = fs.readFileSync("./public/" + file.input, "utf8")
    const generated = uglifycss.processString(fileContent)

    fs.writeFileSync("./dist/" + file.input, generated, "utf-8")
})

htmlFiles.forEach((file) => {
    const fileContent = fs.readFileSync("./dist/" + file.input, "utf8")
    const generated = uglifyhtml(fileContent, {
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeComments: true
    })
    fs.writeFileSync("./dist/" + file.input, generated, "utf-8")
})