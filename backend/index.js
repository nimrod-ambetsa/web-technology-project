const express = require("express")
const bodyParser = require("body-parser");

const hireeRoutes = require("./routes/hiree_routes");
const hirerRoutes = require("./routes/hirer_routes");


const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/hiree", hireeRoutes);
app.use("/hirer", hirerRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})