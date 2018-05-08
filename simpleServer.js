var express = require('express');
var app = express();

app.use(express.json());

app.get('/', function(req, res){
    console.log('GET /')
    res.end("hi from GET");
});

app.post('/', function(req, res){
    console.log("====================")
    console.log("[HTTP]: POST/ Request Received, delaying")
    console.dir(`HEADERS: ${JSON.stringify(req.headers)}`);
    console.dir(`BODY: ${JSON.stringify(req.body)}`);
    setTimeout(() => {
        console.log("[HTTP]: Responding");
        res.setHeader('Content-Type', 'text/plain');
        res.sendFile(__dirname + "/payload.bin");
        res.on("finish", ()=>{
            console.log("Done");
        })
        res.on("error", (err)=>{
            console.log(`[HTTP]: Error:: ${err.message}/n ${err}`)
        })
        res.on("drain", ()=>{
            console.log("Drain")
        })
    }, 70000);
});

port = 3000;
app.listen(port);
console.log('Listening at :' + port)