import express from 'express';

export const app = express();

// parse JSON request bodies
app.use(express.json());

app.post('/sum', (req, res) => {
    const { a, b } = req.body;

    if(a > 1000000 || b > 1000000) {
        return res.status(422).json({ error: "Input values are too large" });
    }

    const result = a + b;
    res.json({ result })
});

app.post('/multiply', (req, res) => {
    const { a, b } = req.body;
    const result = a * b;
    res.json({ result })
});


// server.ts file should not start the server directly via app.listen
// because that would interfere with testing as the server would start automatically during tests and cause port conflicts.
// Instead, the server is started in bin.ts

//const PORT = process.env.PORT || 3500;

/*app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
