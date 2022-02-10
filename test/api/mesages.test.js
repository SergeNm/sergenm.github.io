import request from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import app from "../../app.js";

import Message from "../../models/message.model";
import User from "../../models/user.model";


const tempMessage = {
    email: process.env.USER_TEST,
    name: "Tester",
    address: "ADDRESS",
    message: "Testing message"
  };

  const tempUser = {
    username: process.env.USER_TEST,
    password: process.env.USER_TEST_PASSWORD,
  };
  
  let tempToken;

  before(function (done) {
    this.timeout(5000);
    setTimeout(done, 4000);
    
  });
  


  //we can add tests functions. Let's start with signing up new users:

  describe("POST Messages", (req, res) => {
    it("should post add new Message with valid token", (done) => {
      request(app)
        .post("/messages")
        .set({
            Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
        })
        .send(tempMessage)
        .expect(200)
        .then((res) => {
          expect(res.body.email).to.be.eql(tempMessage.email);
          done();
        })
        .catch((err) => done(err));
    });
  });

//   Let's test the "Get" methods now
describe("GET Messages", (req, res) => {
    it("should return all messages", (done) => {
      request(app)
        .get("/messages")
        .set({
            Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch((err) => done(err));
    });

    it("should return specific message", (done) => {
      request(app)
        .get("/messages/6204dc03df8149918a32b4c1")
        .set({
            Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('object').has.property("email");
          done();
        })
        .catch((err) => done(err));
    });

  
  
//     it("shouldn't accept invalid password", (done) => {
//       tempUser.password = process.env.USER_TEST_PASSWORD + "asdf";
//       request(app)
//         .patch("/users/login")
//         .send(tempUser)
//         .expect(400)
//         .then((res) => {
//           expect(res.body.message).to.be.eql("Invalid password");
//           done();
//         })
//         .catch((err) => done(err));
//     });
  
//     it("shouldn't accept non-exisiting username", (done) => {
//       tempUser.username = process.env.USER_TEST + "asdf";
//       request(app)
//         .patch("/users/login")
//         .send(tempUser)
//         .expect(404)
//         .then((res) => {
//           expect(res.body.message).to.be.eql("Account not found");
//           done();
//         })
//         .catch((err) => done(err));
//     });

    
  
//     it("should log out users with valid token", (done) => {
//       request(app)
//         .patch("/users/logout")
//         .set({
//           Authorization: tempToken,
//         })
//         .expect(200)
//         .then((res) => {
//           expect(res.body.message).to.be.eql("User logged out");
//           done();
//         })
//         .catch((err) => done(err));
//     });
  });


//   /**
//    * After finishing the tests, we should get rid of the temporary user that we have created in our test database.
//    */

  after(async () => {
    try {
      await Message.deleteOne({ email: tempMessage.email });
    } catch (err) {
      console.error(err);
    }
  });

