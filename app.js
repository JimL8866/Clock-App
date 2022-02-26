import http from "http";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = http.createServer();

server.on ("request", (req, res) => {
    let url = req.url;
    console.log(url)
    // let fpath = path.join(__dirname, url, "clock.html");
    let fpath = ""
    if (url==="/") {
        fpath = path.join(__dirname, url, "index.html")
    }

    console.log(fpath)
    console.log(__dirname)
    fs.readFile(fpath, "utf-8", (err, dataStr) => {
        if (err) return res.end("<h1>404 Not Found!</h1>")
        res.end(dataStr)
    }) 


})

server.listen(80, ()=> console.log("Server is currently running on http://127.0.0.1"))