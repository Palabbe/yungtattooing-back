const express = require("express");
const connection = require("./conf");
const app = express();
const port = process.env.PORT || 4040;
const morgan = require("morgan");
const cors = require("cors");

const aboutRouter = require("./routes/About");
const workRouter = require("./routes/Work");
const recommendationsRouter = require("./routes/Recommendations");

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/about", aboutRouter);
app.use("/work", workRouter);
app.use("/recommendations", recommendationsRouter);

connection.connect((err) => {
  if (err) {
    console.error("error connecting to db");
  } else {
    console.log("connected to db");
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
