import path from "path"
import fs from "fs"

import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

let resolveJs = htmlStr =>{
    let r2 = regScript.exec(htmlStr)
    let newJs = r2[0].replace("<script>", "").replace("</script>", "")
    fs.writeFile(path.join(__dirname , "clock.js"), newJs, err=>{
        if (err) return console.log("write fail" + err.message)
        console.log("write success")
    })
}

let resolveCss = htmlStr => {
    let r1 = regStyle.exec(htmlStr);
    let newCSS = r1[0].replace("<style>", "").replace("</style>", "")
    fs.writeFile(path.join(__dirname, "style.css"), newCSS, err=>{
        if (err) return console.log("fail" + err.message)
        console.log("success")
    })

    
}

let resolveHtml = htmlStr => {
    let newHtml = htmlStr.replace(regStyle, "<link rel='stylesheet' href='style.css'>").replace(regScript, "<script src='clock.js'></script>")
    fs.writeFile(path.join(__dirname, "clock.html"), newHtml, err =>{
        if (err) return console.log("html write fail" + err.message)
        console.log("html write success");
    })
}


fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, dataStr) =>{
    if (err) return console.log("fail" + err.message);
    resolveCss(dataStr);
    resolveJs(dataStr);
    resolveHtml(dataStr);
})

