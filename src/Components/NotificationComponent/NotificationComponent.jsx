import { Box, TextField, Typography } from "@mui/material"
import { ErrorMessage, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import dayjs  from "dayjs";

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
        alert('id is '+id)
        if(id != -1) {
            setBtnValue('Update Notification')
        }
    })

    function validate(values) {

    }

    function onSubmit(values) {

    }

    return(

        <div className="container">
            <Box mb={2}>
                <Typography variant="h4">{btnvalue}</Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Formik
                initialValues={ { notification_name , notification_add_date , notification_add_time ,
                                  notification_description , notification_end_date, notification_start_date
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
                            helperText={<ErrorMessage name="notification_description" />}
                            fullWidth
                        ></TextField>
                        
                        <Box mb={2}  >
                                <DatePicker
                                    
                                    format="DD/MM/YYYY"
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