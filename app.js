const express = require("express");
const bodyParser = require("body-parser");

const aboutHome = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, distinctio. Laudantium doloribus, culpa velit fugiat veritatis, nihil quasi inventore tenetur adipisci quia facere sunt explicabo laboriosam, minima architecto dignissimos. Quo.";
const indexHome = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, distinctio. Laudantium doloribus, culpa velit fugiat veritatis, nihil quasi inventore tenetur adipisci quia facere sunt explicabo laboriosam, minima architecto dignissimos. Quo.";
const contactHome = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, distinctio. Laudantium doloribus, culpa velit fugiat veritatis, nihil quasi inventore tenetur adipisci quia facere sunt explicabo laboriosam, minima architecto dignissimos. Quo."

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("index", {
        title: indexHome
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

app.listen(3000, () => console.log("port 3000"));