import { NextFunction, Request, Response } from "express";
import Vacations from "../../models/vacations";
import TwitterError from "../../errors/twitter-error";
import { StatusCodes } from "http-status-codes";
import { Sequelize } from "sequelize-typescript";
import { Parser } from 'json2csv';

export async function getAllVacations(req: Request, res: Response, next: NextFunction) {
  try {
    const vacations = await Vacations.findAll({
      attributes: [
        "id",
        "destination",
        "description",
        "startDate",
        "endDate",
        "price",
        "imageFile",
        "likesCount"
      ],
      order: [["startDate", "ASC"]]
    });
    res.json(vacations);
  } catch (e) {
    console.error("❌ getAllVacations failed:", e);
    next(e);
  }
}

export async function createVacation(req: Request, res: Response, next: NextFunction) {
  try {
    const { destination, description, startDate, endDate, price } = req.body;
    const file = req.files?.imageFile;
    let imageFile = "";

    if (file && !Array.isArray(file)) {
      imageFile = `/uploads/${file.name}`;
      await file.mv(`./public${imageFile}`);
    }

    const newVacation = await Vacations.create({
      destination,
      description,
      startDate,
      endDate,
      price,
      imageFile,
      likesCount: 0,
    });

    req.io?.emit("vacation-added", newVacation);

    res.status(StatusCodes.CREATED).json(newVacation);
  } catch (e) {
    next(e);
  }
}

export async function updateVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    console.log("Received body:", req.body);
    const { destination, description, startDate, endDate, price, imageFile } = req.body;
    const vacation = await Vacations.findByPk(req.params.id);

    if (!vacation) {
      return next(new TwitterError(StatusCodes.NOT_FOUND, "The vacation you were trying to update does not exist"));
    }

    vacation.destination = destination;
    vacation.description = description;
    vacation.startDate = startDate;
    vacation.endDate = endDate;
    vacation.price = price;

    if (imageFile) {
      vacation.imageFile = imageFile;
    }

    await vacation.save();
    res.json(vacation);
  } catch (e) {
    next(e);
  }
}

export async function removeVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const deletedRows = await Vacations.destroy({ where: { id } });

    if (deletedRows === 0) {
      return next(new TwitterError(StatusCodes.NOT_FOUND, "The vacation you were trying to delete does not exist"));
    }

    req.io?.emit("vacation-deleted", { id });

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
}

export async function getVacationsReport(req: Request, res: Response, next: NextFunction) {
  try {
    const report = await Vacations.findAll({
      attributes: ["destination", "likesCount"],
      order: [["likesCount", "DESC"]]
    });

    res.status(StatusCodes.OK).json(report);
  } catch (e) {
    console.error("❌ getVacationsReport failed:", e);
    next(e);
  }
}

export async function getVacationsReportCSV(req: Request, res: Response, next: NextFunction) {
  try {
    const report = await Vacations.findAll({
      attributes: [
        'destination',
        [Sequelize.fn('COUNT', Sequelize.col('followers.id')), 'followersCount']
      ],
      include: [
        {
          association: 'followers',
          attributes: [],
          through: { attributes: [] },
        },
      ],
      group: ['Vacations.id'],
      order: [[Sequelize.literal('followersCount'), 'DESC']],
      raw: true,
    });

    const parser = new Parser({ fields: ['destination', 'followersCount'] });
    const csv = parser.parse(report);

    res.header('Content-Type', 'text/csv');
    res.attachment('vacations-report.csv');
    res.send(csv);
  } catch (e) {
    next(e);
  }
}
