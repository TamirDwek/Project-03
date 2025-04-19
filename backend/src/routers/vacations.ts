import { Router } from "express";
import {
  createVacation,
  getAllVacations,
  getVacationsReport,
  getVacationsReportCSV,
  removeVacation,
  updateVacation
} from "../controllers/vacations/controller";
import fileUploader from "../middlewares/file-uploader";
import filesValidation from "../middlewares/files-validation";
import validation from "../middlewares/validation";
import {
  newVacationFilesValidator,
  newVacationValidator,
  updateVacationValidator
} from "../controllers/vacations/validator";
import { followVacation, getFollowedVacations, unfollowVacation } from "../controllers/follows/controller";
import { extractUserFromToken } from "../middlewares/auth/auth";

const vacationsRouter = Router();

vacationsRouter.get("/", getAllVacations);
vacationsRouter.delete('/:id', removeVacation);
vacationsRouter.post("/", fileUploader, filesValidation(newVacationFilesValidator), validation(newVacationValidator), createVacation);
vacationsRouter.patch('/:id', validation(updateVacationValidator), updateVacation);
vacationsRouter.get("/report", getVacationsReport);
vacationsRouter.get("/report/csv", getVacationsReportCSV);
vacationsRouter.post("/:vacationId/follow", followVacation);
vacationsRouter.delete("/:vacationId/unfollow", unfollowVacation);
vacationsRouter.get("/followed", extractUserFromToken, getFollowedVacations);

export default vacationsRouter;
