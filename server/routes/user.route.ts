import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import User, { UserModel } from '../models/user.model';
import { omit } from 'lodash';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

const router: Router = express.Router();

//register
router.post(
  '/register',
  body('username')
    .exists()
    .withMessage('username is required')
    .isLength({
      min: 4,
      max: 20,
    })
    .withMessage('username must be between 4 and 20 characters'),
  body('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be valid'),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({
      min: 8,
      max: 20,
    })
    .withMessage('password must be between 8 and 20 characters'),
  async (req: Request, res: Response) => {
    const data: UserModel = req.body;
    const userbyemail = await User.findOne({
      email: data?.email,
    });
    const userbyusername = await User.findOne({
      username: data?.username,
    });
    if (userbyemail || userbyusername) {
      res.status(403).json({
        error: 'Username or email already exists',
      });
    } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(403).json({
          error: errors.array()[0].msg,
        });
      } else {
        await User.create({
          username: data?.username?.trim(),
          email: data?.email?.trim(),
          password: data?.password?.trim(),
        })
          .then((data) => {
            const userboi2 = omit(data.toJSON(), ['password', 'email']);
            res.status(201).json(userboi2);
          })
          .catch((error) => {
            res.status(403).json({
              error: error.message,
            });
          });
      }
    }
  }
);

//login
router.post(
  '/login',
  body('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be valid'),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({
      min: 8,
      max: 20,
    })
    .withMessage('password must be between 8 and 20 characters'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(403).json({
        error: errors.array()[0].msg,
      });
    } else {
      const body: UserModel = req.body;
      const user = await User.findOne({
        email: body?.email?.trim(),
      });
      if (!user) {
        res.status(403).json({
          error: 'Wrong Credentials',
        });
      } else {
        const hashedpass = await bcrypt.compare(body.password, user.password);
        if (!hashedpass) {
          res.status(403).json({
            error: 'Wrong Credentials',
          });
        } else {
          const userboi = omit(user.toJSON(), ['password', 'email']);
          const token = jwt.sign(
            {
              userId: userboi?._id,
            },
            process.env.JWT_SECRET as Secret,
            {
              expiresIn: '69h',
            }
          );
          res.status(200).json({
            data: token,
          });
        }
      }
    }
  }
);

export default router;