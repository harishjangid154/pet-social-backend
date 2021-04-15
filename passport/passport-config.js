import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../dbSchema/userModel";

export default function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    userModel.findById(id).then((user) => {
      done(null, user);
    });
  });
  passport.use(
    new GoogleStrategy(
      {
        // options for google strat
        callbackURL: "/auth/logingoogle/redirect",
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const oldUser = await userModel.findOne({ googleId: profile.id });
        if (oldUser) {
          console.log(oldUser);
          done(null, oldUser);
        } else {
          const user = new userModel({
            username: profile.displayName,
            googleId: profile.id,
          });
          user.save().then((newUser) => {
            console.log(newUser);
            done(null, newUser);
          });
        }
        console.log("you are in");
      }
    )
  );
}
