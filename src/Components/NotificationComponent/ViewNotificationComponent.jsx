import $ from "jquery";
import { useEffect, useRef, useState } from "react"
import { getAllNotifications } from "../../api/NotificationApi"
import { showToast } from "../SharedComponent/showToast"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import { Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function ViewNotificationComponent() {

    const [notificationList,setNotificationList] = useState([])

    const navigate = useNavigate()

    const tableRef = useRef(null)

    useEffect(()=> {
        if(tableRef.current && notificationList.length>0) {
            $(tableRef.current).DataTable()
        }
    }, [notificationList] )

    useEffect(()=> {
        getAllNotifications().then((response) => {
            console.log(response)
            setNotificationList(response.data)
        }).catch((error) => {
            console.log('No Data Found',error)
            showToast(error.response.data.errorMessage,"error")
        })

    },[])

    function updateNotificationById(id) {
        navigate(`/notification/${id}`)
    }

    function addNotification() {
        navigate(`/notification/-1`)
    }


    return(
        <div className="container">
            <Box mb={2}>
                <Typography variant="h4" gutterBottom>View Notifications
                    <Button style={{ float : 'right'}} variant="contained" color="secondary" onClick={addNotification}> Add notification</Button>
                </Typography>
            </Box>
            <table ref={tableRef} className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>Sr</th>
                    <th>Notification Name</th>
                    <th>Description</th>
                    <th>Start Date </th>
                    <th>End Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    notificationList.length === 0 ? (
                        <tr>
                            <td colSpan={6}>No data</td>
                        </tr>
                    ) : 
                    (
                        notificationList.map((notification,index) => (
                            <tr key={notification.notification_id}>
                                <td>{index+1}</td>
                                <td>{notification.notification_name}</td>
                                <td>{notification.notification_description}</td>
                               <td>{notification.notification_start_date}</td>
                                <td>{notification.notification_end_date}</td>
                                <td><Button variant="contained" color="info" onClick={()=>updateNotificationById(notification.notification_id)}><EditIcon /> Update </Button> </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
            </table>
        </div>
    )
}