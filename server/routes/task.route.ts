import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import isAuthenticated from '../middlewares/isAuthenticated';
import Task, { TaskModel } from '../models/task.model';
import ProjectTasks from '../models/projecttasks.model';

const router: Router = express.Router();

//create a todaytask
router.post(
  '/today',
  body('title')
    .trim()
    .exists()
    .withMessage('Title is required')
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage('Title must be between 1 and 100 characters'),
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const data: TaskModel = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({
          error: errors.array()[0].msg,
        });
      } else {
        const task = await Task.create({
          title: data?.title,
          description: data?.description,
          userId: userId,
          isTodayTask: true,
          isInboxTask: false,
          isWeeklyTask: false,
        });
        const tasks = await Task.find({
          userId: userId,
          isTodayTask: true,
          completed: false,
          deleted: false,
        });
        res.json(tasks);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//get all todaytasks
router.get('/today', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = res?.locals?.userId;
    const tasks = await Task.find({
      userId: userId,
      isTodayTask: true,
      completed: false,
      deleted: false,
    });
    res.json(tasks);
  } catch (error: any) {
    res.json({
      error: error.message,
    });
  }
});

//delete a todaytask
router.delete(
  '/today/:id',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const task = await Task.findOne({
        _id: req?.params?.id,
        userId: userId,
        isTodayTask: true,
        deleted: false,
      });
      if (task === null) {
        res.json({
          error: 'Task not found',
        });
      } else {
        await Task.findByIdAndUpdate(req?.params?.id, {
          deleted: true,
        });
        const tasks = await Task.find({
          userId: userId,
          isTodayTask: true,
          completed: false,
          deleted: false,
        });
        res.json(tasks);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//update a todaytask
router.put(
  '/today/:id',
  body('title')
    .trim()
    .exists()
    .withMessage('Title is required')
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage('Title must be between 1 and 100 characters'),
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const data: TaskModel = req.body;
      const userId = res?.locals?.userId;
      const task = await Task.findOne({
        _id: req?.params?.id,
        userId: userId,
        isTodayTask: true,
        deleted: false,
      });
      if (task === null) {
        res.json({
          error: 'Task not found',
        });
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.json({
            error: errors.array()[0].msg,
          });
        } else {
          await Task.findByIdAndUpdate(req?.params?.id, {
            title: data?.title,
            description: data?.description,
          });
          const tasks = await Task.find({
            userId: userId,
            isTodayTask: true,
            completed: false,
            deleted: false,
          });
          res.json(tasks);
        }
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//complete a todaytask
router.put(
  '/today/complete/:id',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const task = await Task.findOne({
        _id: req?.params?.id,
        userId: userId,
        isTodayTask: true,
        completed: false,
        deleted: false,
      });
      if (task === null) {
        res.json({
          error: 'Task not found',
        });
      } else {
        await Task.findByIdAndUpdate(req?.params?.id, {
          completed: true,
        });
        const tasks = await Task.find({
          userId: userId,
          isTodayTask: true,
          completed: false,
          deleted: false,
        });
        res.json(tasks);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//search todaytasks
router.get(
  '/today/s/:search',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const searchboi = new RegExp(req.params.search, 'i');
      const userId = res?.locals?.userId;
      const tasks = await Task.find({
        userId: userId,
        isTodayTask: true,
        title: searchboi,
        completed: false,
        deleted: false,
      });
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//sort by time todaytasks
router.get(
  '/today/f/time',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const tasks = await Task.find({
        userId: userId,
        isTodayTask: true,
        completed: false,
        deleted: false,
      }).sort({
        createdAt: -1,
      });
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//sort by title todaytasks
router.get(
  '/today/f/title',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const tasks = await Task.find({
        userId: userId,
        isTodayTask: true,
        completed: false,
        deleted: false,
      }).sort({
        title: -1,
      });
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//create a inboxtask
router.post(
  '/inbox',
  body('title')
    .trim()
    .exists()
    .withMessage('Title is required')
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage('Title must be between 1 and 100 characters'),
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const data: TaskModel = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({
          error: errors.array()[0].msg,
        });
      } else {
        const task = await Task.create({
          title: data?.title,
          description: data?.description,
          userId: userId,
          isTodayTask: false,
          isInboxTask: true,
          isWeeklyTask: false,
        });
        const tasks = await Task.find({
          userId: userId,
          isInboxTask: true,
          completed: false,
          deleted: false,
        });
        res.json(tasks);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//get all inboxtasks
router.get('/inbox', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = res?.locals?.userId;
    const tasks = await Task.find({
      userId: userId,
      isInboxTask: true,
      completed: false,
      deleted: false,
    });
    res.json(tasks);
  } catch (error: any) {
    res.json({
      error: error.message,
    });
  }
});

//delete a inboxtask
router.delete(
  '/inbox/:id',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const task = await Task.findOne({
        _id: req?.params?.id,
        userId: userId,
        isInboxTask: true,
        deleted: false,
      });
      if (task === null) {
        res.json({
          error: 'Task not found',
        });
      } else {
        await Task.findByIdAndUpdate(req?.params?.id, {
          deleted: true,
        });
        const tasks = await Task.find({
          userId: userId,
          isInboxTask: true,
          completed: false,
          deleted: false,
        });
        res.json(tasks);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//update a inboxtask
router.put(
  '/inbox/:id',
  body('title')
    .trim()
    .exists()
    .withMessage('Title is required')
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage('Title must be between 1 and 100 characters'),
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const data: TaskModel = req.body;
      const userId = res?.locals?.userId;
      const task = await Task.findOne({
        _id: req?.params?.id,
        userId: userId,
        isInboxTask: true,
        deleted: false,
      });
      if (task === null) {
        res.json({
          error: 'Task not found',
        });
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.json({
            error: errors.array()[0].msg,
          });
        } else {
          await Task.findByIdAndUpdate(req?.params?.id, {
            title: data?.title,
            description: data?.description,
          });
          const tasks = await Task.find({
            userId: userId,
            isInboxTask: true,
            completed: false,
            deleted: false,
          });
          res.json(tasks);
        }
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//complete a inboxtask
router.put(
  '/inbox/complete/:id',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const task = await Task.findOne({
        _id: req?.params?.id,
        userId: userId,
        isInboxTask: true,
        completed: false,
        deleted: false,
      });
      if (task === null) {
        res.json({
          error: 'Task not found',
        });
      } else {
        await Task.findByIdAndUpdate(req?.params?.id, {
          completed: true,
        });
        const tasks = await Task.find({
          userId: userId,
          isInboxTask: true,
          completed: false,
          deleted: false,
        });
        res.json(tasks);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//search inbox tasks
router.get(
  '/inbox/s/:search',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const searchboi = new RegExp(req.params.search, 'i');
      const userId = res?.locals?.userId;
      const tasks = await Task.find({
        userId: userId,
        isInboxTask: true,
        title: searchboi,
        completed: false,
        deleted: false,
      });
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//sort by time inboxtasks
router.get(
  '/inbox/f/time',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const tasks = await Task.find({
        userId: userId,
        isInboxTask: true,
        completed: false,
        deleted: false,
      }).sort({
        createdAt: -1,
      });
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//sort by title inboxtasks
router.get(
  '/inbox/f/title',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const tasks = await Task.find({
        userId: userId,
        isInboxTask: true,
        completed: false,
        deleted: false,
      }).sort({
        title: -1,
      });
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//create a weeklytask
router.post(
  '/weekly',
  body('title')
    .trim()
    .exists()
    .withMessage('Title is required')
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage('Title must be between 1 and 100 characters'),
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const data: TaskModel = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({
          error: errors.array()[0].msg,
        });
      } else {
        const task = await Task.create({
          title: data?.title,
          description: data?.description,
          userId: userId,
          isTodayTask: false,
          isInboxTask: false,
          isWeeklyTask: true,
        });
        const tasks = await Task.find({
          userId: userId,
          isWeeklyTask: true,
          completed: false,
          deleted: false,
        });
        res.json(tasks);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//get all weeklytasks
router.get('/weekly', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = res?.locals?.userId;
    const tasks = await Task.find({
      userId: userId,
      isWeeklyTask: true,
      completed: false,
      deleted: false,
    });
    res.json(tasks);
  } catch (error: any) {
    res.json({
      error: error.message,
    });
  }
});

//delete a weeklytask
router.delete(
  '/weekly/:id',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const task = await Task.findOne({
        _id: req?.params?.id,
        userId: userId,
        isWeeklyTask: true,
        deleted: false,
      });
      if (task === null) {
        res.json({
          error: 'Task not found',
        });
      } else {
        await Task.findByIdAndUpdate(req?.params?.id, {
          deleted: true,
        });
        const tasks = await Task.find({
          userId: userId,
          isWeeklyTask: true,
          completed: false,
          deleted: false,
        });
        res.json(tasks);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//update a weeklytask
router.put(
  '/weekly/:id',
  body('title')
    .trim()
    .exists()
    .withMessage('Title is required')
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage('Title must be between 1 and 100 characters'),
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const data: TaskModel = req.body;
      const userId = res?.locals?.userId;
      const task = await Task.findOne({
        _id: req?.params?.id,
        userId: userId,
        isWeeklyTask: true,
        deleted: false,
      });
      if (task === null) {
        res.json({
          error: 'Task not found',
        });
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.json({
            error: errors.array()[0].msg,
          });
        } else {
          await Task.findByIdAndUpdate(req?.params?.id, {
            title: data?.title,
            description: data?.description,
          });
          const tasks = await Task.find({
            userId: userId,
            isWeeklyTask: true,
            completed: false,
            deleted: false,
          });
          res.json(tasks);
        }
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//complete a weeklytask
router.put(
  '/weekly/complete/:id',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const task = await Task.findOne({
        _id: req?.params?.id,
        userId: userId,
        isWeeklyTask: true,
        completed: false,
        deleted: false,
      });
      if (task === null) {
        res.json({
          error: 'Task not found',
        });
      } else {
        await Task.findByIdAndUpdate(req?.params?.id, {
          completed: true,
        });
        const tasks = await Task.find({
          userId: userId,
          isWeeklyTask: true,
          completed: false,
          deleted: false,
        });
        res.json(tasks);
      }
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//search weekly tasks
router.get(
  '/weekly/s/:search',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const searchboi = new RegExp(req.params.search, 'i');
      const userId = res?.locals?.userId;
      const tasks = await Task.find({
        userId: userId,
        isWeeklyTask: true,
        title: searchboi,
        completed: false,
        deleted: false,
      });
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//get completed tasks
router.get(
  '/completedtasks',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const task1 = await Task.find({
        userId: userId,
        completed: true,
        deleted: false,
      });
      const task2 = await ProjectTasks.find({
        userId: userId,
        completed: true,
        deleted: false,
      });
      const tasks = [...task1, ...task2];
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//get deleted tasks
router.get(
  '/deletedtasks',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const task1 = await Task.find({
        userId: userId,
        completed: false,
        deleted: true,
      });
      const task2 = await ProjectTasks.find({
        userId: userId,
        completed: false,
        deleted: true,
      });
      const tasks = [...task1, ...task2];
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//sort by time weeklytasks
router.get(
  '/weekly/f/time',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const tasks = await Task.find({
        userId: userId,
        isWeeklyTask: true,
        completed: false,
        deleted: false,
      }).sort({
        createdAt: -1,
      });
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

//sort by title weeklytasks
router.get(
  '/weekly/f/title',
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const userId = res?.locals?.userId;
      const tasks = await Task.find({
        userId: userId,
        isWeeklyTask: true,
        completed: false,
        deleted: false,
      }).sort({
        title: -1,
      });
      res.json(tasks);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
);

export default router;
