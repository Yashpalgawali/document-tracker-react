import { ErrorMessage, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useParams } from "react-router-dom"

export default function RegulationTypeComponent(){

    const [regulation_type_id,setRegulationTypeId] = useState('')
    const [regulation_type,setRegulationType] = useState('')
    const [btnValue,setBtnValue] = useState('Add Regulation Type')

    const id = useParams()

    useEffect(()=>{
        if(id != -1) {
            setBtnValue('Update Regulation Type')
        }
    },[id])


    function validate(values) {

    }

    function onSubmit() {

    }

    return(
        <div className="container">
            <Formik 
                initialValues={ { regulation_type_id, regulation_type } }
                enableReinitialize={true}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
            {
                (props)=>(
                    <Form>
                        <Box
                               sx={{ '& > :not(style)': { m: 1, width: '100ch' } }}
                                noValidate
                                autoComplete="off"
                        >
                            <TextField
                                id="regulation_type"
                                name="regulation_type"
                                variant="standard"
                                label="Regulation Type"
                                values={props.values.regulation_type}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                error={props.touched.regulation_type && Boolean(props.errors.regulation_type) }
                                helperText={<ErrorMessage name="regulation_type" />}
                                fullWidth
                            >

                            </TextField>                             
                        </Box>
                        <Box>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={{ float : 'left' }}
                        >
                        </Button>
                        </Box>

                    </Form>
                )
            }
                 
            </Formik>
        </div>
    )
}