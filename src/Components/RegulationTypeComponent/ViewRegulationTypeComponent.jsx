import $ from 'jquery';

import { Box, Button, Typography } from "@mui/material" 
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllRegulationTypes, updateRegulationType } from "../../api/RegulationTypeApi"

import EditIcon from '@mui/icons-material/Edit';

import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality 
import { showToast } from '../SharedComponent/showToast';

export default function ViewRegulationTypeComponent() {
    
    const [regulationTypeList , setRegulationTypeList] = useState([])
    const navigate = useNavigate()

    const tableRef = useRef(null); // Ref for the table

    useEffect(()=>{

        if(tableRef.current && regulationTypeList.length > 0) {
            $(tableRef.current).DataTable()
        }
    }, [regulationTypeList])
    
    useEffect(()=> {
        getAllRegulationTypes().then((response) => {
            console.log(response)
            setRegulationTypeList(response.data)
        }).catch((error)=> {
            showToast(error.data.errorMessage,"error")
        })
    },[])
    
    function addRegulationType(){
        navigate(`/regulationtype/-1`)
    }

    function addRegulation() {
        navigate(`/regulation/-1`)
    }
    
    function updateRegulationType(id) {
        navigate(`/regulationtype/${id}`)
    }

    return(
        <div className="container" style={{ marginTop : '50px'}}>
        <Box>
            <Typography variant="h4" gutterBottom >View Regulation Types</Typography>
            <Button variant="contained" onClick={addRegulationType} color="secondary" >Add Regulation Type</Button>

            <Button variant="contained" sx={{ m : '5px'}} onClick={addRegulation} color="success" >Add Regulation</Button>

        </Box>
        <table className="table table-striped table-hover" ref={tableRef}>
            <thead>
                <tr>
                    <th>Sr No</th>
                    <th>Regulation Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    regulationTypeList.length == 0 ? (
                        <tr>
                            <td colSpan={3}>No Data To Display</td>
                        </tr>
                    ) : (
                    regulationTypeList.map((regtype,index)=>(
                        <tr key={regtype.regulation_type_id}>
                            <td>{index+1}</td>
                            <td>{regtype.regulation_type}</td>
                            <td><Button variant='contained' color='primary' onClick={()=>updateRegulationType(regtype.regulation_type_id)}><EditIcon /> Update</Button> </td>
                        </tr>
                    ))
                  )
                }
            </tbody>
        </table>
       </div>
    )
}