import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

/* register */
router.post(
  '/api/auth/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 chars long'),
    body('username').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: errors.errors[0].msg
        });
      }

      const {email, password, username} = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({email, password: hashedPassword, username});
      await user.save();
      res.status(201).json({ message: 'User has been created' });

    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
});

/* login */
router.route('/api/auth/login')
  .get(authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Authorized' });
  })
  .post(
    [
      body('email').isEmail().withMessage('Invalid email'),
      body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 chars long')
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: errors.errors[0].msg
          });
        }

        const {email, password} = req.body;
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(400).json({ message: 'There is no user with this email' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
          { userId: user.id },
          config.get('secretKey'),
          { expiresIn: '1h' }
        );
        
        res.json({ message: 'You have signed in', token, userId: user.id, username: user.username});

      } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
  );

router.delete('/api/auth/logout', authMiddleware, async (req, res) => {
  res.status(200).json({message: 'You have logged out'});
});

export default router;
