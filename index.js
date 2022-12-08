const express = require("express");
const cookieparser = require("cookie-parser")
const expresslayouts = require("express-ejs-layouts")
const db = require("./config/mongoose")
const app = express();
app.use(express.urlencoded());
app.use(cookieparser())
app.use(expresslayouts)
app.use(express.static("./assets"))


//extract styles and scripts from sub pages into the layout file
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use('/', require("./routes/index"))

app.set('view engine', "ejs");
app.set("views", './views');


app.listen(2000, () => {
    console.log("running on port 2000");
})