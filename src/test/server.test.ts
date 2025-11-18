import { app } from "../server";
import { it, describe, expect, beforeAll, afterAll, vi } from 'vitest'; 
import axios from 'axios';
import request from 'supertest';


// beforeAll and afterAll are Jest hooks that run before and after all tests in the describe block
// done parameter is a callback to signal async completion means the test framework to wait until the async operation is complete before proceeding


/*describe("Tests for /sum endpoint", () => {
    let server: any; // lets us store the server in a variable so we can close it later
    const PORT = 4000; // Use a different port for testing to avoid conflicts
    const BASE_URL = `http://localhost:${PORT}`;
    beforeAll((done) => {
        server = app.listen(PORT, () => {
            console.log(`Test server running on port ${PORT}`);
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    it("should return the sum of two numbers", async () => {
        const response = axios.post(`${BASE_URL}/sum`, {
            a: 5,
            b: 3
        });
        expect((await response).data).toEqual({ result: 8 });
    });
});

describe("Tests for /multiply endpoint", () => {
    let server: any; // lets us store the server in a variable so we can close it later
    const PORT = 4001; // Use a different port for testing to avoid conflicts
    const BASE_URL = `http://localhost:${PORT}`;
    beforeAll((done) => {
        server = app.listen(PORT, () => {
            console.log(`Test server running on port ${PORT}`);
            done();
        });
    });
    afterAll((done) => {
        server.close(done);
    }); 

    it("should return the product of two numbers", async () => {
        const response = axios.post(`${BASE_URL}/multiply`, {
            a: 5,   
            b: 3
        });
        expect((await response).data).toEqual({ result: 15 });
    });
}); */


// using supertest to simplify the server testing process
// supertest allows us to test HTTP endpoints without manually starting and stopping the server
// it provides a high-level abstraction for testing HTTP, making it easier to write and maintain tests
// request(app) creates a SuperTest instance bound to our Express app

// since there is __mocks__ folder with db.ts file then it will find the mock finctions
vi.mock('../db');

describe("Tests for /sum endpoint", () => {
    it("should return the sum of two numbers", async () => {
        const response = await request(app)
            .post("/sum")
            .send({ a: 5, b: 3 });
        expect(response.body).toEqual({ result: 8 });
        expect(response.status).toBe(200);
    });

    it("should return 422 for large input values", async () => {
        const response = await request(app)
            .post("/sum")
            .send({ a: 1000001, b: 2 });
        expect(response.body).toEqual({ error: "Input values are too large" });
        expect(response.status).toBe(422);
    });
});

describe("Tests for /multiply endpoint", () => {
    it("should return the product of two numbers", async () => {
        const response = await request(app)
            .post("/multiply")
            .send({ a: 5, b: 3 });
        expect(response.body).toEqual({ result: 15 });
        expect(response.status).toBe(200);
    });
});
