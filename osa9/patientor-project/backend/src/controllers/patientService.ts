
import patientData from '../data/patients';
import { NewPatient, NonSensitivePatientData, Patient, NewEntry, DiagnoseData, HealthCheckRating } from '../types';
import { v1 as uuid } from 'uuid';

const getPatientsData = (): Patient[] => {
    return patientData;
};

const getNonSensitivePatientsData = (): NonSensitivePatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const findById = (id: string): Patient | undefined => {
    const patient = patientData.find(d => d.id === id);
    return patient;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseData['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseData['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseData['code']>;
};

const addEntry = ( entryData: NewEntry, patientId: string): Patient | undefined => {

    if (!entryData.type || !entryData.description || !entryData.date || !entryData.specialist) {
        throw new Error('Missing data...');
    }

    switch (entryData.type) {
        case "Hospital": {  
            const newEntry = {
                ...entryData,
                id: uuid(),
                diagnosisCodes: parseDiagnosisCodes(entryData.diagnosisCodes)
                };
            if (newEntry.discharge.date && newEntry.discharge.criteria) {

                patientData.find(p => p.id === patientId)?.entries.push(newEntry);

                return patientData.find(p => p.id === patientId);
            } else {
                break;
            }
        }          
        case 'OccupationalHealthcare': {
            const newEntry = {
                ...entryData,
                id: uuid(),
                };
            if (newEntry.employerName) {

                patientData.find(p => p.id === patientId)?.entries.push(newEntry);

                return patientData.find(p => p.id === patientId);
            } else {
                break;
            }
        }
        case 'HealthCheck':
            {
            const newEntry = {
                ...entryData,
                id: uuid(),
                };
            if (newEntry.healthCheckRating <= HealthCheckRating.CriticalRisk && newEntry.healthCheckRating >= HealthCheckRating.Healthy) {
                console.log(newEntry.healthCheckRating);

                patientData.find(p => p.id === patientId)?.entries.push(newEntry);

                return patientData.find(p => p.id === patientId);
            } else {

                throw new Error(`Value of healthCheckRating incorrect:  ${newEntry.healthCheckRating}`);    
            }
        }
    }

    return undefined;
};

const addPatient = ( data: NewPatient ): Patient => {

    const newPatient = {
        id: uuid(),
        entries: [] ,
        ...data
    };

    patientData.push(newPatient);

    return newPatient;
};

export default {
    getPatientsData,
    getNonSensitivePatientsData,
    addPatient,
    findById,
    addEntry
};