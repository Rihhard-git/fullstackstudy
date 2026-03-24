interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


const parseArguments = (args: string[]) => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const values = args.slice(2);

    values.forEach(v => {
        console.log(v);
        if (isNaN(Number(v))) {
            throw new Error('Provided values were not numbers!!');
        }
    });
    const numbers = values.map(i => Number(i));
    return numbers;
};

export const calculateExercises = (dailyHours: number[], targetValue: number): Result => {

    let ratingObjet = { rating: 0, ratingDesc: ''};

    if ((targetValue - (dailyHours.reduce((s, v) => s + v)) / dailyHours.length) > 1) {
        ratingObjet = {
            rating: 1,
            ratingDesc: 'you could do much better...'
        };
    } else if ((targetValue - (dailyHours.reduce((s, v) => s + v)) / dailyHours.length) > 0) {
        ratingObjet = {
            rating: 2,
            ratingDesc: 'not too bad but could be better'
        };
    } else if ((targetValue - (dailyHours.reduce((s, v) => s + v)) / dailyHours.length) < 0) {
        ratingObjet = {
            rating: 3,
            ratingDesc: 'Good job! You hit your target!'
        };
    }
    


    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(h => h > 0).length,
        success: ((dailyHours.reduce((s, v) => s + v)) / dailyHours.length) > targetValue,
        rating: ratingObjet.rating,
        ratingDescription: ratingObjet.ratingDesc,
        target: targetValue,
        average: (dailyHours.reduce((s, v) => s + v)) / dailyHours.length
    };

};
try {

    const numbers = parseArguments(process.argv);
    const target = numbers[0];
    const hours = numbers.slice(1);
    console.log(calculateExercises(hours, target));

} catch (error: unknown) {
    let errorMessage = 'Something went wrong!';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}


