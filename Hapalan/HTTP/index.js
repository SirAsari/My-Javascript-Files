const http = require("http");
const { secondFunction, testFunction } = require('./function');

//promise
const printAgakTelat = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Udah sampe"); 
            // reject('Saya kecelakaan'); 
        }, 1000 * 5);
    });
};

var server = http.createServer(async(req, res) => {
    switch (req.url) {
        case "/about": 
            console.log("saya otw");
            const value = await printAgakTelat()
            console.log(value);
            console.log("Fotbar dengan cosplayer")
            res.write("Ini about");
            res.end();
            break;
        default: 
            res.write("ini default");
            res.end();
            break;
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
