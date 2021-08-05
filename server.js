const express = require("express");

const usersRoute = require("./routes/users.routes");
const coursesRoute = require("./routes/courses.routes");


const app = express();

require("./config/db");

app.use(express.json({ extended: false }));

app.use("/users", usersRoute);
app.use("/courses", coursesRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on port " + port));
