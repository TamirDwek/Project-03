import { Router } from "express";
import { extractUserFromToken } from "../middlewares/auth/auth"; // המידלואר למזהה המשתמש
import { followVacation, unfollowVacation } from "../controllers/follows/controller";

const vacationsRouter = Router();

// עדכון נתיב הלייקים
vacationsRouter.post("/:vacationId/follow", extractUserFromToken, followVacation);
vacationsRouter.delete("/:vacationId/unfollow", extractUserFromToken, unfollowVacation);

export default vacationsRouter;
