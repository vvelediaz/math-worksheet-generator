const {fraction, multiply, subtract} = require('mathjs')
const mathsteps = require("mathsteps")
const algebra = require('algebra.js')

/*Basic Helper Functions*/
function getRandomNum(start, range){ // All inclusive
    return Math.floor( (Math.random() * (range+1 - start) ) + start);
}
function getRandomFraction(maxNum){ // Comment out fifth line if you don't want whole numbers
    let myFraction, numerator, denominator;
    do{
        numerator = getRandomNum(1,maxNum/5)
        denominator = getRandomNum(1,maxNum/5)
        myFraction = fraction(numerator,denominator)
        if(getRandomNum(1, 2) === 1) myFraction = multiply(myFraction, -1)
        if(((numerator/denominator) % 1) === 0) break
    }while(numerator >= denominator)
    return myFraction
}
function getRandomVariable(variables){
    return variables.charAt(getRandomNum(0,variables.length - 1))
}
function getRandomSign(){
    if(getRandomNum(0,1) === 1) return "+"
    else return "-"
}
/* EQUATION/EXPRESSION HELPER FUNCTIONS */ /*isSimple = one step*/
function generateLETwoStepNoFractions(maxNum, variable, isInequality, isSimple) {
    // Keep Generating Until All Numbers Are Below Or At Range - Two Step Equations
    do{
        let answer = getRandomNum(-maxNum, maxNum)
        if(answer === 0) continue
        let middleNumber = answer*getRandomNum(-maxNum, maxNum)
        if(middleNumber === 0) continue
        const addOrSubtractNumber = isSimple ?  0 : getRandomNum(-maxNum, maxNum)
        if(addOrSubtractNumber > maxNum) continue

        //Check if numbers don't exceed maximum number used in range
        if(Math.abs(middleNumber + addOrSubtractNumber) > maxNum)
            continue
        // Makes sure divideBy numbers are not too big
        if(Math.abs(middleNumber/answer) > Math.floor(maxNum/5))
            continue

        const sign = (addOrSubtractNumber > 0) ? `+` : `-`
        let equality = `=`
        if(isInequality){
            switch (getRandomNum(1,4)){
                case 1:
                    equality = `>`
                    break;
                case 2:
                    equality = `<`
                    break;
                case 3:
                    equality = `>=`
                    break;
                case 4:
                    equality = `<=`
            }
        }

        let equationString
        if((middleNumber/answer) === 1){
            equationString = isSimple ? `${variable} ${equality} ${middleNumber+addOrSubtractNumber}`
                :  `${variable} ${sign} ${Math.abs(addOrSubtractNumber)} ${equality} ${middleNumber+addOrSubtractNumber}`
        }
        else if((middleNumber/answer) === -1){
            equationString = isSimple ? `-${variable} ${equality} ${middleNumber+addOrSubtractNumber}`
                :  `-${variable} ${sign} ${Math.abs(addOrSubtractNumber)} ${equality} ${middleNumber+addOrSubtractNumber}`
        }
        else{
            equationString = isSimple ? `${middleNumber/answer}${variable} ${equality} ${middleNumber+addOrSubtractNumber}`
                :  `${middleNumber/answer}${variable} ${sign} ${Math.abs(addOrSubtractNumber)} ${equality} ${middleNumber+addOrSubtractNumber}`
        }


        if(isInequality && ((middleNumber/answer) < 0)){
            switch (equality){
                case `>`:
                    equality = `<`
                    break
                case `<`:
                    equality = `>`
                    break
                case `>=`:
                    equality = `<=`
                    break
                case `<=`:
                    equality = `>=`
            }
        }

        return ({
            equation: equationString,
            answer: `${variable} ${equality} ${answer}`,
            variable: variable
        })

    }while(true)
}
function generateLETwoStepWithFractions(maxNum, variable, isInequality, isSimple){ // Use do while when done
    do{
        const answer = getRandomFraction(maxNum)
        const middleNumber = multiply(answer, getRandomFraction(maxNum))
        if(middleNumber.d > maxNum/5) continue // Prevents messy/big numbers REPLACE W/ continue
        const addOrSubtractNumber = isSimple ? 0 : getRandomFraction(maxNum)
        const divideByNumber = fraction((answer.d*middleNumber.n*answer.s*middleNumber.s),(answer.n*middleNumber.d))
        const thirdNumber = fraction(subtract(middleNumber, addOrSubtractNumber)) // thirdNum + addOrSubtractNum = middleNum
        if(thirdNumber.d > maxNum/5) continue // Prevent big denominators
        if(thirdNumber.n > maxNum) continue // Prevent numerators over maximum range
        if(thirdNumber.n >= thirdNumber.d) continue

        const addOrSubtractNumberString = (addOrSubtractNumber.d === 1) ? `${addOrSubtractNumber.n}` : `${addOrSubtractNumber.n}/${addOrSubtractNumber.d}` // Sign shown in equation
        const thirdNumString = (thirdNumber.d === 1) ? `${thirdNumber.n*thirdNumber.s}` : `${thirdNumber.n*thirdNumber.s}/${thirdNumber.d}`
        let divideByNumberString
        if(divideByNumber.d === 1 && divideByNumber.n === 1){
            if(divideByNumber.s === -1)
                divideByNumberString = "-"
            else
                divideByNumberString = ""
        }
        else{
            divideByNumberString = (divideByNumber.d === 1) ? `${divideByNumber.n*divideByNumber.s}` : `(${divideByNumber.n*divideByNumber.s}/${divideByNumber.d})`
        }

        const sign = (addOrSubtractNumber.s === 1) ? `-` : `+` // You want to add to thirdNum to get middleNum
        let equality = `=`
        if(isInequality){
            switch (getRandomNum(1,4)){
                case 1:
                    equality = `>`
                    break;
                case 2:
                    equality = `<`
                    break;
                case 3:
                    equality = `>=`
                    break;
                case 4:
                    equality = `<=`
            }
        }
        const equationString = isSimple ?
            `${divideByNumberString}${variable} ${equality} ${thirdNumString}` : `${divideByNumberString}${variable} ${sign} ${addOrSubtractNumberString} ${equality} ${thirdNumString}`

        if(isInequality && ((divideByNumber.s) === -1)){
            switch(equality){
                case `>`:
                    equality = `<`
                    break
                case `<`:
                    equality = `>`
                    break
                case `>=`:
                    equality = `<=`
                    break
                case `<=`:
                    equality = `>=`
            }
        }

        return ({
            equation: equationString,
            answer: (answer.d === 1) ? `${variable} ${equality} ${answer.n*answer.s}` : `${variable} ${equality} ${answer.n*answer.s}/${answer.d}`,
            variable: variable
        })

    }while(true)
}
function generateOneVariableExpression(maxNum, variable, isFraction, randomizeOrder){
    let equation, term, left, right
    if(isFraction){
        do{
            equation = generateLETwoStepWithFractions(maxNum, variable, false, true).equation
            term = equation.split("=")
            left = term[0].trim().replace("(", "").replace(")","").replace("-","").replace("x","")
            right = term[1].trim().replace("(", "").replace(")","").replace("-","")

        }while(right === left)
    }else equation = generateLETwoStepNoFractions(maxNum, variable, false, true).equation

    const terms = equation.split("=") // "-4x " & " -7"
    let isOnRight = false
    let constant = terms[1].trim()
    let xTerm = terms[0].trim().replace(variable, "") // "-4"
    if(xTerm === '') xTerm = '1'
    if(xTerm === '-') xTerm = '-1'
    let xTermString = xTerm, constantString = constant

    if(randomizeOrder){
        if(getRandomNum(0,1) === 1){
            isOnRight = true
        }
    }
    // 1/true is +
    let sign = getRandomNum(0,1)
    sign = sign === 1;

    // If right term is negative make it + and switch sign Ex: 3 - -8x -> 3 + 8x
    if(isOnRight){
        if(xTerm.charAt(0) === '-'){
            sign = !sign
            xTerm = xTerm.replace('-', '')
            xTermString = xTerm
        }
    }else{
        if(constant.charAt(0) === '-'){
            sign = !sign
            constant = constant.replace('-', '')
            constantString = constant
        }
    }

    // Make xTerm & constant negative if - sign Ex: 2 - 3x -> XTerm: -3
    if(!sign && isOnRight)
        xTerm = `-${xTerm}`
    if(!sign && !isOnRight)
        constant = `-${constant}`

    if(xTerm === '1' || xTerm === '-1')
        xTermString = xTermString.replace('1', '')

    sign = sign ? '+':'-'

    return {
        expression: isOnRight ? `${constantString} ${sign} ${xTermString}${variable}`: `${xTermString}${variable} ${sign} ${constantString}`,
        xTerm: xTerm,
        constant: constant
    }
}
function generateLEMultiStepOneVariable(maxNum, variable, isFraction){
    let leftSide, rightSide
    do{
        leftSide = generateOneVariableExpression(maxNum, variable, isFraction, true)
        rightSide = generateOneVariableExpression(maxNum, variable, isFraction, true)
    }while(leftSide.xTerm === rightSide.xTerm)

    return{
        equation: `${leftSide.expression} = ${rightSide.expression}`,
        leftSide: `${leftSide.expression}`,
        rightSide: `${rightSide.expression}`
    }
}
function generateTwoVariableExpression(maxNum, variable1, variable2, isFraction){
    let firstVar = variable1, secondVar = variable2
    if(getRandomNum(0,1) === 0){
        firstVar = variable2
        secondVar = variable1
    }
    const expression = generateLEMultiStepOneVariable(maxNum, firstVar, isFraction)
    const expressionString = expression.equation.replace(firstVar, secondVar)
    const sides = expressionString.split("=")
    return {
        expression: expressionString,
        leftSide: sides[0].trim(),
        rightSide: sides[1].trim()
    }
}
function generateSOELinearNoFractions(maxNum, variable1, variable2){
    let problem1, problem2, eq1, eq2, isolated1, isolated2, xSolution, ySolution, expressionShown1, expressionShown2
    do{
        problem1 = generateTwoVariableExpression(maxNum, "x", "y", false)
        problem2 = generateTwoVariableExpression(maxNum, "x", "y", false)

        eq1 = new algebra.Equation(algebra.parse(problem1.leftSide), algebra.parse(problem1.rightSide))
        eq2 = new algebra.Equation(algebra.parse(problem2.leftSide), algebra.parse(problem2.rightSide))

        isolated1 = "y = " + eq1.solveFor("y").toString()
        isolated2 = "y = " + eq2.solveFor("y").toString()

        const combinedEq = new algebra.Equation(algebra.parse(eq1.solveFor("y").toString()), algebra.parse(eq2.solveFor("y").toString()))

        // try catch for no solutions
        try{
            xSolution = combinedEq.solveFor("x").toString()
            const solveForYEq = new algebra.Equation(algebra.parse("y"), algebra.parse(eq2.solveFor("y").toString().replace("x", `(${xSolution})`)))
            ySolution = solveForYEq.solveFor("y").toString()
        }catch (error){
            xSolution = "error"
        }

        // (xSolution === "error") || (!isFraction && (((isolated1.includes("/") || isolated2.includes("/")) || (xSolution.includes("/") || ySolution.includes("/"))) || (xSolution > maxNum || ySolution > maxNum)))
    }while((xSolution === "error") || (isolated1.includes("/") || isolated2.includes("/") || xSolution.includes("/") || ySolution.includes("/") || Math.abs(xSolution) > maxNum || Math.abs(ySolution) > maxNum))

    if(getRandomNum(0,1) === 1){
        expressionShown1 = isolated1
    }else expressionShown1 = problem1.expression
    if(getRandomNum(0,1) === 1){
        expressionShown2 = isolated2
    }else expressionShown2 = problem2.expression

    return{
        equation1: expressionShown1.replaceAll("x", variable1).replaceAll("y", variable2),
        equation2: expressionShown2.replaceAll("x", variable1).replaceAll("y", variable2),
        xSolution: xSolution,
        ySolution: ySolution
    }
}
function generateSOELinearWithFractions(maxNum, variable1, variable2){
    let problem1, problem2, eq1, eq2, isolated1, isolated2, xSolution, ySolution, expressionShown1, expressionShown2
    do{
        problem1 = generateTwoVariableExpression(maxNum, "x", "y", true)
        problem2 = generateTwoVariableExpression(maxNum, "x", "y", true)

        eq1 = new algebra.Equation(algebra.parse(problem1.leftSide), algebra.parse(problem1.rightSide))
        eq2 = new algebra.Equation(algebra.parse(problem2.leftSide), algebra.parse(problem2.rightSide))

        isolated1 = "y = " + eq1.solveFor("y").toString()
        isolated2 = "y = " + eq2.solveFor("y").toString()

        const combinedEq = new algebra.Equation(algebra.parse(eq1.solveFor("y").toString()), algebra.parse(eq2.solveFor("y").toString()))

        // try catch for no solutions
        try{
            xSolution = combinedEq.solveFor("x").toString()
            const solveForYEq = new algebra.Equation(algebra.parse("y"), algebra.parse(eq2.solveFor("y").toString().replace("x", `(${xSolution})`)))
            ySolution = solveForYEq.solveFor("y").toString()
        }catch (error){
            xSolution = "error"
        }


    }while(xSolution === "error" || fraction(xSolution).n > fraction(xSolution).d || fraction(ySolution).n > fraction(ySolution).d || fraction(xSolution).n > maxNum/5 || fraction(xSolution).d > maxNum/5 || fraction(ySolution).n > maxNum/5 || fraction(ySolution).d > maxNum/5)

    if(getRandomNum(0,1) === 1){
        expressionShown1 = isolated1
    }else expressionShown1 = problem1.expression
    if(getRandomNum(0,1) === 1){
        expressionShown2 = isolated2
    }else expressionShown2 = problem2.expression

    return{
        equation1: expressionShown1.replaceAll("x", variable1).replaceAll("y", variable2),
        equation2: expressionShown2.replaceAll("x", variable1).replaceAll("y", variable2),
        xSolution: xSolution,
        ySolution: ySolution
    }
}
function generateScientificNotationExpression(maxExponent){
    const decimal = getRandomNum(1, 999)
    let exponent = getRandomNum(1, maxExponent)
    if(getRandomNum(0,1) === 0)
        exponent = exponent*-1
    let decimalString

    if(decimal < 100){
        if(decimal < 10)
            decimalString = `0.0${decimal}`
        else
            decimalString = `0.${decimal}`
    }
    else decimalString = `${decimal/100}`

    return{
        equation: `${decimalString} X 10^${exponent}`
    }
}
function generateExponentialExpression(variable, minExponent, maxExponent, includeZero){
    let exponent
    if(includeZero) exponent = getRandomNum(minExponent, maxExponent)
    else{
        do{
            exponent = getRandomNum(minExponent, maxExponent)
        }while(exponent === 0)
    }
    if(exponent === 1) return `${variable}`
    if(exponent === 0) return `1`
    return `${variable}^${exponent}`
}
function generateQuadraticExpression(maxNum, variable){
    let firstNum, secondNum, equation, answer, sign, sign2, addedSign, multipliedSign
    do{
        firstNum = getRandomNum(-10, 10)
        secondNum = getRandomNum(-10, 10)
    }while(Math.abs(firstNum*secondNum) > maxNum || (firstNum === 0 && secondNum === 0))

    if(firstNum === 0){
        if(secondNum > 0) sign = "+"
        else sign = "-"
        equation = `${variable}^2 ${sign} ${Math.abs(secondNum)}${variable}`
        answer = `${variable}(${variable} ${sign} ${Math.abs(secondNum)})`
    }
    else if(secondNum === 0){
        if(firstNum > 0) sign = "+"
        else sign = "-"
        equation = `${variable}^2 ${sign} ${Math.abs(firstNum)}${variable}`
        answer = `${variable}(${variable} ${sign} ${Math.abs(firstNum)})`
    }
    else {
        if (firstNum > 0) sign = "+"
        else sign = "-"
        if (secondNum > 0) sign2 = "+"
        else sign2 = "-"
        if (secondNum + firstNum > 0) addedSign = "+"
        else addedSign = "-"
        if (secondNum * firstNum > 0) multipliedSign = "+"
        else multipliedSign = "-"

        equation = `${variable}^2 ${addedSign} ${Math.abs(firstNum + secondNum)}${variable} ${multipliedSign} ${Math.abs(firstNum * secondNum)}`
        answer = `(${variable} ${sign} ${Math.abs(firstNum)})(${variable} ${sign2} ${Math.abs(secondNum)})`
    }

    return{
        equation: equation,
        answer: answer
    }
}
function generateQuadraticExpressionLeadingCoefficient(maxNum, variable){
    let a, b, c, d, sign, sign2, bSign, dSign
    do{
        a = getRandomNum(-10, 10)
        b = getRandomNum(-10, 10)
        c = getRandomNum(-10, 10)
        d = getRandomNum(-10, 10)
    }while(a <= 0 || b === 0 || c <= 0 || d === 0 || Math.abs((a*c)*(b*d)) > maxNum || a*c < 0 || Math.abs((b*c)+(a*d)) <= 1)

    if((b*c)+(a*d) > 0) sign = "+"
    else sign = "-"
    if(b*d > 0) sign2 = "+"
    else sign2 = "-"
    if(b > 0) bSign = "+"
    else bSign = "-"
    if(d > 0) dSign = "+"
    else dSign = "-"

    return{
        equation: `${a*c}${variable}^2 ${sign} ${Math.abs((b*c)+(a*d))}${variable} ${sign2} ${Math.abs(b*d)}`,
        answer: `(${a}${variable} ${bSign} ${Math.abs(b)})(${c}${variable} ${dSign} ${Math.abs(d)})`,
        a: a*c,
        b: (b*c)+(a*d),
        c: b*d
    }
}
function simplifySquareRoot(num){
    let outsideRoot = 1
    let insideRoot = num
    let d = 2
    while((d*d) <= insideRoot){
        if(insideRoot % (d*d) === 0){
            insideRoot = insideRoot/(d*d)
            outsideRoot = outsideRoot*d
        }else{
            d = d+1
        }
    }
    if(insideRoot === 1)
        return `${outsideRoot}`
    else
        return `${outsideRoot}\u221A${insideRoot}`
}
function simplifyTwoVariableSquareRoot(expression){
    // needs x and y
    const terms = expression.split("*")
    let answer = `${simplifySquareRoot(terms[0])}`

    let firstExponent = terms[1].split("^")[1]
    if(firstExponent % 2 === 0){
        if(answer.includes(`\u221A`)){
            answer = `${answer.substring(0,answer.indexOf(`\u221A`))}*x^${firstExponent/2}${answer.substring(answer.indexOf(`\u221A`))}`
        }else{
            answer = `${answer}*x^${firstExponent/2}`
        }
    }else{
        if(answer.includes(`\u221A`)){
            answer = `${answer}${terms[1]}`
        }else{
            answer = `${answer}\u221A${terms[1]}`
        }
    }
    let secondExponent = terms[2].split("^")[1]
    if(secondExponent % 2 === 0){
        if(answer.includes(`\u221A`)){
            answer = `${answer.substring(0,answer.indexOf(`\u221A`))}*y^${secondExponent/2}${answer.substring(answer.indexOf(`\u221A`))}`
        }else{
            answer = `${answer}*y^${secondExponent/2}`
        }
    }else{
        if(answer.includes(`\u221A`)){
            answer = `${answer}*${terms[2]}`
        }else{
            answer = `${answer}\u221A${terms[2]}`
        }
    }
    return answer
}

//function generateQuadraticEquationNoFractions(maxNum, variable, useLeadingCoefficient){ }

/* EXPORT FUNCTIONS */
function generateLinearEquation(values, isInequality, isFraction, isSimple){
    const variable = (values.useMultipleVariableNamesLE ? getRandomVariable("xyz") : "x")
    return isFraction ? generateLETwoStepWithFractions(values.maximumNumberRangeLE, variable, isInequality, isSimple)
        : generateLETwoStepNoFractions(values.maximumNumberRangeLE, variable, isInequality, isSimple)
}
const Graphs = {
    generatePlotEachPoint: function(){
        const x1 =  getRandomNum(-10,10), x2 =  getRandomNum(-10,10), x3 =  getRandomNum(-10,10),
            y1 =  getRandomNum(-10,10), y2 =  getRandomNum(-10,10), y3 =  getRandomNum(-10,10)
        return {
            equation: `(${x1}, ${y1}), (${x2}, ${y2}), (${x3}, ${y3})`
        }
    },
    generateFindOrderedPairs: function(maxNum, isFraction){
        let problem, isolatedExpression, isolatedExpressionY, expressionShown, ySolution, ySolutionString, xSolution
        const smallNumLimit = maxNum/5
        // Generate Problem And Solutions
        if(!isFraction){ // Is not fraction
            do{
                // generate problem, feed to algebra.js, and generate a "y = ..." form
                problem = generateTwoVariableExpression(maxNum, "x", "y", isFraction)
                const eq = new algebra.Equation(algebra.parse(problem.leftSide), algebra.parse(problem.rightSide))
                isolatedExpression = "x = " + eq.solveFor("x").toString()
                isolatedExpressionY = "y = " + eq.solveFor("y").toString()

                // Generate Solutions
                xSolution = getRandomNum(-(smallNumLimit),(smallNumLimit))
                const steps = mathsteps.solveEquation(isolatedExpression.replace("x", xSolution))
                const mathStepsAnswer = steps[steps.length-1].newEquation.ascii()
                ySolution = fraction(mathStepsAnswer.split("=")[1].trim())
                ySolutionString = ySolution
                // do while ySolution is too big, solution or problem has fractions/decimal
            }while(((ySolution.n > maxNum/3) || (isolatedExpressionY.includes("/"))) || (isolatedExpression.includes("/") || ySolution.toString().includes(".")))
        }else{
            // generate problem, feed to algebra.js, and generate a "y = ..." form
            do{
                // generate problem, feed to algebra.js, and generate a "y = ..." form
                problem = generateTwoVariableExpression(maxNum, "x", "y", isFraction)
                const eq = new algebra.Equation(algebra.parse(problem.leftSide), algebra.parse(problem.rightSide))
                isolatedExpression = "x = " + eq.solveFor("x").toString()

                // Generate Solutions
                xSolution = getRandomNum(-(smallNumLimit),(smallNumLimit))
                const steps = mathsteps.solveEquation(isolatedExpression.replace("x", xSolution))
                const mathStepsAnswer = steps[steps.length-1].newEquation.ascii()
                ySolution = fraction(mathStepsAnswer.split("=")[1].trim())
                ySolutionString = (ySolution.d === 1) ? `${ySolution.s*ySolution.n}` :`${ySolution.s*ySolution.n}/${ySolution.d}`
            }while(ySolution.n > ySolution.d || ySolution.d > smallNumLimit)
        }

        // Randomize problem format
        if(getRandomNum(0,1) === 1){
            const eq = new algebra.Equation(algebra.parse(problem.leftSide), algebra.parse(problem.rightSide))
            if(getRandomNum(0,1) === 1) expressionShown = "x = " + eq.solveFor("x").toString()
            else expressionShown = "y = " + eq.solveFor("y").toString()
        }else expressionShown = problem.expression

        let choicesString
        switch(getRandomNum(1,3)){
            case 1:
                choicesString = `a. (${xSolution}, ${ySolutionString})\nb. (${getRandomNum(-(smallNumLimit), smallNumLimit)}, ${getRandomNum(-(smallNumLimit), smallNumLimit)})\nc. (${getRandomNum(-(smallNumLimit), smallNumLimit)}, ${getRandomNum(-(smallNumLimit), smallNumLimit)})`
                break
            case 2:
                choicesString = `a. (${getRandomNum(-(smallNumLimit), smallNumLimit)}, ${getRandomNum(-(smallNumLimit), smallNumLimit)})\nb. (${xSolution}, ${ySolutionString})\nc. (${getRandomNum(-(smallNumLimit), smallNumLimit)}, ${getRandomNum(-(smallNumLimit), smallNumLimit)})`
                break
            case 3:
                choicesString = `a. (${getRandomNum(-(smallNumLimit), smallNumLimit)}, ${getRandomNum(-(smallNumLimit), smallNumLimit)})\nb. (${getRandomNum(-(smallNumLimit), smallNumLimit)}, ${getRandomNum(-(smallNumLimit), smallNumLimit)})\nc. (${xSolution}, ${ySolutionString})`
        }

        return{
            equation: expressionShown,
            choices: choicesString,
            xSolution: xSolution,
            ySolution: ySolutionString
        }
    }, // LAGS
    generateGraphEquation: function(isFraction){
        let expressionShown
        let problem = generateTwoVariableExpression(10, "x", "y", isFraction)
        const eq = new algebra.Equation(algebra.parse(problem.leftSide), algebra.parse(problem.rightSide))

        if(getRandomNum(0,1) === 1){
            if(getRandomNum(0,1) === 1) expressionShown = "x = " + eq.solveFor("x").toString()
            else expressionShown = "y = " + eq.solveFor("y").toString()
        }else expressionShown = problem.expression

        return{
            equation: expressionShown
        }
    }
}
const SystemOfLinearEquations = {
    generateSolveEquations : function(maxNum, isFraction, useMultipleVariableNames){
        let var1, var2
        if(useMultipleVariableNames){
            var1 = getRandomVariable("abcxyz")
            do{
                if("abc".includes(var1))
                    var2 = getRandomVariable("abc")
                else
                    var2 = getRandomVariable("xyz")
            }while(var1 === var2)
        }else{
            var1 = "x"
            var2 = "y"
        }
        if(var1 === "y"){
            var1 = var2
            var2 = "y"
        }
        return isFraction ? generateSOELinearWithFractions(maxNum, var1, var2) : generateSOELinearNoFractions(maxNum, var1, var2)
    },
    generateSolveInequalities : function(maxNum, isFraction){
        let problem, firstSign, secondSign
        do{
            if(isFraction){
                problem = generateSOELinearWithFractions(maxNum, "x", "y")
            }else{
                problem = generateSOELinearNoFractions(maxNum, "x", "y")
            }
        }while(Math.abs(problem.xSolution) > 10 || Math.abs(problem.ySolution) > 10)
        switch(getRandomNum(1, 4)){
            case 1:
                firstSign = "<"
                break;
            case 2:
                firstSign = ">"
                break;
            case 3:
                firstSign = ">="
                break;
            case 4:
                firstSign = "<="
        }
        switch(getRandomNum(1, 4)){
            case 1:
                secondSign = "<"
                break;
            case 2:
                secondSign = ">"
                break;
            case 3:
                secondSign = ">="
                break;
            case 4:
                secondSign = "<="
        }

        return {
            ...problem,
            equation1: problem.equation1.replace("=", firstSign),
            equation2: problem.equation2.replace("=", secondSign)
        }
    },
    generateSolveEquationsGraphing: function(maxNum, isFraction){
        let problem
        do{
            if(isFraction){
                problem = generateSOELinearWithFractions(maxNum, "x", "y")
            }else{
                problem = generateSOELinearNoFractions(maxNum, "x", "y")
            }
        }while(Math.abs(problem.xSolution) > 10 || Math.abs(problem.ySolution) > 10)
        return problem
    }
}
const Polynomials = {
    generateConvertToDecimal: function(){
        let problem, answer

        do{
            problem = generateScientificNotationExpression(9)
            answer = problem.equation.split("X")[0].trim() * Math.pow(10, problem.equation.split("^")[1])
        }while(answer.toString().replaceAll("0","").replace(".", "") != problem.equation.split("X")[0].trim().replace(".",""))

        if(answer > 1) answer = answer.toLocaleString()

        return{
            equation: problem.equation,
            answer: answer
        }
    },
    generateSimplifyExpression: function(maxNum, useMultipleVariableNames){
        let var1, var2, equation, coefficient1, coefficient2, total
        if(useMultipleVariableNames){
            var1 = getRandomVariable("abcxyz")
            do{
                if("abc".includes(var1))
                    var2 = getRandomVariable("abc")
                else
                    var2 = getRandomVariable("xyz")
            }while(var1 === var2)
        }else{
            var1 = "x"
            var2 = "y"
        }
        if(var1 === "y"){
            var1 = var2
            var2 = "y"
        }
        do{
            coefficient1 = getRandomNum(2, maxNum)
            coefficient2 = getRandomNum(2, maxNum)
            total = coefficient2*coefficient1
        }while(total > maxNum)

        switch(getRandomNum(1,6)){
            case 0:
                equation = `(${coefficient1*coefficient2}${generateExponentialExpression(var1, 1,10, false)} * ${generateExponentialExpression(var2, 1,10, false)})/(${coefficient2}${generateExponentialExpression(var1, 1,10, false)} * ${generateExponentialExpression(var2, 1,10, false)})`
                break;
            case 1:
                equation = `(${coefficient1}${generateExponentialExpression(var1, 1, 9, false)} * ${generateExponentialExpression(var2, 1, 9, false)})^2`
                break;
            case 2:
                equation = `(${coefficient1}${var1} ${getRandomSign()} ${getRandomNum(1, 9)})^2`
                break;
            case 3:
                equation = `(${var1} ${getRandomSign()} ${getRandomNum(1, 9)})(${var1} ${getRandomSign()} ${getRandomNum(1, 9)})`
                break;
            case 4:
                // if(getRandomNum(0,1) === 1)
                //     equation = `${generateExponentialExpression(var1, -10, 10)} * ${generateExponentialExpression(var1, -10, 10)}`
                // else
                //     equation = `${generateExponentialExpression(var1, -10, 10)} / ${generateExponentialExpression(var1, -10, 10)}`
                // break;
                equation = `${generateExponentialExpression(var1, 1, 10, false)} * ${generateExponentialExpression(var1, 1, 10, false)}`
                break;
            case 5:
                if(coefficient1 > coefficient2)
                    equation = `${coefficient2}${var1}(${coefficient1}${var1}^2 ${getRandomSign()} ${getRandomNum(1, coefficient1)}${generateExponentialExpression(var1, 1,1, false)} ${getRandomSign()} ${getRandomNum(1, coefficient1)})`
                else
                    equation = `${coefficient1}${var1}(${coefficient2}${var1}^2 ${getRandomSign()} ${getRandomNum(1, coefficient2)}${generateExponentialExpression(var1, 1,1, false)} ${getRandomSign()} ${getRandomNum(1, coefficient2)})`
                break;
            case 6:
                if(coefficient1 > coefficient2)
                    equation = `(${var1} ${getRandomSign()} ${coefficient2})(${var1}^2 ${getRandomSign()} ${getRandomNum(1, coefficient1)}${generateExponentialExpression(var1, 1,1, false)} ${getRandomSign()} ${getRandomNum(1, coefficient1)})`
                else
                    equation = `(${var1} ${getRandomSign()} ${coefficient1})(${var1}^2 ${getRandomSign()} ${getRandomNum(1, coefficient2)}${generateExponentialExpression(var1, 1,1, false)} ${getRandomSign()} ${getRandomNum(1, coefficient2)})`
                break;
        }
        let expr

        if(equation.includes("/"))
            expr = algebra.parse(equation.split("/")[0].trim()).divide(equation.split("/")[1].trim())
        else expr = algebra.parse(equation)

        return{
            equation: equation,
            answer: expr.simplify().toString()
        }
    }
}
const Factoring = {
    generateFindGCF: function(maxNum, useMultipleVariableNames){
        let commonFactor, coefficient, exponent, firstNum, secondNum, simplifiedTerm, equation
        do{
            coefficient = getRandomNum(1,10)
            exponent = generateExponentialExpression("x", 0,5, true)
            commonFactor = algebra.parse(`${coefficient}`).multiply(algebra.parse(exponent))
        }while(commonFactor.toString() === "1")

        do{
            firstNum = getRandomNum(1,10)
            secondNum = getRandomNum(1,10)
        }while(firstNum*coefficient > maxNum || secondNum*coefficient > maxNum)
        if(firstNum === 1)
            simplifiedTerm = `x ${getRandomSign()} ${secondNum}`
        else
            simplifiedTerm = `${firstNum}x ${getRandomSign()} ${secondNum}`
        equation = algebra.parse(`${commonFactor.toString()}(${simplifiedTerm})`)

        return{
            equation: useMultipleVariableNames ? equation.toString().replaceAll("x", getRandomVariable("xyzabc")) : equation.toString(),
            answer: `${commonFactor.toLocaleString()}(${simplifiedTerm})`
        }
    },
    generateFactorExpression: function(maxNum, useMultipleVariableNames){
        if(getRandomNum(0,1) === 1)
            return generateQuadraticExpression(maxNum, useMultipleVariableNames ? getRandomVariable("abcxyz") : "x")
        else return generateQuadraticExpressionLeadingCoefficient(maxNum, useMultipleVariableNames ? getRandomVariable("abcxyz") : "x")
    },
    generateSolveEquation: function(maxNum, useMultipleVariableNames){
        let problem, answer, equation

        do{
            if(getRandomNum(0,1) === 1)
                problem = generateQuadraticExpression(maxNum,"x")
            else problem = generateQuadraticExpressionLeadingCoefficient(maxNum,"x")
            equation = new algebra.Equation(algebra.parse(problem.equation), algebra.parse("0"))
            answer = equation.solveFor("x").toString()
        }while(answer.includes("/"))

        return{
            equation: useMultipleVariableNames ? equation.toString().replaceAll("x", getRandomVariable("abcxyz")) : equation.toString(),
            answer: answer
        }
    }
}
const RationalExpressions = {
    generateSimpleExpression: function(maxNum, useMultipleVariableNames){
        let lowerExpression, cancelExpression, distributedTerm
        do{
            lowerExpression = generateOneVariableExpression(maxNum,"x", false, false)
            cancelExpression = generateOneVariableExpression(maxNum,"x", false, false)
            distributedTerm = getRandomNum(1, maxNum)
        }while(lowerExpression.xTerm != 1 || cancelExpression.xTerm != 1 || Math.abs(lowerExpression.constant*cancelExpression.constant) > maxNum || Math.abs(distributedTerm*cancelExpression.constant) > maxNum)

        let top = algebra.parse(`${distributedTerm}(${cancelExpression.expression})`)
        let bottom = algebra.parse(`(${lowerExpression.expression})(${cancelExpression.expression})`)
        let expression = `${top}/${bottom}`
        let answer = `${distributedTerm}/${lowerExpression.expression}`
        if(useMultipleVariableNames){
            let variable = getRandomVariable("abcxyz")
            expression = expression.replaceAll("x", variable)
            answer = answer.replaceAll("x", variable)
        }

        return{
            equation: expression,
            answer: answer
        }
    },
    generateComplexExpression: function(maxNum, useMultipleVariableNames){
        let lowerExpressionAnswer, upperExpressionAnswer, lowerExpressionCoefficient, lastNumCancel, variableCancel, expressionCancel
        do{
            upperExpressionAnswer = generateOneVariableExpression(7,"x", false, false) // (x + 3)
            lowerExpressionCoefficient = getRandomNum(1,7) // 3
            lastNumCancel = getRandomNum(2,7) // 4
            lowerExpressionAnswer = `${lowerExpressionCoefficient}x` // 3x
            variableCancel = generateExponentialExpression("x", 1, 3, false) // x
            expressionCancel = generateOneVariableExpression(7,"x", false, false) // (x + 2)

            // console.log(`${lowerExpressionCoefficient}*${lastNumCancel}`)
            // console.log(`${upperExpressionAnswer.constant}*${expressionCancel.constant}`)
            // console.log()
        }while(upperExpressionAnswer.xTerm != 1 || expressionCancel.xTerm != 1|| Math.abs(lowerExpressionCoefficient*lastNumCancel) > maxNum || Math.abs(upperExpressionAnswer.constant*expressionCancel.constant) > maxNum)

        let firstNumerator = algebra.parse(`${lastNumCancel} * ${variableCancel}`)
        let firstDenominator = algebra.parse(expressionCancel.expression)
        let secondNumerator = algebra.parse(`(${upperExpressionAnswer.expression}) * (${expressionCancel.expression})`)
        let secondDenominator = algebra.parse(`(${lowerExpressionAnswer}) * ${lastNumCancel} * ${variableCancel}`)

        let equation = `(${firstNumerator} / ${firstDenominator})*(${secondNumerator} / ${secondDenominator})`
        let answer = `${upperExpressionAnswer.expression} / ${lowerExpressionAnswer}`
        if(useMultipleVariableNames){
            let variable = getRandomVariable("xyzabc")
            equation = equation.replaceAll("x", variable)
            answer = answer.replaceAll("x", variable)
        }

        return{
            equation: equation,
            answer: answer
        }
    }
}
const RootsAndRadicals = {
    generateSimplifyRadical: function(maxNum, useMultipleVariableNames){ // sqrt = \u221A
        let firstIsPerfect = false, secondIsPerfect = false, thirdIsPerfect = false
        let equation = `\u221A`
        let constant, firstExponentialExpression, secondExponentialExpression
        do{
            if(getRandomNum(0,1) === 1) firstIsPerfect = true
            if(getRandomNum(0,1) === 1) secondIsPerfect = true
            if(getRandomNum(0,1) === 1) thirdIsPerfect = true
        }while(!firstIsPerfect && !secondIsPerfect && !thirdIsPerfect)

        if(firstIsPerfect){
            do{
                constant = getRandomNum(2, maxNum)
            }while(constant*constant > maxNum)
            equation = `${equation}${constant*constant}`
        }else{
            do{
                constant = getRandomNum(2,maxNum)
            }while(constant > maxNum)
            equation = `${equation}${constant}`
        }
        if(secondIsPerfect){
            do{
                firstExponentialExpression = generateExponentialExpression("x", 2, 15)
            }while(firstExponentialExpression.split("^")[1]%2 != 0)
        }else{
            do{
                firstExponentialExpression = generateExponentialExpression("x", 2, 15)
            }while(firstExponentialExpression.split("^")[1]%2 == 0)
        }
        if(thirdIsPerfect){
            do{
                secondExponentialExpression = generateExponentialExpression("y", 2, 15)
            }while(secondExponentialExpression.split("^")[1]%2 != 0)
        }else{
            do{
                secondExponentialExpression = generateExponentialExpression("y", 2, 15)
            }while(secondExponentialExpression.split("^")[1]%2 == 0)
        }
        equation = `${equation}*${firstExponentialExpression}*${secondExponentialExpression}`
        let answer = simplifyTwoVariableSquareRoot(equation.replace(`\u221A`, ""))
        if(useMultipleVariableNames){
            let variable = getRandomVariable("abcxyz")
            let variable2 = getRandomVariable("abcxyz".replace(variable, ""))
            if(variable === "y"){
                equation = equation.replaceAll("x", variable2)
                answer = answer.replaceAll("x", variable2)
            }else{
                equation = equation.replaceAll("x", variable).replaceAll("y", variable2)
                answer = answer.replaceAll("x", variable).replaceAll("y", variable2)
            }
        }

        if(answer.includes(`\u221A`))
            answer = `${answer.substring(0, answer.indexOf(`\u221A`))}sqrt(${answer.substring(answer.indexOf(`\u221A`)+1)})`

        return{
            equation: `sqrt(${equation.substring(equation.indexOf(`\u221A`)+1)})`,
            answer: answer
        }
    },
    generateRationalizeDenominator: function(maxNum){
        let bottomNum, topNum, answer, equation
        do{
            bottomNum = simplifySquareRoot(getRandomNum(2, maxNum))
        }while(bottomNum.charAt(0) === "1" || !bottomNum.includes(`\u221A`))

        do{
            topNum = getRandomNum(1, 10)
        }while(topNum%bottomNum.charAt(0) == 0 || bottomNum.charAt(0)%topNum == 0)
        equation = `${topNum}/(${bottomNum.split(`\u221A`)[0]}*sqrt(${bottomNum.split(`\u221A`)[1]}))`

        let bottomFraction = algebra.parse(bottomNum.replace(`\u221A`, '*'))
        let frac = fraction(topNum, bottomFraction.toString())

        if(frac.n === 1)
            answer = `sqrt(${bottomNum.substring(bottomNum.indexOf(`\u221A`)+1)})/${frac.d}`
        else
            answer = `(${frac.n}*sqrt(${bottomNum.substring(bottomNum.indexOf(`\u221A`)+1)}))/${frac.d}`

        return{
            equation: equation,
            answer: answer
        }
    }
}
const QuadraticEquations = {
    generateSolveEquation: function(maxNum, useMultipleVariableNames){
        return Factoring.generateSolveEquation(maxNum, useMultipleVariableNames)
    },
    generateGraphTheParabola: function(maxNum){
        return generateQuadraticExpressionLeadingCoefficient(maxNum, "x")
    },
    generateFindNumberSolutions: function(maxNum){
        let problem = generateQuadraticExpressionLeadingCoefficient(maxNum, "x")
        let answer
        let discriminant = (problem.b*problem.b)-(4*problem.a*problem.c)
        if(discriminant > 0)
            answer = 2
        else if(discriminant < 0)
            answer = 0
        else
            answer = 1

        return{
            equation: problem.equation,
            answer: answer
        }
    }
}

const MathProblems = {
    generateLinearEquation,
    generateLEMultiStepOneVariable, // For Tests
    Graphs,
    SystemOfLinearEquations,
    Polynomials,
    Factoring,
    RationalExpressions,
    RootsAndRadicals,
    QuadraticEquations
}

module.exports = MathProblems