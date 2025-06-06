const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");

const hireeRoutes = require("./routes/hiree_routes");
const hirerRoutes = require("./routes/hirer_routes");


const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/api/hiree", hireeRoutes);
app.use("/api/hirer", hirerRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})