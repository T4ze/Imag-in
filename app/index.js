const Express = require("express");
const app = Express();
const bodyParser = require('body-parser');
const minify = require('express-minify');

let images = require('../data/1500-random-images.json');

app.use(bodyParser.json());
app.use(minify());
app.use(Express.static('public'));

app.get("/api/pictures", (req, res) => {
    let index = parseInt(req.query.index) || 0;
    let count = parseInt(req.query.count) || 20;

    res.json(images.slice(index, index + count));
});

app.post("/api/pictures", (req, res) => {
    if (!req.body.picture) {
      res.status(404).end();
      return;
    }

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
});

app.delete("/api/pictures/:id", (req, res) => {
    if (!req.params.id)
      res.status(404).end();

    images = images.filter(o => o.id != req.body.id);
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