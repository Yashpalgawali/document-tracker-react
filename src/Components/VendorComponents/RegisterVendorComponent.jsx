import { Box, Button, FormHelperText, TextField, Typography } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { getVendorById, registerVendor, updateVendor } from "../../api/VendorApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Select from 'react-select';

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
    const [enabled,setEnabled] = useState(1)
    const [enabledList,setEnabledList] = useState([])
    const [oldPassword,setOldPassword] = useState('')

    const [isActive,setIsActive] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const [btnvalue,setBtnValue] = useState('Register Vendor')
    
    const {id} = useParams()

    useEffect(() => {
        if(id == -1 ) {
            setBtnValue('Add Vendor')
        }
        if(id != -1 && id != undefined) {
            setBtnValue('Update Vendor')
            getVendorById(id).then((response) => {
                console.log(response.data)
                setVendorName(response.data.vendor_name)
                setVendorEmail(response.data.vendor_email)
                setEnabled(response.data.enabled)
                setUsername(response.data.username)
                setOldPassword(response.data.password)
                setPassword(response.data.password)
                if(response.data.enabled == 1) {
                    setIsActive(true)
                }
                setEnabledList([
                    { enabled : 1, status : 'Active' },
                    { enabled : 2, status : 'InActive' }
                ])
            })
        }
        
    }, [])
 
    function validate(values) {
        let errors= {}

        if(values.vendor_name=='') {
            errors.vendor_name = 'Vendor Name Can\'t be blank'
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

        var vendor = {
                vendor_name : values.vendor_name,
                vendor_email : values.vendor_email,
                username : values.username,
                password : oldPassword
        }
        
        // if(values.password == '')
        // {
        //     var vendor = {
        //     vendor_name : values.vendor_name,
        //     vendor_email : values.vendor_email,
        //     username : values.username,
        //     password : oldPassword
        //    }    
        // }
        // else {
        //     var vendor = {
        //         vendor_name : values.vendor_name,
        //         vendor_email : values.vendor_email,
        //         username : values.username,
        //         password : values.password
        //     }
        // }
        
        vendor = {...vendor , vendor_id : id} 
        
        console.log('Vendor Object is ',vendor)

        // if(id == -1)
        // {
            
        //     registerVendor(vendor).then((response)=> {              
        //             showToast(response.data?.responseMessage,'success')
        //             navigate(`/viewvendors`)
        //         }).catch((error) => {
        //             showToast(error?.data?.errorMessage,"error")
        //             navigate(`/viewvendors`)
        //         })
        // }
        // else {
        //     vendor = {...vendor , vendor_id : id} 
        //      updateVendor(vendor).then((response)=> {              
        //             showToast(response.data?.responseMessage,'success')
        //             navigate(`/viewvendors`)
        //         }).catch((error) => {
        //             showToast(error?.data?.errorMessage,"error")
        //             navigate(`/viewvendors`)
        //         })
        // }

    }

    return(
        <div className="container">
            <Box>
                <Typography variant="h4" gutterBottom>{btnvalue}</Typography>
            </Box>
            <Formik
                initialValues={ { vendor_name ,vendor_email,vendor_id , password , username ,cnfpassword, enabled }}
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
                  ({ setFieldValue, setFieldError, values, handleChange, handleBlur,  touched, errors }) => (
                    <Box>
                        <Form>
                            <TextField 
                                id="vendor_name"
                                name="vendor_name"
                                value={values.vendor_name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Vendor Name"
                                variant="standard"
                                helperText={ <ErrorMessage name="vendor_name"/>}
                                error={touched.vendor_name && Boolean(errors.vendor_name) }
                                fullWidth
                            />

                            <TextField 
                                id="vendor_email"
                                type="email"
                                name="vendor_email"
                                value={values.vendor_email}
                                onBlur={async (e)=> {
                                    handleBlur(e) // Keep Formiks default blur
                                    if(e.target.value) {
                                        const exists = await checkEmailExists(e.target.value)
                                        if(exists) {
                                            setFieldError("vendor_email","Email is already used. Please use another email")
                                        }
                                    }
                                  }
                                }
                                onChange={
                                    async (e) => {
                                        handleChange(e)
                                        if(e.target.value) {
                                            const exists = await checkEmailExists(e.target.value) 
                                            if(exists) {
                                                setFieldError("vendor_email", "Email is already used")
                                            }
                                            else {
                                                setFieldError("vendor_email",undefined)
                                            }
                                        }                                         
                                    }
                                  }
                                label="Vendor Email"
                                variant="standard"
                                helperText={ <ErrorMessage name="vendor_email"/>}
                                error={touched.vendor_email && Boolean(errors.vendor_email) }
                                fullWidth
                            />

                            <TextField
                                id="username"
                                name="username"
                                value={values.username}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Vendor Username"
                                variant="standard"
                                helperText={ <ErrorMessage name="username"/>}
                                error={touched.username && Boolean(errors.username) }
                                fullWidth
                            />

                            <TextField 
                                id="password"
                                name="password"
                                type="password"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Password"
                                variant="standard"
                                helperText={ <ErrorMessage name="password"/>}
                                error={touched.password && Boolean(errors.password) }
                                fullWidth
                            />

                            <TextField 
                                id="cnfpassword"
                                name="cnfpassword"
                                type="password"
                                value={values.cnfpassword}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Confirm Password"
                                variant="standard"
                                helperText={ <ErrorMessage name="cnfpassword"/>}
                                error={touched.cnfpassword && Boolean(errors.cnfpassword) }
                                fullWidth
                            />
                            {
                                isActive &&  
                                <>
                                   <Select
                                                                 
                                        hideSelectedOptions={true}
                                                                        
                                        name="enabled"
                                        options={enabledList.map(enb => ({
                                            value: enb.enabled,
                                            label: enb.status
                                        }))}
                                        value= {
                                            enabledList
                                            .map(enb => ({ value: enb.enabled, label: enb.status }))
                                            .find(option => option.value === values.enabled) || null
                                        }
                                        onChange={(option) => setFieldValue('enabled', option ? option.value : '')}
                                        placeholder="Select Vendor Status"
                                        
                                    />                                
                                    <FormHelperText error={touched.enabled && Boolean(errors.enabled)}>
                                    <ErrorMessage name="enabled" />
                                    </FormHelperText>
                                                         
                              </>
                            }
                            <Box>
                                <Button
                                sx={ { mt : '5px'} }
                                type="submit"
                                variant="contained"
                                color="primary"
                                >{btnvalue}</Button>
                            </Box>
                        </Form>
                    </Box>
                )
            }    
            </Formik>
        </div>
    )
}