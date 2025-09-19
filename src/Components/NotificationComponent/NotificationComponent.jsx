import { Box, Button, TextField, Typography } from "@mui/material"
import { ErrorMessage, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import dayjs  from "dayjs"; 
import { getNotificationById, saveNotification, updateNotification } from "../../api/NotificationApi";
import { showToast } from "../SharedComponent/showToast"

export default function NotificationComponent() {

    const [notification_name,setNotificationName] = useState('')
    const [notification_description, setNotificationDescription] = useState('')
    const [notification_add_date,setNotificationAddDate] = useState('')
    const [notification_add_time,setNotificationAddTime] = useState('')

    const [notification_start_date,setNotificationStartDate] = useState('')
    const [notification_end_date,setNotificationEndDate] = useState('')
    const [status ,setStatus] = useState('')

    const [btnvalue , setBtnValue] = useState('Add Notification')
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=> {
 
        if(id != -1) {
            setBtnValue('Update Notification')
            getNotificationById(id).then((response) => {
                console.log(response)
                
                let formattedStartDate = dayjs(response.data.notification_start_date,"DD-MM-YYYY")
                let formattedEndDate = dayjs(response.data.notification_end_date,"DD-MM-YYYY")

                setNotificationName(response.data.notification_name)
                setNotificationDescription(response.data.notification_description)
                setNotificationStartDate(formattedStartDate)
                setNotificationEndDate(formattedEndDate)
            })
        }
    },[])

    function validate(values) {
        let errors = {}

        if(values.notification_name=='') {
            errors.notification_name="Notification Name can't be blank"
        }

        if(values.notification_description=='') {
            errors.notification_description="Notification Description can't be blank"
        }
        
        if(values.notification_start_date==null) {
            errors.notification_start_date="Please Select Notification Start Date"
        }

         if(values.notification_end_date==null) {
            errors.notification_end_date="Please Select Notification Start Date"
        }

        return errors
    }

    function onSubmit(values) {

        let formatted_start_date = dayjs(values.notification_start_date).format('DD-MM-YYYY')

        let formatted_end_date = dayjs(values.notification_end_date).format('DD-MM-YYYY')
        if(id == -1) {
            let notification = {
                notification_name : values.notification_name,
                notification_description: values.notification_description,
                notification_start_date : formatted_start_date,
                notification_end_date : formatted_end_date
            }

            saveNotification(notification).then((response)=> {
                showToast(response.data.responseMessage)
                navigate(`/viewnotifications`)
            }).catch((error) => {
               showToast(error.data.errorMessage)
                navigate(`/viewnotifications`)

            })
        } 
        else {
            let notification = {
                notification_id : id,
                notification_name : values.notification_name,
                notification_description: values.notification_description,
                  notification_start_date : formatted_start_date,
                notification_end_date : formatted_end_date
            }

            updateNotification(notification).then((response)=> {
                showToast(response.data.responseMessage)
                navigate(`/viewnotifications`)
            }).catch((error) => {
                showToast(error.data.errorMessage)
                navigate(`/viewnotifications`)
            })
        }
    }

    return(

        <div className="container">
            <Box mb={2}>
                <Typography variant="h4">{btnvalue}</Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Formik
                initialValues={ { notification_name , notification_add_date: notification_add_date ? dayjs(notification_add_date) : null , notification_add_time ,
                                  notification_description , notification_end_date : notification_end_date ? dayjs(notification_end_date) : null ,
                                  notification_start_date : notification_start_date ? dayjs(notification_start_date) : null 
                 } }
                enableReinitialize={true}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
              
                {({ setFieldValue, values, handleChange, handleBlur,  touched, errors }) => (
                    <Form>
                         <Box
                               sx={{ '& > :not(style)': { m: 1, width: '100ch' } }}
                                noValidate
                                autoComplete="off"
                        >
                        <TextField
                            label="Notification Name"
                            variant="standard"
                            name="notification_name"
                            value={values.notification_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.notification_name && Boolean(errors.notification_name) }
                            helperText={<ErrorMessage name="notification_name" />}
                            fullWidth
                        ></TextField>

                        <TextField
                            label="Notification Description"
                            variant="standard"
                            name="notification_description"
                            value={values.notification_description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.notification_description && Boolean(errors.notification_description) }
                            helperText={<ErrorMessage name="notification_description" />}
                            fullWidth
                        ></TextField>
                        
                        <Box mb={2} sx={{ justifyContent : 'start' , marginLeft : '131px !important'} }  >
                                <DatePicker
                                    sx={ { marginRight : '5px' ,width : '40ch'} }
                                    format="DD-MM-YYYY"
                                    label="Notification Start Date"
                                    value={values.notification_start_date}
                                    onChange={(date) => setFieldValue('notification_start_date', date)}
                                    slotProps={{
                                    textField: { 
                                        error: touched.notification_start_date && Boolean(errors.notification_start_date),
                                        helperText: <ErrorMessage name="notification_start_date" />
                                    }
                                    }}
                                />
                         
                                <DatePicker
                                    sx={ {  width : '40ch'} }
                                    format="DD-MM-YYYY"
                                    label="Notification End Date"
                                    value={values.notification_end_date}
                                    onChange={(date) => setFieldValue('notification_end_date', date)}
                                    slotProps={{
                                    textField: { 
                                        error: touched.notification_end_date && Boolean(errors.notification_end_date),
                                        helperText: <ErrorMessage name="notification_end_date"  />
                                    }
                                    }}
                                />
                         </Box>
                         <Box >
                            <Button type="submit" variant="contained" color="primary">{btnvalue}</Button>
                         </Box>
                        </Box>
                    </Form>
                )
             }   
            </Formik>
          </LocalizationProvider>
        </div>
    )
}