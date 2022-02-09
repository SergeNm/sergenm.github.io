import request from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import app from "../../app.js";

import Comment from "../../models/comments.model";
import User from "../../models/user.model";


const tempComment = {
    comment: "This comment is comming from Tests",
    article: process.env.ARTICLE_ID
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

describe("POST Comments", (req, res) => {

    // before('Find user\'s token', (done) => {
    //     User.findOne({ username: 'admin@gmail.com'})
    //         .then((user) => {
    //             tempToken = user.accessToken
    //             done();
    //         });
    // })

    it("should create new comment by specific user for specific article", (done) => {
        request(app)
            .post("/comments/create/" + process.env.USER_ID)
            .set({
                Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
            })
            .send(tempComment)
            .expect(200)
            .then((res) => {
                expect(res.body._id).to.be.eql(process.env.USER_ID);
                done();
            })
            .catch((err) => done(err));
    });

    // it("Should get all comments by specific user", (done) => {
    //     request(app)
    //         .get("/comments/user/"+ process.env.USER_ID)
    //         .set({
    //             Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
    //         })
    //         .expect(200)
    //         .then((res) => {
    //             expect(res.body._id).to.be.eql(process.env.USER_ID);
    //             done();
    //         })
    //         .catch((err) => done(err));
    // });
});



/**
 * After finishing the tests, we should get rid of the temporary comment that we have created in our test database.
 */

after(async () => {
    try {
        const user_ = await User.findOne({ _id: process.env.USER_ID });
        await Comment.deleteOne({ user: user_ });
    } catch (err) {
        console.error(err);
    }
});

