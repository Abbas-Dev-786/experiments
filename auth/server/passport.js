const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const User = require("./models/userModel");
const AppError = require("./utils/AppError");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "verydangerousSecret";

module.exports.passportJWTStrategy = () => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        if (user && user.isActive) {
          return done(null, user);
        }

        return done(new AppError("user does not exists", 404), false);
      } catch (err) {
        done(new AppError(err.message, err.statusCode), false);
      }
    })
  );
};

module.exports.passportGoogleAuth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "1053901786837-8s8vpqhmsana8f13j8t4rveee25obvtr.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/api/v1/users/auth/google/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const { given_name, family_name, email } = profile._json;

          let existingUser = await User.findOne({ email });
          if (existingUser) {
            return done(null, existingUser);
          }

          // console.log("Creating new user...");
          const newUser = new User({
            firstName: given_name,
            lastName: family_name,
            email,
            password: "test1234",
          });
          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

/*
clientID:
          "1053901786837-ffhqkfekv0p2qq55f2cr3eh14prb3l52.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google",
        passReqToCallback: true,
*/
