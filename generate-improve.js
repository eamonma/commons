const fs = require("fs")
const hbs = require("hbs")
const yargs = require("yargs").argv
const path = require("path")
const tree = require("directory-tree")

let files = [
    // "index.html",
    // "books/index.html",
    // "bugs/index.html",
    // "faq/index.html",
    // "resources/index.html",
    // "resources/apai.pdf",
    // "resources/mla.pdf",
    // "resources/mlai.pdf",
    // "resources/mlaw.pdf",
    // "teachers/index.html",
    // "tutor/index.html",
    // "tutor/signup.docx",
    // "styles.css",
    // "app.js",
    // "blocks.js",
    // "burger.css",
    // "carousel.js",
    // "favicon.ico",
    // "print.css"
]

const fromDir = yargs.from, toDir = yargs.to, partialsDir = yargs.partials;

const dirTree = tree(fromDir, { extensions: /(!(.DS_Store))/ })

// console.log(dirTree);

dirTree.children.forEach((dir) => {
    console.log(dir.path, dir.children);
    
})

const lsCurrentDir = (dir) => {
    let dirList = fs.readdirSync(dir)

    let dirDirs = dirList.filter((element) => fs.statSync(dir + "/" + element).isDirectory())
    
    let dirFiles = dirList.filter((element) => element !== ".DS_Store" && fs.statSync(dir + "/" + element).isFile())

    return {
        dirDirs,
        dirFiles
    }
}

// let currentDir = lsCurrentDir(fromDir)
// let childDirs = {}

// currentDir.dirDirs.forEach((dir) => {
//     childDirs[dir] = (lsCurrentDir(fromDir + "/" + dir));
//     childDirs[dir][dirDirs]
// })

// const tree = (dir) => {
//     const dirs = lsCurrentDir(dir).dirDirs
//     console.log(dirs);
    
//     if(!dirs[0]) {
//         return
//     } else {
//         let dirDirs
//         dirs.forEach((element) => {
//             console.log(element);
            
//             if(element) {
//                 dirDirs[element] = tree(dir + "/" + element)
//             }
//         })
//         return dirDirs
//     }
// }

// tree(fromDir)

// console.log(childDirs);

// fromDirDirs.forEach((dir) => {
//     dir = fromDir + "/" + dir;
//     console.log(dir);
    
// })

// {
    // console.log(element);
    
    // element += __dirname + "/"
    // return fs.existsSync(element) && fs.statSync(element).isDirectory()
// })
// console.log(fromDirDirs);



// let filesDirs = files.map((element) => element.split("/")[0])
// filesDirs = filesDirs.filter((element) => !element.includes("."))

// try {
//     filesDirs.forEach((element) => {
//         console.log("/dist/" + element);
        
//         if (!fs.existsSync("./dist/" + element)){
//             fs.mkdirSync("./dist/" + element)
//         }
//     })
    
//   } catch (e) {
//     console.error(e)
//   }

// // var partialsDir = __dirname + '/partials';
// var filenames = fs.readdirSync(partialsDir);
// filenames.forEach(function (filename) {
//     var matches = /^([^.]+).hbs$/.exec(filename);
//     if (!matches) {
//         return;
//     }
//     var name = matches[1];
//     var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
//     hbs.registerPartial(name, template);
// });

// files.forEach((element) => {

//     if(element.includes("html")) {
//         var template = hbs.compile(
//             fs.readFileSync("./public/" + element, "utf-8")
//         )

//         var generated = template( {  } )
//     } else {
//         fs.copyFileSync("./public/" + element, "./dist/" + element, "utf-8")
//         return;
//     }
        
    
//     fs.writeFileSync("./dist/" + element, generated, "utf-8")
    
// })