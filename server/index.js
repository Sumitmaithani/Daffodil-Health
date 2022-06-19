require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/usersdetail");
const childsRoutes = require("./routes/childsdetail");

const path = require("path");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usersdetail", usersRoutes);
app.use("/api/childsdetail", childsRoutes);

app.use(express.static(path.join(__dirname,"build")));
app.get("/*", (req, res) => { 
    res.sendFile(path.join(__dirname, "build", "index.html"))
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));