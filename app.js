require("dotenv").config()

const express = require("express")
const passport = require("passport")
const passportSetup = require("./config/oauth")
const mongoose = require("mongoose")
const cookiSession = require("cookie-session")

// Create a new Express application.
const app = express()

// Configure view engine to render EJS templates.
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(cookiSession({
  maxAge: 24*60*60*100,
  keys: [process.env.COOKIE_KEY]

}))


//connect to mongoDB
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to mongoDB.")
})

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require("morgan")("combined"))
app.use(require("cookie-parser")())
app.use(require("body-parser").urlencoded({ extended: true }))
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
)

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize())
app.use(passport.session())

// Define routes.
app.get("/", function(req, res) {
  res.render("home", { user: req.user })
})

app.get("/login", function(req, res) {
  res.render("login")
})

app.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

app.get(
  "/return",
  passport.authenticate("google", { failureRedirect: "/login" }), //??? this is a middleware
  function(req, res) {
    res.redirect("/")
  }
)

app.get(
  "/profile", 
  require("connect-ensure-login").ensureLoggedIn(),
  function(req,res) {
    res.render("profile", { user: req.user })
  }
)

app.listen(3000)

//----------------------------------------------------------------------------
/* app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
)

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/")
  }
) */
/* require("dotenv").config()

const express = require('express')
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
//GOOGLE_CLIENT_ID
//GOOGLE_CLIENT_SECRET
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "99643478567-2ljdav5o5vn5a8a8r48mohsanucv9brh.apps.googleusercontent.com",
      clientSecret: "cYvHrm2hnGdRs23MNDZZeZUy",
      callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      //User.findOrCreate({ googleId: profile.id }, function(err, user) {
      //  return done(err, user)
      //})
      return done(err, user)
    }
  )
)

passport.serializeUser(function(user, cb) {
  cb(null, user)
})

passport.deserializeUser(function(obj, cb) {
  cb(null, obj)
}) */

//----------------------------------------------------------------------------
/* app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
)

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/")
  }
) */
