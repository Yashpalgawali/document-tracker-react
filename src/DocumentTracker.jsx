import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import RegulationTypeComponent from "./Components/RegulationTypeComponent";
import HeaderComponent from "./HeaderComponent";

export default function DocumentTracker(){
    return (
        <BrowserRouter>
            <HeaderComponent />
            <Router>
                <Route element={ <RegulationTypeComponent />} path="/regulationtype/-1" ></Route>
            </Router>
        </BrowserRouter >
    )
}