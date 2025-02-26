import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { createHash, verifyHash } from "../utils/hash.util.js";
import UserManager from "../manager/user.manager.js";
import { createToken } from "../utils/token.util.js";
import dotenv from 'dotenv';

dotenv.config();

// Estrategia de registro local
passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
  try {
    if (!email || !password) {
      const error = new Error("Please enter email and password!");
      error.statusCode = 400;
      return done(error);
    }
    const userExist = await UserManager.readByEmail(email);
    if (userExist) {
      const error = new Error("User already exists!");
      error.statusCode = 400;
      return done(error);
    }
    const hashedPassword = await createHash(password);
    const newUser = await UserManager.create({ email, password: hashedPassword });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
}));

// Estrategia de inicio de sesión local
passport.use("login", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
  try {
    const one = await UserManager.readByEmail(email);
    if (!one) {
      const error = new Error("Bad auth from login!");
      error.statusCode = 401;
      return done(error, false);
    }
    const verify = verifyHash(password, one.password);
    if (verify) {
      const user = { email, role: one.role, photo: one.photo, user_id: one._id, online: true };
      const token = createToken({ id: one._id, role: one.role });
      user.token = token;
      return done(null, user);
    } else {
      const error = new Error("Bad auth from login!");
      error.statusCode = 401;
      return done(error, false);
    }
  } catch (error) {
    return done(error);
  }
}));

// Estrategia de Google
// Estrategia de Google
passport.use("google", new GoogleStrategy(
  { 
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: "https://mi-hogar.online/api/sessions/google/callback", 
    passReqToCallback: true 
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
      if (!email) {
        return done(new Error("No email found in profile"), null);
      }

      let user = await UserManager.readByEmail(email);
      if (!user) {
        user = {
          email,
          name: profile.displayName,
          password: createHash(profile.id),  // Puede ser cualquier valor ya que no se usará realmente
          photo: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : ''
        };
        user = await UserManager.create(user);
      }

      // Crear el token para el usuario autenticado
      const token = createToken({ id: user._id, role: user.role });
      console.log('token:', token, 'user:', user);
      // Devolver el usuario y el token
      return done(null, { user, token });
    } catch (error) {
      return done(error);
    }
  }
));
passport.use("google-web", new GoogleStrategy(
  { 
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: "http://localhost:6080/api/sessions/google/web/callback", 
    passReqToCallback: true 
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
      if (!email) {
        return done(new Error("No email found in profile"), null);
      }

      let user = await UserManager.readByEmail(email);
      if (!user) {
        user = {
          email,
          name: profile.displayName,
          password: createHash(profile.id),  // Puede ser cualquier valor ya que no se usará realmente
          photo: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : ''
        };
        user = await UserManager.create(user);
      }

      // Crear el token para el usuario autenticado
      const token = createToken({ id: user._id, role: user.role });
      console.log('token:', token, 'user:', user);
      // Devolver el usuario y el token
      return done(null, { user, token });
    } catch (error) {
      return done(error);
    }
  }
));





// Estrategia JWT
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_JWT
}, async (jwtPayload, done) => {
  try {
    const user = await UserManager.readById(jwtPayload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error);
  }
}));

export default passport;