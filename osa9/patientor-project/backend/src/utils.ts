import { Gender, NewPatient } from "./types";
import z from 'zod';

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    gender: z.enum(Gender),
    ssn: z.string(),
    occupation: z.string(),
});


export const toNewPatient = (object: unknown): NewPatient => {
    return newPatientSchema.parse(object);
};

