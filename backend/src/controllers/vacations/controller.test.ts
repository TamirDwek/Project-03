import request from "supertest";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import app from "../../app";
import Users from "../../models/users";
import Vacations from "../../models/vacations";
import sequelize from "../../db/sequelize";
let jwt = "";

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // login and hash them
  const password = "123456";
  const hashed = await bcrypt.hash(password, 10);
  await Users.create({
    id: uuid(),
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    password: hashed,
    role: "Admin",
  });

  const loginRes = await request(app).post("/auth/login").send({
    email: "test@example.com",
    password: "123456",
  });

  jwt = loginRes.body.jwt;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Vacations Controller", () => {
  test("GET /vacations should return empty array initially", async () => {
    const res = await request(app)
      .get("/vacations")
      .set("Authorization", `Bearer ${jwt}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test("POST /vacations should create a new vacation", async () => {
    const res = await request(app)
      .post("/vacations")
      .set("Authorization", `Bearer ${jwt}`)
      .field("destination", "Rome")
      .field("description", "Colosseum visit")
      .field("startDate", "2025-06-01")
      .field("endDate", "2025-06-05")
      .field("price", "999")
      .attach("imageFile", Buffer.from("fake-image-content"), "image.jpg");

    expect(res.status).toBe(201);
    expect(res.body.destination).toBe("Rome");
  });

  test("GET /vacations should return 1 vacation after creation", async () => {
    const res = await request(app)
      .get("/vacations")
      .set("Authorization", `Bearer ${jwt}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].destination).toBe("Rome");
  });
});
