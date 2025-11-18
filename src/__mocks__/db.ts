import { vi } from 'vitest';

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


// but in deep mocking every method inside prismaClient can be mocked individually so that it does not throw errors during tests
// for example, if the server code calls prismaClient.user.findUnique, then in deep mocking we can mock that method too
// this way we don't have to mock every method manually, we can just create a deep mock of the entire prismaClient object
// this is useful when the code under test calls multiple methods on the prismaClient instance
// deep mocking can be achieved using libraries like jest-mock-extended or by manually creating a deep mock object
// but here we are using simple mocking for demonstration purposes