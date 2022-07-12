import React, {useState} from "react";

export default function ElementaryAlgebraAccordion(props){
    // Every Accordion Item(topic) has a checkbox that enables/disables it
    const [checkBoxData, setCheckBoxData] = useState({
        linearEquations: false,
        graphs: false,
        systemsOfLinearEquations: false,
        polynomials: false,
        factoring: false,
        rationalExpressionsAndEquations: false,
        rootsAndRadicals: false,
        quadraticEquations: false
    })
    /* returnCustomRangeEvent/returnCustomCheckBoxEvent - Returns a custom event sent by a range for manually invoking it when checkbox is unchecked
    *  setTopicValues - Sets all the values of a topic, usually resetting them to 0, and invokes range event
    *  Might add more for additional input types
    * */
    function returnCustomRangeEvent(rangeName, rangeValue){return {target: {name: rangeName, value: rangeValue, type:"range"}}}
    function returnCustomCheckBoxEvent(checkBoxName, isChecked) {return {target: {name: checkBoxName, checked: isChecked, type: "checkbox"}}}

    function setTopicToDefaultValues(topic){
        switch(topic) {
            case "linearEquations":
                const defaultTopicLE = {
                    ...props.pdfData,
                    useFractionsLE:  props.defaultValues.useFractionsLE,
                    useMultipleVariableNamesLE: props.defaultValues.useMultipleVariableNamesLE,
                    solveForXRangeLE: props.defaultValues.solveForXRangeLE,
                    maximumNumberRangeLE: props.defaultValues.maximumNumberRangeLE,
                    graphSimpleInequalitiesRangeLE: props.defaultValues.graphSimpleInequalitiesRangeLE,
                    solveGraphSimpleInequalitiesRangeLE: props.defaultValues.solveGraphSimpleInequalitiesRangeLE
                }
                props.resetTopic(defaultTopicLE)
                break;
            case "graphs":
                const defaultTopicGraphs = {
                    ...props.pdfData,
                    useFractionsGraphs:  props.defaultValues.useFractionsGraphs,
                    solveForXRangeGraphs: props.defaultValues.solveForXRangeGraphs,
                    maximumNumberRangeGraphs: props.defaultValues.maximumNumberRangeGraphs,
                    plotEachPointRangeGraphs: props.defaultValues.plotEachPointRangeGraphs,
                    orderedPairsSolutionsRangeGraphs: props.defaultValues.orderedPairsSolutionsRangeGraphs,
                    graphTheEquationRangeGraphs: props.defaultValues.graphTheEquationRangeGraphs
                }
                props.resetTopic(defaultTopicGraphs)
                break;
            case "systemsOfLinearEquations":
                const defaultTopicsSOLE = {
                    ...props.pdfData,
                    useFractionsSOLE: props.defaultValues.useFractionsSOLE,
                    useMultipleVariableNamesSOLE: props.defaultValues.useMultipleVariableNamesSOLE,
                    maximumNumberRangeSOLE: props.defaultValues.maximumNumberRangeSOLE,
                    solveSystemEquationsRangeSOLE: props.defaultValues.solveSystemEquationsRangeSOLE,
                    solveSystemInequalitiesRangeSOLE: props.defaultValues.solveSystemInequalitiesRangeSOLE,
                    solveEquationsByGraphingRangeSOLE: props.defaultValues.solveEquationsByGraphingRangeSOLE,
                }
                props.resetTopic(defaultTopicsSOLE)
                break;
            case "polynomials":
                const defaultTopicsPolynomials = {
                    ...props.pdfData,
                    useMultipleVariableNamesPolynomials: props.defaultValues.useMultipleVariableNamesPolynomials,
                    maximumNumberRangePolynomials: props.defaultValues.maximumNumberRangePolynomials,
                    convertToDecimalFormRangePolynomials: props.defaultValues.convertToDecimalFormRangePolynomials,
                    simplifyRangePolynomials: props.defaultValues.simplifyRangePolynomials,
                }
                props.resetTopic(defaultTopicsPolynomials)
                break;
            case "factoring":
                const defaultTopicsFactoring = {
                    ...props.pdfData,
                    useMultipleVariableNamesFactoring: props.defaultValues.useMultipleVariableNamesFactoring,
                    maximumNumberRangeFactoring: props.defaultValues.maximumNumberRangeFactoring,
                    findGcdRangeFactoring: props.defaultValues.findGcdRangeFactoring,
                    factorRangeFactoring: props.defaultValues.factorRangeFactoring,
                    solveByFactoringRangeFactoring: props.defaultValues.solveByFactoringRangeFactoring
                }
                props.resetTopic(defaultTopicsFactoring)
                break;
            case "rationalExpressionsAndEquations":
                const defaultTopicsREAE = {
                    ...props.pdfData,
                    useMultipleVariableNamesREAE: props.defaultValues.useMultipleVariableNamesREAE,
                    maximumNumberRangeREAE: props.defaultValues.maximumNumberRangeREAE,
                    simplifySimpleRangeREAE: props.defaultValues.simplifySimpleRangeREAE,
                    simplifyMultiRangeREAE: props.defaultValues.simplifyMultiRangeREAE,
                }
                props.resetTopic(defaultTopicsREAE)
                break;
            case "rootsAndRadicals":
                const defaultTopicsRAR = {
                    ...props.pdfData,
                    useMultipleVariableNamesRAR: props.defaultValues.useMultipleVariableNamesRAR,
                    maximumNumberRangeRAR: props.defaultValues.maximumNumberRangeRAR,
                    simplifyRangeRAR: props.defaultValues.simplifyRangeRAR,
                    rationalizeRangeRAR: props.defaultValues.rationalizeRangeRAR,
                    solveRangeRAR: props.defaultValues.solveRangeRAR,
                }
                props.resetTopic(defaultTopicsRAR)
                break;
            case "quadraticEquations":
                const defaultTopicsQE = {
                    ...props.pdfData,
                    useMultipleVariableNamesQE: props.defaultValues.useMultipleVariableNamesQE,
                    maximumNumberRangeQE: props.defaultValues.maximumNumberRangeQE,
                    solveRangeQE: props.defaultValues.solveRangeQE,
                    graphParabolaRangeQE: props.defaultValues.graphParabolaRangeQE,
                    useDiscriminantRangeQE: props.defaultValues.useDiscriminantRangeQE,
                }
                props.resetTopic(defaultTopicsQE)
                break;
            default:
        }
    }

    function handleEnablingCheckBoxEvent(event)
    {
        // Checks/Unchecks checkbox
        const {name, checked} = event.target
        setCheckBoxData(prevState => ({
            ...prevState,
            [name]: checked
        }))
        // If a checkBox is unchecked, corresponding topic is reset to default values and invokes event
        if(!checked){setTopicToDefaultValues(name)}
    }

    return(
        <div className="accordion" id="algebraAccordion">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingLinearEquationsInequalities">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseLinearEquationsInequalities" aria-expanded="false" aria-controls="collapseLinearEquationsInequalities">
                        Linear Equations and Inequalities
                    </button>
                </h2>
                <div id="collapseLinearEquationsInequalities" className="accordion-collapse collapse" aria-labelledby="headingLinearEquationsInequalities"
                     data-bs-parent="#algebraAccordion">
                    <div className="accordion-body">
                        {/*CheckBoxes*/}
                        <div>
                            <label style={{paddingBottom: "5px", fontWeight: "bold", marginLeft: "-9px", textDecoration: "underline"}}>Options: </label>
                        </div>
                        <div className="form-check form-check-inline" >
                            <label className="form-check-label" htmlFor="linearEquations">Enable</label>
                            <input className="form-check-input" type="checkbox" id="linearEquations"
                                   name="linearEquations" onChange={handleEnablingCheckBoxEvent} checked={checkBoxData.linearEquations}/>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="useFractionsLE"
                                   name="useFractionsLE" disabled={!checkBoxData.linearEquations}
                                   onChange={props.handleChange} checked={props.pdfData.useFractionsLE}/>
                            <label className="form-check-label" htmlFor="useFractionsLE">Use Fractions</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="useMultipleVariableNamesLE"
                                   name="useMultipleVariableNamesLE" disabled={!checkBoxData.linearEquations}
                                   onChange={props.handleChange} checked={props.pdfData.useMultipleVariableNamesLE}/>
                            <label className="form-check-label" htmlFor="useMultipleVariableNamesLE">Use Multiple Variable Letters</label>
                        </div>
                        {/*Ranges*/}
                        <div className="grid" style={{marginTop: "5px"}}>

                            <div className="row form-row">
                                <label htmlFor="maximumNumberRangeLE" className="form-label col-3 left-label">Largest Number To Be Used:</label>
                                <input type="range" className="form-range col min-max-range" name="maximumNumberRangeLE"
                                       min="10" max="50" value={props.pdfData.maximumNumberRangeLE}
                                       onChange={props.handleChange} disabled={!checkBoxData.linearEquations} />
                                <label className="col-1 right-label">{props.pdfData.maximumNumberRangeLE}</label>
                            </div>

                            <div>
                                <label className="left-label" style={{paddingBottom: "5px", marginLeft: "-9px", fontWeight: "bold", textDecoration: "underline"}}>Select Number of Problems: </label>
                            </div>

                            <div className="row form-row">
                                <label htmlFor="solveForXRangeLE" className="form-label col-3 left-label">Solve For Single Variable:</label>
                                <input type="range" className="form-range col" name="solveForXRangeLE" min="0" max="50" value={props.pdfData.solveForXRangeLE}
                                       onChange={props.handleChange} disabled={!checkBoxData.linearEquations} />
                                <label className="col-1 right-label">{props.pdfData.solveForXRangeLE}</label>
                            </div>

                            <div className="row form-row">
                                <label htmlFor="graphSimpleInequalitiesRangeLE" className="form-label col-3 left-label">Graph Simple Inequalities:</label>
                                <input type="range" className="form-range col" name="graphSimpleInequalitiesRangeLE" min="0" max="50" value={props.pdfData.graphSimpleInequalitiesRangeLE}
                                       onChange={props.handleChange} disabled={!checkBoxData.linearEquations} />
                                <label className="col-1 right-label">{props.pdfData.graphSimpleInequalitiesRangeLE}</label>
                            </div>

                            <div className="row form-row">
                                <label htmlFor="solveGraphSimpleInequalitiesRangeLE" className="form-label col-3 left-label">Solve & Graph Simple Inequalities:</label>
                                <input type="range" className="form-range col" name="solveGraphSimpleInequalitiesRangeLE" min="0" max="50" value={props.pdfData.solveGraphSimpleInequalitiesRangeLE}
                                       onChange={props.handleChange} disabled={!checkBoxData.linearEquations} />
                                <label className="col-1 right-label">{props.pdfData.solveGraphSimpleInequalitiesRangeLE}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingGraphs">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseGraphs" aria-expanded="false" aria-controls="collapseGraphs">
                        Graphs
                    </button>
                </h2>
                <div id="collapseGraphs" className="accordion-collapse collapse" aria-labelledby="headingGraphs"
                     data-bs-parent="#algebraAccordion">
                    <div className="accordion-body">
                        {/*Checkboxes*/}
                        <div>
                            <label style={{paddingBottom: "5px", fontWeight: "bold", marginLeft: "-9px", textDecoration: "underline"}}>Options: </label>
                        </div>
                        <div className="form-check form-check-inline" >
                            <label className="form-check-label" htmlFor="graphs">Enable</label>
                            <input className="form-check-input" type="checkbox" id="graphs"
                                   name="graphs" onChange={handleEnablingCheckBoxEvent} checked={checkBoxData.graphs}/>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="useFractionsGraphs"
                                   name="useFractionsGraphs" disabled={!checkBoxData.graphs}
                                   onChange={props.handleChange} checked={props.pdfData.useFractionsGraphs}/>
                            <label className="form-check-label" htmlFor="useFractionsGraphs">Use Fractions</label>
                        </div>

                        {/*Ranges*/}
                        <div className="grid" style={{marginTop: "5px"}}>

                            <div className="row form-row">
                                <label htmlFor="maximumNumberRangeGraphs" className="form-label col-3 left-label">Largest Number To Be Used:</label>
                                <input type="range" className="form-range col min-max-range" name="maximumNumberRangeGraphs"
                                       min="10" max="50" value={props.pdfData.maximumNumberRangeGraphs}
                                       onChange={props.handleChange} disabled={!checkBoxData.graphs} />
                                <label className="col-1 right-label">{props.pdfData.maximumNumberRangeGraphs}</label>
                            </div>

                            <div>
                                <label className="left-label" style={{paddingBottom: "5px", marginLeft: "-9px", fontWeight: "bold", textDecoration: "underline"}}>Select Number of Problems: </label>
                            </div>

                            <div className="row form-row">
                                <label htmlFor="plotEachPointRangeGraphs" className="form-label col-3 left-label">Plot Each Point(3 total): </label>
                                <input type="range" className="form-range col" name="plotEachPointRangeGraphs" min="0" max="50" value={props.pdfData.plotEachPointRangeGraphs}
                                       onChange={props.handleChange} disabled={!checkBoxData.graphs} />
                                <label className="col-1 right-label">{props.pdfData.plotEachPointRangeGraphs}</label>
                            </div>
                            
                            <div className="row form-row">
                                <label htmlFor="orderedPairsSolutionsRangeGraphs" className="form-label col-3 left-label">Find Which Ordered Pairs Are Solutions:</label>
                                <input type="range" className="form-range col" name="orderedPairsSolutionsRangeGraphs" min="0" max="50" value={props.pdfData.orderedPairsSolutionsRangeGraphs}
                                       onChange={props.handleChange} disabled={!checkBoxData.graphs} />
                                <label className="col-1 right-label">{props.pdfData.orderedPairsSolutionsRangeGraphs}</label>
                            </div>
                            
                            <div className="row form-row">
                                <label htmlFor="graphTheEquationRangeGraphs" className="form-label col-3 left-label">Graph The Equation:</label>
                                <input type="range" className="form-range col" name="graphTheEquationRangeGraphs" min="0" max="50" value={props.pdfData.graphTheEquationRangeGraphs}
                                       onChange={props.handleChange} disabled={!checkBoxData.graphs} />
                                <label className="col-1 right-label">{props.pdfData.graphTheEquationRangeGraphs}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingSystemsOfLinearEquations">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseSystemsOfLinearEquations" aria-expanded="false" aria-controls="collapseSystemsOfLinearEquations">
                        Systems of Linear Equations
                    </button>
                </h2>
                <div id="collapseSystemsOfLinearEquations" className="accordion-collapse collapse" aria-labelledby="headingSystemsOfLinearEquations"
                     data-bs-parent="#algebraAccordion">
                    <div className="accordion-body">
                        {/*Checkboxes*/}
                        <div>
                            <label style={{paddingBottom: "5px", fontWeight: "bold", marginLeft: "-9px", textDecoration: "underline"}}>Options: </label>
                        </div>
                        <div className="form-check form-check-inline" >
                            <label className="form-check-label" htmlFor="systemsOfLinearEquations">Enable</label>
                            <input className="form-check-input" type="checkbox" id="systemsOfLinearEquations"
                                   name="systemsOfLinearEquations" onChange={handleEnablingCheckBoxEvent} checked={checkBoxData.systemsOfLinearEquations}/>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="useFractionsSOLE"
                                   name="useFractionsSOLE" disabled={!checkBoxData.systemsOfLinearEquations}
                                   onChange={props.handleChange} checked={props.pdfData.useFractionsSOLE}/>
                            <label className="form-check-label" htmlFor="useFractionsSOLE">Use Fractions</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="useMultipleVariableNamesSOLE"
                                   name="useMultipleVariableNamesSOLE" disabled={!checkBoxData.systemsOfLinearEquations}
                                   onChange={props.handleChange} checked={props.pdfData.useMultipleVariableNamesSOLE}/>
                            <label className="form-check-label" htmlFor="useMultipleVariableNamesSOLE">Use Multiple Variable Letters</label>
                        </div>
                        {/*Ranges*/}
                        <div className="row form-row">
                            <label htmlFor="maximumNumberRangeSOLE" className="form-label col-3 left-label">Largest Number To Be Used:</label>
                            <input type="range" className="form-range col min-max-range" name="maximumNumberRangeSOLE"
                                   min="10" max="50" value={props.pdfData.maximumNumberRangeSOLE}
                                   onChange={props.handleChange} disabled={!checkBoxData.systemsOfLinearEquations} />
                            <label className="col-1 right-label">{props.pdfData.maximumNumberRangeSOLE}</label>
                        </div>
                        <div>
                            <label className="left-label" style={{paddingBottom: "5px", marginLeft: "-9px", fontWeight: "bold", textDecoration: "underline"}}>Select Number of Problems: </label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="solveSystemEquationsRangeSOLE" className="form-label col-3 left-label">Solve System Of Linear Equations: </label>
                            <input type="range" className="form-range col" name="solveSystemEquationsRangeSOLE" min="0" max="50" value={props.pdfData.solveSystemEquationsRangeSOLE}
                                   onChange={props.handleChange} disabled={!checkBoxData.systemsOfLinearEquations} />
                            <label className="col-1 right-label">{props.pdfData.solveSystemEquationsRangeSOLE}</label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="solveSystemInequalitiesRangeSOLE" className="form-label col-3 left-label">Solve System Of Linear Inequalities: </label>
                            <input type="range" className="form-range col" name="solveSystemInequalitiesRangeSOLE" min="0" max="50" value={props.pdfData.solveSystemInequalitiesRangeSOLE}
                                   onChange={props.handleChange} disabled={!checkBoxData.systemsOfLinearEquations} />
                            <label className="col-1 right-label">{props.pdfData.solveSystemInequalitiesRangeSOLE}</label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="solveEquationsByGraphingRangeSOLE" className="form-label col-3 left-label">Solve System Of Linear Equations(Graphing): </label>
                            <input type="range" className="form-range col" name="solveEquationsByGraphingRangeSOLE" min="0" max="50" value={props.pdfData.solveEquationsByGraphingRangeSOLE}
                                   onChange={props.handleChange} disabled={!checkBoxData.systemsOfLinearEquations} />
                            <label className="col-1 right-label">{props.pdfData.solveEquationsByGraphingRangeSOLE}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingPolynomials">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapsePolynomials" aria-expanded="false" aria-controls="collapsePolynomials">
                        Polynomials
                    </button>
                </h2>
                <div id="collapsePolynomials" className="accordion-collapse collapse" aria-labelledby="headingPolynomials"
                     data-bs-parent="#algebraAccordion">
                    <div className="accordion-body">
                        {/*Checkboxes*/}
                        <div>
                            <label style={{paddingBottom: "5px", fontWeight: "bold", marginLeft: "-9px", textDecoration: "underline"}}>Options: </label>
                        </div>
                        <div className="form-check form-check-inline" >
                            <label className="form-check-label" htmlFor="polynomials">Enable</label>
                            <input className="form-check-input" type="checkbox" id="polynomials"
                                   name="polynomials" onChange={handleEnablingCheckBoxEvent} checked={checkBoxData.polynomials}/>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="useMultipleVariableNamesPolynomials"
                                   name="useMultipleVariableNamesPolynomials" disabled={!checkBoxData.polynomials}
                                   onChange={props.handleChange} checked={props.pdfData.useMultipleVariableNamesPolynomials}/>
                            <label className="form-check-label" htmlFor="useMultipleVariableNamesPolynomials">Use Multiple Variable Letters</label>
                        </div>
                        {/*Ranges*/}
                        <div className="row form-row">
                            <label htmlFor="maximumNumberRangePolynomials" className="form-label col-3 left-label">Largest Number To Be Used:</label>
                            <input type="range" className="form-range col min-max-range" name="maximumNumberRangePolynomials"
                                   min="10" max="50" value={props.pdfData.maximumNumberRangePolynomials}
                                   onChange={props.handleChange} disabled={!checkBoxData.polynomials} />
                            <label className="col-1 right-label">{props.pdfData.maximumNumberRangePolynomials}</label>
                        </div>
                        <div>
                            <label className="left-label" style={{paddingBottom: "5px", marginLeft: "-9px", fontWeight: "bold", textDecoration: "underline"}}>Select Number of Problems: </label>
                        </div>

                        <div className="row form-row">
                            <label htmlFor="convertToDecimalFormRangePolynomials" className="form-label col-3 left-label">Convert To Decimal Form:</label>
                            <input type="range" className="form-range col min-max-range" name="convertToDecimalFormRangePolynomials"
                                   min="0" max="50" value={props.pdfData.convertToDecimalFormRangePolynomials}
                                   onChange={props.handleChange} disabled={!checkBoxData.polynomials} />
                            <label className="col-1 right-label">{props.pdfData.convertToDecimalFormRangePolynomials}</label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="simplifyRangePolynomials" className="form-label col-3 left-label">Simplify Polynomial:</label>
                            <input type="range" className="form-range col min-max-range" name="simplifyRangePolynomials"
                                   min="0" max="50" value={props.pdfData.simplifyRangePolynomials}
                                   onChange={props.handleChange} disabled={!checkBoxData.polynomials} />
                            <label className="col-1 right-label">{props.pdfData.simplifyRangePolynomials}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingFactoring">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseFactoring" aria-expanded="false" aria-controls="collapseFactoring">
                        Factoring
                    </button>
                </h2>
                <div id="collapseFactoring" className="accordion-collapse collapse" aria-labelledby="headingFactoring"
                     data-bs-parent="#algebraAccordion">
                    <div className="accordion-body">
                        {/*Checkboxes*/}
                        <div>
                            <label style={{paddingBottom: "5px", fontWeight: "bold", marginLeft: "-9px", textDecoration: "underline"}}>Options: </label>
                        </div>
                        <div className="form-check form-check-inline" >
                            <label className="form-check-label" htmlFor="factoring">Enable</label>
                            <input className="form-check-input" type="checkbox" id="factoring"
                                   name="factoring" onChange={handleEnablingCheckBoxEvent} checked={checkBoxData.factoring}/>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="useMultipleVariableNamesFactoring"
                                   name="useMultipleVariableNamesFactoring" disabled={!checkBoxData.factoring}
                                   onChange={props.handleChange} checked={props.pdfData.useMultipleVariableNamesFactoring}/>
                            <label className="form-check-label" htmlFor="useMultipleVariableNamesFactoring">Use Multiple Variable Letters</label>
                        </div>
                        {/*Ranges*/}
                        <div className="row form-row">
                            <label htmlFor="maximumNumberRangeFactoring" className="form-label col-3 left-label">Largest Number To Be Used:</label>
                            <input type="range" className="form-range col min-max-range" name="maximumNumberRangeFactoring"
                                   min="10" max="50" value={props.pdfData.maximumNumberRangeFactoring}
                                   onChange={props.handleChange} disabled={!checkBoxData.factoring} />
                            <label className="col-1 right-label">{props.pdfData.maximumNumberRangeFactoring}</label>
                        </div>
                        <div>
                            <label className="left-label" style={{paddingBottom: "5px", marginLeft: "-9px", fontWeight: "bold", textDecoration: "underline"}}>Select Number of Problems: </label>
                        </div>

                        <div className="row form-row">
                            <label htmlFor="findGcdRangeFactoring" className="form-label col-3 left-label">Find Greatest Common Factor:</label>
                            <input type="range" className="form-range col min-max-range" name="findGcdRangeFactoring"
                                   min="0" max="50" value={props.pdfData.findGcdRangeFactoring}
                                   onChange={props.handleChange} disabled={!checkBoxData.factoring} />
                            <label className="col-1 right-label">{props.pdfData.findGcdRangeFactoring}</label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="factorRangeFactoring" className="form-label col-3 left-label">Factor The Expression:</label>
                            <input type="range" className="form-range col min-max-range" name="factorRangeFactoring"
                                   min="0" max="50" value={props.pdfData.factorRangeFactoring}
                                   onChange={props.handleChange} disabled={!checkBoxData.factoring} />
                            <label className="col-1 right-label">{props.pdfData.factorRangeFactoring}</label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="solveByFactoringRangeFactoring" className="form-label col-3 left-label">Solve Using Factoring:</label>
                            <input type="range" className="form-range col min-max-range" name="solveByFactoringRangeFactoring"
                                   min="0" max="50" value={props.pdfData.solveByFactoringRangeFactoring}
                                   onChange={props.handleChange} disabled={!checkBoxData.factoring} />
                            <label className="col-1 right-label">{props.pdfData.solveByFactoringRangeFactoring}</label>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingRationalExpressions">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseRationalExpressions" aria-expanded="false" aria-controls="collapseRationalExpressions">
                        Rational Expressions and Equations
                    </button>
                </h2>
                <div id="collapseRationalExpressions" className="accordion-collapse collapse" aria-labelledby="headingRationalExpressions"
                     data-bs-parent="#algebraAccordion">
                    <div className="accordion-body">
                        {/*Checkboxes*/}
                        <div>
                            <label style={{paddingBottom: "5px", fontWeight: "bold", marginLeft: "-9px", textDecoration: "underline"}}>Options: </label>
                        </div>
                        <div className="form-check form-check-inline" >
                            <label className="form-check-label" htmlFor="rationalExpressionsAndEquations">Enable</label>
                            <input className="form-check-input" type="checkbox" id="rationalExpressionsAndEquations"
                                   name="rationalExpressionsAndEquations" onChange={handleEnablingCheckBoxEvent} checked={checkBoxData.rationalExpressionsAndEquations}/>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="useMultipleVariableNamesREAE"
                                   name="useMultipleVariableNamesREAE" disabled={!checkBoxData.rationalExpressionsAndEquations}
                                   onChange={props.handleChange} checked={props.pdfData.useMultipleVariableNamesREAE}/>
                            <label className="form-check-label" htmlFor="useMultipleVariableNamesREAE">Use Multiple Variable Letters</label>
                        </div>
                        {/*Ranges*/}
                        <div className="row form-row">
                            <label htmlFor="maximumNumberRangeREAE" className="form-label col-3 left-label">Largest Number To Be Used:</label>
                            <input type="range" className="form-range col min-max-range" name="maximumNumberRangeREAE"
                                   min="10" max="50" value={props.pdfData.maximumNumberRangeREAE}
                                   onChange={props.handleChange} disabled={!checkBoxData.rationalExpressionsAndEquations} />
                            <label className="col-1 right-label">{props.pdfData.maximumNumberRangeREAE}</label>
                        </div>
                        <div>
                            <label className="left-label" style={{paddingBottom: "5px", marginLeft: "-9px", fontWeight: "bold", textDecoration: "underline"}}>Select Number of Problems: </label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="simplifySimpleRangeREAE" className="form-label col-3 left-label">Simplify Simple Expressions:</label>
                            <input type="range" className="form-range col min-max-range" name="simplifySimpleRangeREAE"
                                   min="0" max="50" value={props.pdfData.simplifySimpleRangeREAE}
                                   onChange={props.handleChange} disabled={!checkBoxData.rationalExpressionsAndEquations} />
                            <label className="col-1 right-label">{props.pdfData.simplifySimpleRangeREAE}</label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="simplifyMultiRangeREAE" className="form-label col-3 left-label">Simplify Complex Expressions:</label>
                            <input type="range" className="form-range col min-max-range" name="simplifyMultiRangeREAE"
                                   min="0" max="50" value={props.pdfData.simplifyMultiRangeREAE}
                                   onChange={props.handleChange} disabled={!checkBoxData.rationalExpressionsAndEquations} />
                            <label className="col-1 right-label">{props.pdfData.simplifyMultiRangeREAE}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingRootsRadicals">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseRootsRadicals" aria-expanded="false" aria-controls="collapseRootsRadicals">
                        Roots and Radicals
                    </button>
                </h2>
                <div id="collapseRootsRadicals" className="accordion-collapse collapse" aria-labelledby="headingRootsRadicals"
                     data-bs-parent="#algebraAccordion">
                    <div className="accordion-body">
                        {/*Checkboxes*/}
                        <div>
                            <label style={{paddingBottom: "5px", fontWeight: "bold", marginLeft: "-9px", textDecoration: "underline"}}>Options: </label>
                        </div>
                        <div className="form-check form-check-inline" >
                            <label className="form-check-label" htmlFor="rootsAndRadicals">Enable</label>
                            <input className="form-check-input" type="checkbox" id="rootsAndRadicals"
                                   name="rootsAndRadicals" onChange={handleEnablingCheckBoxEvent} checked={checkBoxData.rootsAndRadicals}/>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="useMultipleVariableNamesRAR"
                                   name="useMultipleVariableNamesRAR" disabled={!checkBoxData.rootsAndRadicals}
                                   onChange={props.handleChange} checked={props.pdfData.useMultipleVariableNamesRAR}/>
                            <label className="form-check-label" htmlFor="useMultipleVariableNamesRAR">Use Multiple Variable Letters</label>
                        </div>
                        {/*Ranges*/}
                        <div className="row form-row">
                            <label htmlFor="maximumNumberRangeRAR" className="form-label col-3 left-label">Largest Number To Be Used:</label>
                            <input type="range" className="form-range col min-max-range" name="maximumNumberRangeRAR"
                                   min="10" max="50" value={props.pdfData.maximumNumberRangeRAR}
                                   onChange={props.handleChange} disabled={!checkBoxData.rootsAndRadicals} />
                            <label className="col-1 right-label">{props.pdfData.maximumNumberRangeRAR}</label>
                        </div>
                        <div>
                            <label className="left-label" style={{paddingBottom: "5px", marginLeft: "-9px", fontWeight: "bold", textDecoration: "underline"}}>Select Number of Problems: </label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="simplifyRangeRAR" className="form-label col-3 left-label">Simplify Radical Expression:</label>
                            <input type="range" className="form-range col min-max-range" name="simplifyRangeRAR"
                                   min="0" max="50" value={props.pdfData.simplifyRangeRAR}
                                   onChange={props.handleChange} disabled={!checkBoxData.rootsAndRadicals} />
                            <label className="col-1 right-label">{props.pdfData.simplifyRangeRAR}</label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="rationalizeRangeRAR" className="form-label col-3 left-label">Rationalize The Denominator:</label>
                            <input type="range" className="form-range col min-max-range" name="rationalizeRangeRAR"
                                   min="0" max="50" value={props.pdfData.rationalizeRangeRAR}
                                   onChange={props.handleChange} disabled={!checkBoxData.rootsAndRadicals} />
                            <label className="col-1 right-label">{props.pdfData.rationalizeRangeRAR}</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingQuadraticEquations">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseQuadraticEquations" aria-expanded="false" aria-controls="collapseQuadraticEquations">
                        Quadratic Equations
                    </button>
                </h2>
                <div id="collapseQuadraticEquations" className="accordion-collapse collapse" aria-labelledby="headingQuadraticEquations"
                     data-bs-parent="#algebraAccordion">
                    <div className="accordion-body">
                        {/*Checkboxes*/}
                        <div>
                            <label style={{paddingBottom: "5px", fontWeight: "bold", marginLeft: "-9px", textDecoration: "underline"}}>Options: </label>
                        </div>
                        <div className="form-check form-check-inline" >
                            <label className="form-check-label" htmlFor="quadraticEquations">Enable</label>
                            <input className="form-check-input" type="checkbox" id="quadraticEquations"
                                   name="quadraticEquations" onChange={handleEnablingCheckBoxEvent} checked={checkBoxData.quadraticEquations}/>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="useMultipleVariableNamesQE"
                                   name="useMultipleVariableNamesQE" disabled={!checkBoxData.quadraticEquations}
                                   onChange={props.handleChange} checked={props.pdfData.useMultipleVariableNamesQE}/>
                            <label className="form-check-label" htmlFor="useMultipleVariableNamesQE">Use Multiple Variable Letters</label>
                        </div>
                        {/*Ranges*/}
                        <div className="row form-row">
                            <label htmlFor="maximumNumberRangeQE" className="form-label col-3 left-label">Largest Number To Be Used:</label>
                            <input type="range" className="form-range col min-max-range" name="maximumNumberRangeQE"
                                   min="10" max="50" value={props.pdfData.maximumNumberRangeQE}
                                   onChange={props.handleChange} disabled={!checkBoxData.quadraticEquations} />
                            <label className="col-1 right-label">{props.pdfData.maximumNumberRangeQE}</label>
                        </div>
                        <div>
                            <label className="left-label" style={{paddingBottom: "5px", marginLeft: "-9px", fontWeight: "bold", textDecoration: "underline"}}>Select Number of Problems: </label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="solveRangeQE" className="form-label col-3 left-label">Solve The Quadratic Equation:</label>
                            <input type="range" className="form-range col min-max-range" name="solveRangeQE"
                                   min="0" max="50" value={props.pdfData.solveRangeQE}
                                   onChange={props.handleChange} disabled={!checkBoxData.quadraticEquations} />
                            <label className="col-1 right-label">{props.pdfData.solveRangeQE}</label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="graphParabolaRangeQE" className="form-label col-3 left-label">Graph The Parabola:</label>
                            <input type="range" className="form-range col min-max-range" name="graphParabolaRangeQE"
                                   min="0" max="50" value={props.pdfData.graphParabolaRangeQE}
                                   onChange={props.handleChange} disabled={!checkBoxData.quadraticEquations} />
                            <label className="col-1 right-label">{props.pdfData.graphParabolaRangeQE}</label>
                        </div>
                        <div className="row form-row">
                            <label htmlFor="useDiscriminantRangeQE" className="form-label col-3 left-label">Find # Of Solutions Using Discriminant:</label>
                            <input type="range" className="form-range col min-max-range" name="useDiscriminantRangeQE"
                                   min="0" max="50" value={props.pdfData.useDiscriminantRangeQE}
                                   onChange={props.handleChange} disabled={!checkBoxData.quadraticEquations} />
                            <label className="col-1 right-label">{props.pdfData.useDiscriminantRangeQE}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}