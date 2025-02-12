export const getScore = (errors) => {
    // Calculate the overall impact of the errors multiplied by their respective intensities (impact * intensity)

    const totalImpact = errors.reduce((acc, error) => {
        const impact = error.impact;
        const intensity = error.intensity || 0.8;

        return acc + (impact * intensity);
    }, 0);

    // Implement the formula for the reading score
    const zeroShift = Math.log(100) / Math.log(2);
    const errorPortion = -Math.pow(2, (-totalImpact / 8) + (zeroShift)) + 100;
    const totalScore = Math.round((100 - errorPortion));

    return totalScore;
}