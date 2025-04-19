import { NextFunction, Request, Response } from "express";
import Followers from "../../models/followers";
import Vacations from "../../models/vacations";
import { StatusCodes } from "http-status-codes";

export async function followVacation(
  req: Request<{ vacationId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const vacationId = req.params.vacationId;
    const userId = req.userId;

    const existingFollow = await Followers.findOne({ where: { userId, vacationId } });
    if (existingFollow) {
      return next(new Error("Already liked"));
    }

    await Followers.create({ userId, vacationId });

    // like count
    const count = await Followers.count({ where: { vacationId } });
    await Vacations.update({ likesCount: count }, { where: { id: vacationId } });

    // io like count
    req.io?.emit("like-updated", { vacationId, likesCount: count });

    res.status(StatusCodes.CREATED).json({ message: "Vacation liked successfully" });
  } catch (e) {
    next(e);
  }
}

export async function unfollowVacation(
  req: Request<{ vacationId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const vacationId = req.params.vacationId;
    const userId = req.userId;

    const isUnfollowed = await Followers.destroy({ where: { userId, vacationId } });
    if (isUnfollowed === 0) {
      return next(new Error("Follow record not found"));
    }

    const count = await Followers.count({ where: { vacationId } });
    await Vacations.update({ likesCount: count }, { where: { id: vacationId } });

    // io like count
    req.io?.emit("like-updated", { vacationId, likesCount: count });

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
}

export async function getFollowedVacations(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const follows = await Followers.findAll({ where: { userId } });

    const vacationIds = follows.map((f) => f.vacationId);
    res.json(vacationIds);
  } catch (e) {
    next(e);
  }
}