const express = require("express");

const app = express();

app.use('/', require("./routes/index"))

app.listen(2000, () => {
    console.log("running on port 2000");
})