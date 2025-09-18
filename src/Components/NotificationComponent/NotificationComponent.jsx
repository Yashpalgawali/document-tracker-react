import { Box, TextField } from "@mui/material"
import { ErrorMessage, Form, Formik } from "formik"
import { useActionState, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

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
        }
    })

    return(

        <div className="container">
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
                            variant="filled"
                            name="notification_name"
                            value={values.notification_name}
                           
                            helperText={<ErrorMessage name="notification_name" />}
                            fullWidth
                        ></TextField>

                        <TextField
                            label="Notification Description"
                            variant="filled"
                            name="notification_description"
                            value={values.notification_description}
                           
                            helperText={<ErrorMessage name="notification_description" />}
                            fullWidth
                        ></TextField>
                        
                        <TextField
                            label="Notification Description"
                            variant="filled"
                            name="notification_description"
                            value={values.notification_description}
                            helperText={<ErrorMessage name="notification_description" />}
                            fullWidth
                        ></TextField>

                        </Box>
                    </Form>
                )
             }   
            </Formik>
          </LocalizationProvider>
        </div>
    )
}