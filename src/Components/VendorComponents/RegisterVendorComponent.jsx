import { Box, Button, TextField, Typography } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { registerVendor } from "../../api/VendorApi";
import { useNavigate } from "react-router-dom";

import { showToast } from "../SharedComponent/showToast";
import { isUserEmailUsed } from "../../api/UserApi";


const checkEmailExists = async (email) => {
    try{
        const response = await isUserEmailUsed(email)
          // if API call succeeds, email is already in use
            return true;
    }
    catch(err) {
       if (err.response && err.response.status === 404) {
        // 404 → email not found → not in use
            return false;
        }
        console.error("Unexpected error while checking email:", err);
        return false; // fail-safe (treat as not in use, or you can return true if you prefer stricter validation)

    }
}

export default function RegisterVendorComponent() {
 
    const [vendor_name , setVendorName] = useState('')
    const [vendor_email, setVendorEmail] = useState('')
    const [vendor_id, setVendorId] = useState('')
    const [password, setPassword] = useState('')
    const [cnfpassword, setCnfPassword] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate()

    const [btnvalue,setBtnValue] = useState('Register Vendor')

    function validate(values) {
        let errors= {}

        if(values.vendor_name=='') {
            errors.vendor_name = 'Vendor Name Can\'t be blank'
        }

        if(values.vendor_email=='') {
            errors.vendor_email = 'Vendor Email Can\'t be blank'
        }

        if(values.vendor_email=='') {
            errors.vendor_email = 'Vendor Email Can\'t be blank'
        }

        if(values.password=='') {
            errors.password = 'Password can\'t be blank'
        }

        if(values.password!=values.cnfpassword) {
            errors.password = 'Password does not match'            
        }

        if(values.password!=values.cnfpassword) {            
            errors.cnfpassword = 'Password does not match'
        }

        return errors
    }

    async function  onSubmit(values) {
        let exists = checkEmailExists(values.email)
        alert(exists)
        console.log(exists)
        let vendor = {
            vendor_name : values.vendor_name,
            vendor_email : values.vendor_email,
            username : values.username,
            password : values.password
        }
        registerVendor(vendor).then((response)=> {              
                showToast(response.data?.responseMessage,'success')
                navigate(`/regulationtypes`)
            }).catch((error) => {
                showToast(error?.data?.errorMessage,"error")
                navigate(`/regulationtypes`)
            })
    }

    return(
        <div className="container">
            <Box>
                <Typography variant="h4" gutterBottom>{btnvalue}</Typography>
            </Box>
            <Formik
                initialValues={ { vendor_name ,vendor_email,vendor_id , password , username,cnfpassword }}
                enableReinitialize={true}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async (values, { setFieldError }) => {
                const exists = await checkEmailExists(values.vendor_email);
                if (exists) {
                setFieldError("vendor_email", "Email already exists. Use Another email ");
                return; // 🚫 stop submission
                }

                // ✅ proceed with actual submit
                await onSubmit(values);
            }}
            >
            {
                (props) => (
                    <Box>
                        <Form>
                            <TextField 
                                id="vendor_name"
                                name="vendor_name"
                                value={props.values.vendor_name}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                label="Vendor Name"
                                variant="standard"
                                helperText={ <ErrorMessage name="vendor_name"/>}
                                error={props.touched.vendor_name && Boolean(props.errors.vendor_name) }
                                fullWidth
                            />

                            <TextField 
                                id="vendor_email"
                                type="email"
                                name="vendor_email"
                                value={props.values.vendor_email}
                                // onBlur={props.handleBlur}
                                onBlur={async (e)=> {
                                    props.handleBlur(e) // Keep Formiks default blur
                                    if(e.target.value) {
                                        const exists = await checkEmailExists(e.target.value)
                                        if(exists) {
                                            props.setFieldError("vendor_email","Email is already used. Please use another email")
                                        }
                                         
                                    }
                                  }
                                }
                                onChange={
                                    async (e) =>{
                                        props.handleChange(e)
                                        if(e.target.value) {
                                            const exists = await checkEmailExists(e.target.value) 
                                            if(exists) {
                                                props.setFieldError("vendor_email", "Email is already used")
                                            }
                                            else {
                                                props.setFieldError("vendor_email",undefined)
                                            }
                                        }                                         
                                    }
                                  }
                                label="Vendor Email"
                                variant="standard"
                                helperText={ <ErrorMessage name="vendor_email"/>}
                                error={props.touched.vendor_email && Boolean(props.errors.vendor_email) }
                                fullWidth
                            />

                            <TextField 
                                id="username"
                                name="username"
                                value={props.values.username}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                label="Vendor Username"
                                variant="standard"
                                helperText={ <ErrorMessage name="username"/>}
                                error={props.touched.username && Boolean(props.errors.username) }
                                fullWidth
                            />

                            <TextField 
                                id="password"
                                name="password"
                                type="password"
                                value={props.values.password}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                label="Password"
                                variant="standard"
                                helperText={ <ErrorMessage name="password"/>}
                                error={props.touched.password && Boolean(props.errors.password) }
                                fullWidth
                            />

                            <TextField 
                                id="cnfpassword"
                                name="cnfpassword"
                                type="password"
                                value={props.values.cnfpassword}
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                label="Confirm Password"
                                variant="standard"
                                helperText={ <ErrorMessage name="cnfpassword"/>}
                                error={props.touched.cnfpassword && Boolean(props.errors.cnfpassword) }
                                fullWidth
                            />

                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            >{btnvalue}</Button>
                        </Form>
                    </Box>
                )
            }    
            </Formik>
        </div>
    )
}