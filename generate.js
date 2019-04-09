const fs = require("fs")
const hbs = require("hbs")

const files = [
    "index.html",
    "books/index.html",
    "bugs/index.html",
    "faq/index.html",
    "resources/index.html",
    "teachers/index.html",
    "tutor/index.html",
    "styles.css"
]

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
    var template = hbs.compile(
        fs.readFileSync("./public/" + element, "utf-8")
    )
    var generated = template( {  } )
    
    fs.writeFileSync("./dist/" + element, generated, "utf-8")
    
})