const mathsteps = require("mathsteps")
const MathProblems = require('./MathProblems')

const values = {
    useFractionsLE: false,
    useMultipleVariableNamesLE: false,
    maximumNumberRangeLE: 50,
    solveForXRangeLE: 10,
    graphSimpleInequalitiesRangeLE: 0,
    solveGraphSimpleInequalitiesRangeLE: 0
}

test('Solve Random Linear Equation Without Fractions', () => {
    for(let i = 0; i < values.solveForXRangeLE; i=i+1) {
        const problem = MathProblems.generateLinearEquation(values, false, false)
        const answer = `${problem.answer}`
        const steps = mathsteps.solveEquation(problem.equation)
        const mathStepsAnswer = steps[steps.length-1].newEquation.ascii()
        console.log(problem.equation)
        expect(mathStepsAnswer).toBe(answer)
    }
});

test('Solve Random Linear Equation With Fractions', () => {
    for(let i = 0; i < values.solveForXRangeLE; i=i+1) {
        const problem = MathProblems.generateLinearEquation(values, false, true)
        const answer = `${problem.answer}`
        const steps = mathsteps.solveEquation(problem.equation)
        const mathStepsAnswer = steps[steps.length-1].newEquation.ascii()
        console.log(`${answer} -- ${mathStepsAnswer}`)
        expect(mathStepsAnswer).toBe(answer)
    }
});