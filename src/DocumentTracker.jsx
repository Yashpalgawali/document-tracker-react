import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegulationTypeComponent from "./Components/RegulationTypeComponent/RegulationTypeComponent";
import HeaderComponent from "./HeaderComponent";
import ViewRegulationTypeComponent from "./Components/RegulationTypeComponent/ViewRegulationTypeComponent";
import { ToastContainer } from "react-toastify";

export default function DocumentTracker(){
    return (
        <>
       
        <BrowserRouter>
            <HeaderComponent />
            <ToastContainer autoClose={2500} position="top-center"></ToastContainer>
            <Routes>
                <Route element={ <RegulationTypeComponent />} path="/regulationtype/:id" ></Route>
            </Routes>

            <Routes>
                <Route element={ <ViewRegulationTypeComponent />} path="/regulationtypes" ></Route>
            </Routes>
        </BrowserRouter >
        </>
    )
}