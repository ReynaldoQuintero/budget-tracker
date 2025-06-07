import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  StrategyOptions,
} from 'passport-google-oauth20';
import {
  insertUser,
  queryUserByGoogleId,
  queryUserByUserId,
} from '../models/db/users/users.repo';
import { UserRoleEnum } from '../models/interfaces/user.model';

export function passporInitialize() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env['GOOGLE_CLIENT_ID'] || 'my_id',
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || 'my_secret',
        callbackURL: '/api/auth/google/callback',
      } as StrategyOptions,
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user already exists in the database
          let user = await queryUserByGoogleId(profile.id);

          if (!user || !user.length || !user[0].length) {
            // If user doesn't exist, create a new user
            await insertUser({
              google_id: profile.id,
              email: profile.emails ? profile.emails[0].value : '', // The email from the Google profile
              name: profile.displayName,
              role: UserRoleEnum.user,
            });
          }

          user = await queryUserByGoogleId(profile.id);

          if (!user || !user.length || !user[0].length) {
            throw new Error('Could not retrieve created user');
          }

          // Return the user
          return done(null, user[0][0]);
        } catch (err) {
          return done(err, undefined);
        }
      }
    )
  );

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  // Deserialize user
  passport.deserializeUser(async (user_id: number, done) => {
    try {
      const result = await queryUserByUserId(user_id);
      if (!result || !result.length || !result[0].length) {
        throw new Error('No user found to deserialize');
      }
      const user = result[0][0];
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
