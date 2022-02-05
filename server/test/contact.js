// import app from '../server'; // Link to your server file
// import supertest from 'supertest'


// //const supertest = require("supertest");
// const request = supertest(app);




// // This test fails because 1 !== 2
// it("Testing to see if Jest works", () => {
//   expect(1).toBe(1);
// });

// it("gets the test endpoint", async done => {
//   const response = await request.get("/test");

//   expect(response.status).toBe(200);
//   expect(response.body.message).toBe("pass!");
//   done();
// });




// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let server = require("../index");

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'


chai.should();

chai.use(chaiHttp);

describe('Contacts API', () => {

    /**
     * Test the GET route
     */
    describe("GET /api/contact", () => {
        it("It should GET all the contacts", (done) => {
            chai.request(server)
                .get("/api/contact")
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT GET all the tasks", (done) => {
            chai.request(server)
                .get("/api/conttt")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });
})

it("It should connect", (done) => {
    chai.request(server)
        .get("/")
        .end((err, response) => {
            response.should.have.status(200);
        done();
        });
});