import { NextFunction, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';

dotenv.config();

export function requireLogin(req: Request, res: Response, next: NextFunction) {
  req.user ? next() : res.sendStatus(401);
}

export function requireGuest(req: Request, res: Response, next: NextFunction) {
  req.user ? res.redirect('/dashboard') : next();
}

const router = Router();

router.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

router.get('/api/auth/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.redirect('/');
  });
});

export const authRoutes = router;
