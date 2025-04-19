import request from "supertest";
import app from "../../app";
import sequelize from "../../db/sequelize";

describe("Auth Flow (Signup & Login)", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  let token: string;

  test("POST /auth/signup - should register a new user and return jwt", async () => {
    const res = await request(app).post("/auth/signup").send({
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body.jwt).toBeDefined();
    expect(res.body.role).toBe("User");
    token = res.body.jwt;
  });

  test("POST /auth/login - should login the registered user and return jwt", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "testuser@example.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body.jwt).toBeDefined();
    expect(res.body.role).toBe("User");
  });

  test("POST /auth/login - should fail with wrong password", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/wrong credentials/i);
  });
});
