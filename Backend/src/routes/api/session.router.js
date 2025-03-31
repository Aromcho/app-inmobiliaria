import express from 'express';
import {
  register,
    login,
    online,
    logout,
} from '../../controllers/session.controller.js';
import passport from '../../middelwares/passport.mid.js';

const sessionRouter = express.Router();

sessionRouter.post('/register',register);
sessionRouter.post('/login', login);
sessionRouter.get('/online', online);
sessionRouter.delete('/logout', logout);
sessionRouter.get("/google", passport.authenticate("google", { scope: [ "email", "profile"] }));
sessionRouter.get("/google/callback", passport.authenticate("google", { session: false }), (req, res, next) => {
  try {
    const token = req.user.token;
    const userName = req.user.user.name; // Extraer el nombre del usuario
    const userId = req.user.user._id;

    // Redirigir al deep link de la aplicación móvil con el token y el nombre del usuario
    return res.redirect(`exp://192.168.0.6:8081?token=${token}&name=${encodeURIComponent(userName)}&user_id=${userId}`);  } catch (error) {
    return next(error);
  }
});
sessionRouter.get(
  '/google/web',
  passport.authenticate('google-web', { scope: ['email', 'profile'] })
);

// Callback específico para la web
sessionRouter.get(
  '/google/web/callback',
  passport.authenticate('google-web', { session: false }),
  (req, res, next) => {
    try {
      const token = req.user.token;
      const userName = req.user.user.name; // Extraer el nombre del usuario

      // Redirigir a la web con el token y el nombre del usuario
      return res.redirect(`http://localhost:5173/?token=${token}&name=${encodeURIComponent(userName)}`);
    } catch (error) {
      return next(error);
    }
  }
);





export default sessionRouter;