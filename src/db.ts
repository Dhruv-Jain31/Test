// mocking means to make something dummy or fake for testing purposes
//prismaClient will no longer be used directly in the application code
// instead, we will use this prismaClient instance which can be mocked in tests
// in simple terms, mocking allows us to replace real implementations with fake ones during testing
// this is useful for isolating tests and avoiding side effects like database access
// we can control the behavior of the mocked instance to test different scenarios
// we can do mocking by two ways: 
// 1. either mock the entire module where prismaClient is defined.
// 2. or create a separate mock instance that can be used in tests
// here, we are creating a separate instance that can be imported in tests and then it can be mocked

import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

// right now prismaClient is returing a object that has methods to interact with the database
// eg: prismaClient.request.create() method to create a new record in the request table
// but in the mock version, we can replace this with a fake object that has the same methods but with dummy implementations
// for example: {prismaClient : { request: { create: mockFunction }}}
// but in tests we can replace this with a fake object that has the same methods but with dummy implementations
// this way we can test our application logic without actually hitting the database
// for example, we can mock the create method to return a predefined value instead of actually inserting data into the database
// this makes our tests faster and more reliable since they don't depend on the state of the database