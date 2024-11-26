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
sessionRouter.get("/google/callback", passport.authenticate("google", { session:false }), (req, res, next) => {
  try {
    return res.json({
      statusCode: 200, 
      message: "Google Auth Success",
    });
  } catch (error) {
    return next(error);
    
  }
});

export default sessionRouter;