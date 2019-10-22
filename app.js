const express = require("express");
const bodyParser = require("body-parser");
const slugify = require("slugify");
const _ = require("lodash");
const text = require(__dirname + "/library.js");

const aboutHome = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, distinctio. Laudantium doloribus, culpa velit fugiat veritatis, nihil quasi inventore tenetur adipisci quia facere sunt explicabo laboriosam, minima architecto dignissimos. Quo.";
const indexHome = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, distinctio. Laudantium doloribus, culpa velit fugiat veritatis, nihil quasi inventore tenetur adipisci quia facere sunt explicabo laboriosam, minima architecto dignissimos. Quo.";
const contactHome = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, distinctio. Laudantium doloribus, culpa velit fugiat veritatis, nihil quasi inventore tenetur adipisci quia facere sunt explicabo laboriosam, minima architecto dignissimos. Quo."

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

const posts = [];

app.get("/", function (req, res) {
    res.render("index", {
        title: indexHome,
        posts: posts
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
    const post = {
        slug: slugify(_.lowerCase(title)),
        title: _.upperFirst(title),
        content: content
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
    const title = req.params.postName;
    posts.forEach(function (post) {
        if (post.slug === slugify(_.lowerCase(title))) {
            let detailPost = {
                title: post.title,
                content: post.content
            };
            res.render("post", detailPost);
        } else {
            console.log("not Match");
        }
    });
});

app.listen(3000, () => console.log("port 3000"));