const Express = require("express");
var request = require('request');
const app = Express();
const bodyParser = require('body-parser');
const minify = require('express-minify');

let images = require('../data/1500-random-images.json');

app.use(bodyParser.json());
app.use(minify());
app.use(Express.static('public'));

app.get("/api/pictures", (req, res) => {
    let cursor = parseInt(req.query.cursor) || 0;
    let amount = parseInt(req.query.amount) || 20;

    if (cursor >= images.length) {
        return res.status(404).end();
    }
    res.json(images.slice(cursor, cursor + amount));
});

app.post("/api/pictures", (req, res) => {
    if (!req.body.picture) {
      res.status(404).end();
      return;
    }


    var url = req.body.picture;
    var magic = {
        jpg: 'ffd8ffe0',
        png: '89504e47',
        gif: '47494638'
    };
    var options = {
        method: 'GET',
        url: url,
        encoding: null
    };

    request(options, function (err, response, body) {
        if(!err && response.statusCode == 200){
            var magigNumberInBody = body.toString('hex',0,4);
            if (magigNumberInBody == magic.jpg ||
                magigNumberInBody == magic.png ||
                magigNumberInBody == magic.gif) {

                images.push({
                    "id": generateUUID(),
                    "index": images.length,
                    "picture": req.body.picture,
                    "caption": req.body.caption,
                    "latitude": req.body.latitude,
                    "longitude": req.body.longitude,
                    "tags": []
                });
                res.status(200).end();
            }
        } else {
            res.status(500).end();
        }
    });
});

app.delete("/api/pictures/:id", (req, res) => {
    if (!req.params.id)
      res.status(404).end();

    images = images.filter(o => o.id != req.params.id);
    res.status(200).end();
});

app.listen(4242, () => {});


function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};