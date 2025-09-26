import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegulationTypeComponent from "./Components/RegulationTypeComponent/RegulationTypeComponent";
import HeaderComponent from "./HeaderComponent";
import ViewRegulationTypeComponent from "./Components/RegulationTypeComponent/ViewRegulationTypeComponent";
import { ToastContainer } from "react-toastify";
import ViewNotificationComponent from "./Components/NotificationComponent/ViewNotificationComponent";
import NotificationComponent from "./Components/NotificationComponent/NotificationComponent";
import RegisterVendorComponent from "./Components/VendorComponents/RegisterVendorComponent";
import RegulationComponent from "./Components/RegulationComponents/RegulationComponent";
import ViewVendorsComponent from "./Components/VendorComponents/ViewVendorsComponent";
import ViewRegulationComponent from "./Components/RegulationComponents/ViewRegulationComponent";

export default function DocumentTracker(){
    return (
        <>

        <BrowserRouter basename="documenttracker">
            <HeaderComponent />
            <ToastContainer autoClose={2500} position="top-center"></ToastContainer>
            <Routes>
                <Route element={ <RegulationTypeComponent />} path="/regulationtype/:id" ></Route>
            </Routes>

            <Routes>
                <Route element={ <ViewRegulationTypeComponent />} path="/regulationtypes" ></Route>
            </Routes>
            <Routes>
                <Route element= { <ViewNotificationComponent /> } path="/viewnotifications"></Route> 
            </Routes>

            <Routes>
                <Route element= { <NotificationComponent /> } path="/notification/:id"></Route>
            </Routes>

            <Routes>
                <Route element= { <RegisterVendorComponent /> } path="/register/vendor"></Route>
            </Routes>

             <Routes>
                <Route element= { <RegisterVendorComponent /> } path="/vendor/:id"></Route>
            </Routes>

            <Routes>
                <Route element= { <RegulationComponent /> } path="/regulation/:id"></Route>
            </Routes>
            
            <Routes>
                <Route element= { <ViewRegulationComponent /> } path="/viewregulations"></Route>
            </Routes>

            <Routes>
                <Route element= { <ViewVendorsComponent /> } path="/viewvendors"></Route>
            </Routes>

           

        </BrowserRouter >
        </>
    )
}