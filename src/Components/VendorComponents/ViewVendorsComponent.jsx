import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getAllVendors } from "../../api/VendorApi";
import $ from "jquery";



export default function ViewVendorsComponent() {

    const [vendorList,setVendorList] = useState([])

    const tableRef = useRef(null)

    useEffect(()=> {
        getAllVendors().then((response) => {
            setVendorList(response.data)
        })
    },[])

    useEffect(()=> {
        if(tableRef.current && vendorList.length > 0) {
            $(tableRef.current).DataTable()
        }
    },[vendorList])

    function viewVendorHistory(id) {
       
    }

    return(
        <div className="container">
            <Box>
                <Typography variant="h4" gutterBottom>View Vendors</Typography>
            </Box>

            <table className="table table-striped table-hover" ref={tableRef} >
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vendorList.length === 0 ? (
                            <tr>
                                <td colSpan={5}>No Vendors Found</td>
                            </tr>
                        ) : 
                        (
                            vendorList.map((vendor,index) =>(
                                <tr key={vendor.vendor_id}>
                                    <td>{index+1}</td>
                                    <td>{vendor.vendor_name}</td>
                                    <td>{vendor.vendor_email}</td>
                                    <td>{vendor.enabled ? 'Active' : 'Disabled'}</td>
                                    <td>
                                        <Button variant="contained" color="primary" onClick={()=>viewVendorHistory(vendor.vendor_id)} >History</Button>
                                        <Button variant="contained" sx={{ ml : '5px'}} color="primary" onClick={()=>viewVendorHistory(vendor.vendor_id)} >History</Button>
                                    </td>
                                </tr>
                            ))
                        )
                        
                    }
                </tbody>
            </table>
        </div>
    )
}