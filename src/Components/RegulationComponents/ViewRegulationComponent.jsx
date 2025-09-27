import { useEffect, useRef, useState } from "react";
import { getAllRegulations } from "../../api/RegulationApi";
import { Box, Button, Typography } from "@mui/material";
import $ from "jquery"
import { useNavigate, useParams } from "react-router-dom";

export default function ViewRegulationComponent() {

    const [regulationList,setRegulationList] = useState([])
    
    const tableRef = useRef(null)
    const navigate =useNavigate()
    const {id} = useParams()

    useEffect(()=> {
        getAllRegulations().then((response) => {
            setRegulationList(response.data)
            console.log('regulation List ',response.data)
        })
    }, [])

    useEffect(()=> {
        if(tableRef.current && regulationList.length>0) {
            $(tableRef.current).DataTable()
        }
    },[regulationList])

    function addRegulation()
    {
      navigate(`/regulation/-1`)
    }

    function updateRegulation(id)
    {
      navigate(`/regulation/${id}`)
    }
    return(
        <div className="container">
            <Box>
                <Typography variant="h4" gutterBottom>View Regulations
                    <Button sx={{float:'right'}} variant="contained" color="primary" onClick={addRegulation}>Add Regulation</Button>
                </Typography>
            </Box>
            <table className="table table-striped table-hover" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Regulation Name</th>
                        <th>Description</th>
                        <th>Issued Date</th>
                        <th>Next Renewal Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        regulationList.length === 0 ?
                        (
                            <tr>
                                <td colSpan={6}>No Regulation Data Available</td>
                            </tr>
                        ) : (
                            regulationList.map((reg,index)=>(
                                <tr key={reg.regulation_id}>
                                    <td>{index+1}</td>
                                    <td>{reg.regulation_name}</td>
                                    <td>{reg.regulation_description}</td>
                                    <td>{reg.regulation_issued_date}</td>
                                    <td>{reg.next_renewal_date}</td>
                                    <td> <Button variant="contained" color="primary" onClick={()=>updateRegulation(reg.regulation_id)} >UPDATE</Button> </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}