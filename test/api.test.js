import request from "supertest";

import app from "../dist/src/app";

describe("GET /api/v1", () => {
  it("responds with a json message", async (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toMatchObject({
          message: "Welcome to Resto API",
        });

        done();
      });
  });
});
