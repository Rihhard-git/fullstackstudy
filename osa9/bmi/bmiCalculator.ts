interface BmiValues {
    height: number;
    mass: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            mass: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!!');
    }
};

export const calculateBmi = (height: number, mass: number) => {

    const heightInMeter = height / 100;

    const bmi = mass / (heightInMeter * heightInMeter);

    if (bmi < 16.0) {
        return 'Underweight (Severe thinness)';
    }
    if (bmi < 17.0) {
        return 'Underweight (Moderate thinness)';
    }
    if (bmi < 18.5) {
        return 'Underweight (Mild thinness)';
    }
    if (bmi < 25.0) {
        return 'Normal range';
    }
    if (bmi < 30.0) {
        return 'Overweight (Pre-obese)';
    }
    if (bmi < 35.0) {
        return 'Obese (Class I)';
    }
    if (bmi < 40.0) {
        return 'Obese (Class II)';
    }
    if (bmi >= 40.0) {
        return 'Obese (Class III)';
    } else {
        throw new Error('Something went wrong!');
        
    }
};

try {
    const { height, mass } = parseBmiArguments(process.argv);
    console.log(calculateBmi( height, mass));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

