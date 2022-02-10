import request from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import app from "../../app.js";

import Like from "../../models/like.model";
import User from "../../models/user.model";




const tempUser = {
    username: process.env.USER_TEST,
    password: process.env.USER_TEST_PASSWORD,
};

let tempLike = {article: process.env.ARTICLE_ID}

let tempToken = process.env.TEMP_TOKEN;

before(function (done) {
    this.timeout(3000);
    setTimeout(done, 2000);

});



//we can add tests functions. Let's start with signing up new users:

describe("Like CRUDs", (req, res) => {

    // before('Find user\'s token', (done) => {
    //     User.findOne({ username: 'admin@gmail.com'})
    //         .then((user) => {
    //             tempToken = user.accessToken
    //             done();
    //         });
    // })

    it("should Liked by specific user for specific article", (done) => {
        request(app)
            .post("/likes/create/" + process.env.USER_ID)
            .set({
                Authorization: `Bearer ${tempToken}`,
            })
            .send(tempLike)
            .expect(200)
            .then((res) => {
                expect(res.body._id).to.be.eql(process.env.USER_ID);
                done();
            })
            .catch((err) => done(err));
    });

    it("Should get all likes by specific user", (done) => {
        request(app)
            .get("/likes/user/" + process.env.USER_ID)
            .set({
                Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
            })
            .expect(200)
            .then((res) => {
                //expect(res.body._id).to.be.eql(process.env.USER_ID);
                expect(res.body).to.be.an('array');
                //console.log(res.body);
                done();
            })
            .catch((err) => done(err));
    });

    it("Should get all likes by specific article", (done) => {
        request(app)
            .get("/likes/article/" + process.env.ARTICLE_ID)
            .set({
                Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
            })
            .expect(200)
            .then((res) => {
                //expect(res.body._id).to.be.eql(process.env.USER_ID);
                expect(res.body).to.be.an('array');
                // console.log(res.body);
                done();
            })
            .catch((err) => done(err));
    });

});



/**
 * After finishing the tests, we should get rid of the temporary like that we have created in our test database.
 */

after(async () => {
    try {
        const user_ = await User.findOne({ _id: process.env.USER_ID });      
        const like = await Like.findOne({user: user_})
        await Like.deleteOne({ user: user_ });
        
    } catch (err) {
        console.error(err);
    }
});

