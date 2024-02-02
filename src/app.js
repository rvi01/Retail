const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require('bcryptjs');
const app = express();
const session = require('express-session');
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

app.get("/home", (req, res) => {
    res.render("index",{
      title : "Home"
    });
});

app.get("/",(req,res) => {
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

app.post('/loginUsers/add',async (req, res) => {
    const user = new User(req.body);
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        return res.status(400).send({ error: 'User with this email already exists' });
    }
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post('/loginUsers',async (req, res) => {
    
    try {
        const loginEmail = req.body.loginEmail;
        const user = await User.findOne({ email : loginEmail });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const password = user.password;
    
        const isPasswordValid = await bcrypt.compare(req.body.loginPassword, password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        console.log("isPasswordValid =>",isPasswordValid)
        console.log("user =>",user)
        res.redirect('/home');
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
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