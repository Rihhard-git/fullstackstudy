import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {

    if (!req.query.height || !req.query.weight) {
        res.send({error: 'malformmatted parameters'});
    }
    const height = req.query.height;
    const weight = req.query.weight;

    try {
        const bmi = calculateBmi(Number(height), Number(weight));

        res.send({
            weight: weight,
            height: height,
            bmi: bmi
        });

    } catch {
        res.send({error: 'malformmatted parameters'});
    }  
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).send({ error: 'parameters missing'});
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    if (daily_exercises.some((i: any) => !(typeof i === 'number'))){
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }
    

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);


    return res.send({ result }); 

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});