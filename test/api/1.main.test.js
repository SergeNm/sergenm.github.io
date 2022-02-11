import request from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import app from "../../app.js";

describe("HOME", (req,res)=>{
    it("Should connect", (done)=>{
        request(app)
        .get('/')
        .expect(200)
        .then((res)=>{
            expect(res.body)
            done()
        })
    })
})