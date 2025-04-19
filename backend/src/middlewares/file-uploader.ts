import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import config from "config";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: config.get<string>("s3.connection.region"),
  credentials: {
    accessKeyId: config.get<string>("s3.connection.credentials.accessKeyId"),
    secretAccessKey: config.get<string>("s3.connection.credentials.secretAccessKey"),
  },
  endpoint: config.get<string>("s3.connection.endpoint"),
  forcePathStyle: config.get<boolean>("s3.connection.forcePathStyle"),
});

declare global {
  namespace Express {
    interface Request {
      imageFile?: string;
    }
  }
}

export default async function fileUploader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.files || !req.files.image) return next();

    const image = req.files.image as UploadedFile;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: config.get<string>("s3.bucket"),
        Key: `${uuidv4()}${path.extname(image.name)}`,
        Body: image.data,
        ContentType: image.mimetype,
      },
    });

    const response = await upload.done();
    req.body.imageFile = response.Location;
    next();
  } catch (error) {
    console.error("File upload failed:", error);
    res.status(500).json({ error: "File upload failed" });
  }
}
