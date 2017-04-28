let startIndex = 0;
function getMorePics() { 
    fetch('http://localhost:4242/api/pictures?index=' + startIndex)
    .then((r) => r.json())
    .then((data) => {
        if (!data.length) return;

        startIndex = data.slice(-1).pop().index;
        let docfrag = document.createDocumentFragment();
        data.forEach((o) => {
            let d = document.createElement("div");
            d.className = "column is-2 element";
            let x = document.createElement("IMG");
            x.name = o.caption;
            x.src = o.picture + "?" + o.id;
            d.onclick =  function () {
                deleteElement(this, o.id);
            }
            d.appendChild(x);
            docfrag.appendChild(d);
        })
        document.getElementById('elements').appendChild(docfrag);
    }).catch((ex) => console.log('failed', ex))
}

function update() {
    if (document.body.scrollHeight == 
            document.body.scrollTop + window.innerHeight) {
        getMorePics();
    }
    requestAnimationFrame(update);
}

function sendForm() {
    let body = {};
    const inputs = document.getElementsByClassName("inputs");
    [].forEach.call(inputs, (e) => body[e.name] = e.value);

    fetch('http://localhost:4242/api/pictures', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(() => window.location.reload());
}

function deleteElement(e, id) {
    fetch('http://localhost:4242/api/pictures/' + id, {
        method: 'DELETE', body: ""
    }).then(() => e.parentNode.removeChild(e));
}

requestAnimationFrame(update);
getMorePics();