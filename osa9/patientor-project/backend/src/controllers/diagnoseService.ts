import diagnoseData from '../data/diagnoses';
import { DiagnoseData } from '../types';

const getDiagnoses = (): DiagnoseData[] => {
    return diagnoseData;
};

export default {
    getDiagnoses
};
