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


// in the mocking below, we are replacing the prismaClient.request.create method with a mock function
// so that when the server code calls prismaClient.request.create, it will call this mock function instead of the real one
// this prevents actual database operations during tests and allows us to verify that the method was called correctly
// mock is file specific so it will only affect tests in this file
vi.mock('../db', () => {
    return {
        prismaClient: {
            request: {
                create : vi.fn(),
                update : vi.fn(),
            }
            /*user: {  // if we more models eg : user then we can mock them like this but mock will be very deep then so we do deep mocking
                findUnique: vi.fn(),
                create: vi.fn(),
            }*/
        }
    }
})

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
