import express from 'express';
import { prismaClient } from './db';

export const app = express();

// parse JSON request bodies
app.use(express.json());

app.post('/sum', async(req, res) => {
    const { a, b } = req.body;

    if(a > 1000000 || b > 1000000) {
        return res.status(422).json({ error: "Input values are too large" });
    }

    const result = a + b;
    res.json({ result })

    // instead of calling below function test will mock this prismaClient instance means replace with a fake one
    // since main goal is to test the server logic without actually hitting the database
    // in this mocking a separate instance is created that can be imported in tests and then it can be mocked.
    await prismaClient.request.create({ 
        data: { 
            a: a, 
            b: b,
            answer: result,
            type: 'sum' 
        } 
    });
});

app.post('/multiply', async (req, res) => {
    const { a, b } = req.body;
    const result = a * b;
    res.json({ result })

    await prismaClient.request.create({ 
        data: { 
            a: a, 
            b: b,
            answer: result,
            type: 'multiply' 
        } 
    });
});


// server.ts file should not start the server directly via app.listen
// because that would interfere with testing as the server would start automatically during tests and cause port conflicts.
// Instead, the server is started in bin.ts

//const PORT = process.env.PORT || 3500;

/*app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
