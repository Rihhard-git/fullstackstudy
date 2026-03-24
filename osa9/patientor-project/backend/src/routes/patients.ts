import express, { NextFunction, Request, Response } from 'express';
import patientService from '../controllers/patientService';
import { newPatientSchema } from '../utils';
import { z } from 'zod';
import {  NewPatient, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientsData());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});
router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const updatedPatient = patientService.addEntry(req.body, id);
        if (updatedPatient) {
                res.send(updatedPatient);
            } else {
                res.sendStatus(400);
            }
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);     
    }   
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.status(201).json(addedPatient);
    
});

router.use(errorMiddleware);

export default router;