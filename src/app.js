const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
// require the router module
const router = require("./router");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectoryPath = path.join(__dirname, "../public");
const User = require("./models/user");

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));


// use the router in your app
app.use(express.json(), router);

app.get("/", (req, res) => {
    res.render("index",{
      title : "Home"
    });
});

app.get("/signin",(req,res) => {
    res.render("signin")
})

app.get("/add", (req, res) => {
    res.render("add",{
      title : "Add New User",
    });
});

app.get("/list",async (req, res) => {
    
    try {
        const data = await User.find({});
        res.render('list', { 
            data,
            title : "User List"
        });
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/users/add',async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});