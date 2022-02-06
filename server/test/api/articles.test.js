import request from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import app from "../../app.js";

import Article from "../../models/article.model";
import User from "../../models/user.model";


const tempArticle = {
    title: "Testing article's title",
    body: "Testing article's body",
  };

  const tempUser = {
    username: process.env.USER_TEST,
    password: process.env.USER_TEST_PASSWORD,
  };
  
  let tempToken;

  before(function (done) {
    this.timeout(3000);
    setTimeout(done, 2000);
    
  });
  


  //we can add tests functions. Let's start with signing up new users:

  describe("POST Articles", () => {
    
    before('Find user\'s token', (done) => {
        User.findOne({ username: 'admin@gmail.com'})
            .then((user) => {
                tempToken = user.accessToken
                done();
            });
    })

    it("should register new article with valid token", (done) => {
        console.log('-----------------------------------------------', tempToken);
      request(app)
        .post("/articles")
        .set({
            Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
        })
        .send(tempArticle)
        .expect(200)
        .then((res) => {
          expect(res.body.title).to.be.eql(tempArticle.title);
          done();
        })
        .catch((err) => done(err));
    });
  
    // it("shouldn't accept the username that already exists in the database", (done) => {
    //   request(app)
    //     .post("/users/signup")
    //     .send(tempUser)
    //     .expect(400)
    //     .then((res) => {
    //       expect(res.body.message).to.be.eql("Username is already in use");
    //       done();
    //     })
    //     .catch((err) => done(err));
    // });
  });

// //   Let's test the "PATCH" methods now
// describe("PATCH users", () => {
//     it("should accept correct credentials", (done) => {
//       request(app)
//         .patch("/users/login")
//         .send(tempUser)
//         .expect(200)
//         .then((res) => {
//           expect(res.body.message).to.be.eql("User logged in successfully");
//           tempToken = `Bearer ${res.body.token}`;
//           console.log("---------------------", tempToken)
//           done();
//         })
//         .catch((err) => done(err));
//     });
  
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
//   });


//   /**
//    * After finishing the tests, we should get rid of the temporary user that we have created in our test database.
//    */

//   after(async () => {
//     try {
//       await User.deleteOne({ username: process.env.USER_TEST });
//     } catch (err) {
//       console.error(err);
//     }
//   });

