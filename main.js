require("dotenv").config({
  path:
    __dirname +
    (process.env.NODE_ENV == "production" ? "/.env.production" : "/.env.local"),
});
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
const mongoStore = require("connect-mongo");
const cors = require("cors");
const port = process.env.PORT || 4000;
const fs = require("fs");
const googleAuth = require("./routes/auth/googleAuth");
const localAuth = require("./routes/auth/localAuth");
const announcement = require("./routes/announcement");
const admin = require("./routes/admin");
const auth=require("./routes/auth/auth");
const speciality = require("./routes/speciality");
const files=require("./routes/files")
const dbConnect = require("./config/dbConnect");
const app = express();
app.use(
  cors({
    origin: JSON.parse(process.env.ACCESS_URLS),
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: "512mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "512mb" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
      collectionName: "sessions",
      mongoUrl: process.env.DATABASE_URL,
    }),
  })
);
app.use('/uploads', express.static('uploads'));
require("./config/googleStrategy")(passport);
require("./config/localStrategy")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", googleAuth);
app.use("/auth", localAuth);
app.use("/auth", auth);
app.use("/announcement", announcement);
app.use("/admin", admin);
app.use("/speciality", speciality);
app.use("/files",files)

// create upload folder if not exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    console.log("Database connected");
  })
  .catch((error) => {
    console.error(error);
  });
