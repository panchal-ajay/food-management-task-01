let express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = 9000;

let app = express();

mongoose.connect("mongodb://localhost:27017/ApplicationForm");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//middileware
const middleware = require("./middleware/auth");
app.use("/admin/auth/*", middleware);

//admin
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin/", adminRoutes);

//user
const userRoutes = require("./routes/userRoutes");
app.use("/admin/auth/", userRoutes);

//application basic create routes
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/application/", applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
