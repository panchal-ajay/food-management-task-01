let express = require("express");
const connectToDatabase = require("./database/database")
const bodyParser = require("body-parser");

const PORT = 9000;

let app = express();
//conncetion to database
connectToDatabase()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//middileware
const middleware = require("./middleware/auth");
app.use("/user/*", middleware);

//auth
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);
//menu
const menuRoutes = require("./routes/menuRoutes");
app.use("/user/", menuRoutes);
//user
const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/user/", orderRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
