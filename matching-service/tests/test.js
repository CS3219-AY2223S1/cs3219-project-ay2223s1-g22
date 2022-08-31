import chai from "chai";
import chaiHttp from "chai-http";

import app from "../index.js";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("The health check endpoint", () => {
  it("returns a hello world string", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);

        res.text.should.equal("Hello World from matching-service");

        done();
      });
  });
});
