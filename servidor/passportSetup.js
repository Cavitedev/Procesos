const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();

const env = process.env;

iniciarAuth = function () {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        console.log("Auth works");
        return done(null, profile.displayName);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
      }
    )
  );

  console.log("Google cloud ID: " + env.GOOGLE_CLIENT_ID);
  console.log("Google cloud secret: " + env.GOOGLE_CLIENT_SECRET);
  console.log("Passport callback: " + passport.callbackURL);
};

module.exports.iniciarAuth = iniciarAuth;
