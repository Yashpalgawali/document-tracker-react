import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import RegulationTypeComponent from "./Components/RegulationTypeComponent/RegulationTypeComponent";
import HeaderComponent from "./HeaderComponent";
import ViewRegulationTypeComponent from "./Components/RegulationTypeComponent/ViewRegulationTypeComponent";

export default function DocumentTracker(){
    return (
        <BrowserRouter>
            <HeaderComponent />
            <Router>
                <Route element={ <RegulationTypeComponent />} path="/regulationtype/-1" ></Route>
            </Router>

            <Router>
                <Route element={ <ViewRegulationTypeComponent />} path="/regulationtypes" ></Route>
            </Router>
        </BrowserRouter >
    )
}