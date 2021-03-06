import express, { Request, Response, Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import Tag, { TagModel } from '../models/tag.model';
import { body, validationResult } from 'express-validator';
import User from "../models/user.model"
import {omit} from "lodash"

const router: Router = express.Router();

//create a tag
router.post(
  '/',
  body('name')
    .trim()
    .exists()
    .withMessage('Tag name is required')
    .isLength({
      min: 1,
      max: 50,
    })
    .withMessage('Tag name must be between 1 and 50 characters'),
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const data: TagModel = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({
          error: errors.array()[0].msg,
        });
      } else {
        const tag = await Tag.create({
          name: data?.name,
          description: data?.description,
          color: data?.color,
          userId: userId,
        });
        const tags = await Tag.find({
          userId: userId,
        });
        res.json(tags);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//delete a tag
router.delete(
  '/:tagId',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const tagId = req?.params?.tagId;
      const tag = await Tag.findOne({
        _id: tagId,
        userId: userId,
      });
      if (tag === null) {
        res.json({
          error: 'Tag not found',
        });
      } else {
        await Tag.findByIdAndDelete(tagId);
        const tags = await Tag.find({
          userId: userId,
        });
        res.json(tags);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//get a tag
router.get('/', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = res?.locals?.userId;
    const tags = await Tag.find({
      userId: userId,
    });
    res.json(tags);
  } catch (error: any) {
    res.json({
      error: error.message,
    });
  }
});

//update tag
router.put(
  '/:tagId',
  body('name')
    .trim()
    .exists()
    .withMessage('Tag name is required')
    .isLength({
      min: 1,
      max: 50,
    })
    .withMessage('Tag name must be between 1 and 50 characters'),
  isAuthenticated,
  async (req: Request, res: Response) => {
    const data: TagModel = req.body;
    try {
      const userId = res?.locals?.userId;
      const tagId = req?.params?.tagId;
      const tag = await Tag.findOne({
        _id: tagId,
        userId: userId,
      });
      if (tag === null) {
        res.json({
          error: 'Tag not found',
        });
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.json({
            error: errors.array()[0].msg,
          });
        } else {
          await Tag.findByIdAndUpdate(tagId, {
            name: data?.name,
            description: data?.description,
            color: data?.color,
          });
          const tags = await Tag.find({
            userId: userId,
          });
          res.json(tags);
        }
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

router.get("/:tagId",isAuthenticated,async(req:Request,res:Response) => {
    try {
      const userId = res?.locals?.userId;
      const tagId = req?.params?.tagId;
      const tag = await Tag.findOne({
        _id: tagId,
        userId: userId,
      });
      if (tag === null) {
        res.json({
          error: 'Tag not found',
        });
      } else {
        res.json(tag);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
})

router.put(
  '/:tagId/comment',
  body('comment')
    .trim()
    .exists()
    .withMessage('Comment is required')
    .isLength({
      min: 1,
      max: 50,
    })
    .withMessage('Comment must be between 1 and 100 characters'),
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const data = req.body;
      const tagId = req?.params?.tagId;
      const userboi = await User.findById(userId);
      const userboi2 = omit(userboi.toJSON(), ['email', 'password']);
      const tag = await Tag.findOne({
        _id: tagId,
      });
      if (tag === null) {
        res.json({
          error: 'Tag not found',
        });
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.json({
            error: errors.array()[0].msg,
          });
        } else {
          await tag.updateOne({
            $push: {
              comments: {
                comment: data?.comment,
                user: userboi2,
              },
            },
          });
          const tags = await Tag.find({
            userId: userId,
          });
          res.json(tags);
        }
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

export default router;
