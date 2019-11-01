const express = require("express");
const bodyParser = require("body-parser");
const slugify = require("slugify");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");
const text = require(__dirname + "/library.js");

const aboutHome = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, distinctio. Laudantium doloribus, culpa velit fugiat veritatis, nihil quasi inventore tenetur adipisci quia facere sunt explicabo laboriosam, minima architecto dignissimos. Quo.";
const indexHome = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, distinctio. Laudantium doloribus, culpa velit fugiat veritatis, nihil quasi inventore tenetur adipisci quia facere sunt explicabo laboriosam, minima architecto dignissimos. Quo.";
const contactHome = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, distinctio. Laudantium doloribus, culpa velit fugiat veritatis, nihil quasi inventore tenetur adipisci quia facere sunt explicabo laboriosam, minima architecto dignissimos. Quo."

mongoose.connect("mongodb+srv://admin_dyaksa:tuesblues_030195@cluster0-pnlxn.mongodb.net/dailyjournalDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function (value) {
    console.log("success connect");
}).catch(function (err) {
    console.log("not connected databse");
    throw err;
});

const postSchema = Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
        maxlength: 100
    },
    slug: String,
    content: {
        type: String,
        minglength: 100
    }
});

const Posts = mongoose.model("Post", postSchema);

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

const posts = [];

app.get("/", function (req, res) {
    Posts.find({}, function (err, posts) {
        if (err) throw err;
        res.render("index", {
            title: indexHome,
            posts: posts
        });
    });
});

app.get("/about", function (req, res) {
    res.render("about", {
        title: aboutHome
    });
});

app.get("/contact", function (req, res) {
    res.render("contact", {
        title: contactHome
    });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    let title = req.body.title;
    let content = req.body.content;
    const post = new Posts({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        slug: slugify(_.toLower(title)),
        content: content
    });

    post.save(function (err) {
        if (err) throw err;
        res.redirect("/");
    });
});

app.get("/posts/:title/:id", function (req, res) {
    const title = req.params.title;
    const id = req.params.id;

    Posts.findOne({
        _id: id,
        slug: title
    }, function (err, post) {
        if (err) throw err;
        if (!post) {
            console.log("tidak ditemukan");
        } else {
            res.render("post", {
                post: post
            });
        }
    });
});

app.listen(process.env.PORT || 3000, () => console.log("port 3000"));