const express = require("express");
const { Singer } = require("./Singer");

const reload = require("reload");
const parser = require("body-parser").urlencoded({ extended: false });
const app = express();
app.set('view engine', 'ejs');

app.use(parser);
//middleware function
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('singer', { singers: [] });
});

app.get('/singer', (req, res) => {
    Singer.find({})
        .then(singers => res.render('singer', { singers }));
});

app.get('/singer/add', (req, res) => {
    res.render('add');
});

app.post('/singer/add', (req, res) => {
    const { name, image, link } = req.body;
    let sger = new Singer();
    sger.name = name;
    sger.image = image;
    sger.link = link;
    sger.save()
        .then(() => res.redirect("/singer"))
        .catch(error => res.send(error.message));
});

app.get('/singer/update/:id', (req, res) => {
    const { id } = req.params;

    // Singer.find({ _id: id })
    Singer.findById(id)
        .then(sger => {
            if (!sger) throw new Error("Cannot find singer");
            res.render('update', { sger });
        })
        .catch(error => res.send(error.message));

});

app.post('/singer/update/:id', (req, res) => {
    const { image, link, name } = req.body;
    Singer.findByIdAndUpdate(req.params.id, { name, image, link })
        .then(singer => {
            if (!singer) throw new Error("Cannot find singer!");
            res.redirect("/singer");
        })
        .catch(error => res.send(error));
});

app.get('/singer/remove/:id', (req, res) => {
    const { id } = req.params;
    Singer.findByIdAndRemove(id)
        .then(singer => {
            if (!singer) throw new Error("Cannot find singer!");
            res.redirect("/singer");
        })
        .catch(error => res.send(error.message));
});


app.listen(3000, () => console.log("Server started !!!"));
reload(app);