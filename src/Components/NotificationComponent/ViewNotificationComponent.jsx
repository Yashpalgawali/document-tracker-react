import { useEffect, useRef, useState } from "react"
import { getAllNotifications } from "../../api/NotificationApi"
import { showToast } from "../../SharedComponent/showToast"

export default function ViewNotificationComponent() {

    const [notificationList,setNotificationList] = useState([])

    const tableRef = useRef(null)

    useEffect(()=> {
        if(tableRef.current && notificationList.length>0) {
            $(tableRef.current).DataTable()
        }
    }, [notificationList] )

    useEffect(()=> {
        getAllNotifications().then((response) => {
            setNotificationList(response.data)
        }).catch((error) => {
            showToast(error.data.errorMessage,"error")
        })

    })

    return(
        <div className="container">

        </div>
    )
}