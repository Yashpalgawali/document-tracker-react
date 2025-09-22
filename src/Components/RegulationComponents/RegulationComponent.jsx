import { useEffect, useState } from "react"
import { getAllRegulationTypes } from "../../api/RegulationTypeApi"
import { useNavigate, useParams } from "react-router-dom"
import { getRegulationById } from "../../api/RegulationApi" 
import { Box, FormHelperText, TextField, Typography } from "@mui/material"
import { ErrorMessage, Form, Formik } from "formik"

import Select from 'react-select';

export default function RegulationComponent() {

    const [regulationTypeList, setRegulationTypeList] = useState([])
    const [regulation_name,setRegulationName] = useState('')
    const [regulation_description,setRegulationDescription] = useState('')
    const [regulation_type,setRegulationType] = useState('')

    const [btnValue,setBtnValue] = useState('Add Regulation')

    const {id} = useParams()

    const navigate = useNavigate()

    function validate(values) {
        let errors = { }

        if(values.regulation_name=='') {
            errors.regulation_name = 'Regulation Name can\'t be blank'
        }

        return errors
    }

    function onSubmit(values) {

    }


    useEffect(() => {

        getAllRegulationTypes().then((response) => {
            setRegulationTypeList(response.data)
        })

        if(id != -1) {
            setBtnValue('Update Regulation')
            getRegulationById(id).then((response) => {
                setRegulationName(response.data.regulation_name)
                setRegulationDescription(response.data.regulation_description)
            })
        }
    }, [])

    return (
        <div className="container">
            <Box>
                <Typography variant="h4" gutterBottom>{btnValue}</Typography>
            </Box>
            <Formik
                initialValues= { { regulation_name , regulation_description, regulation_type : regulation_type ? regulation_type : null } }
                enableReinitialize={true}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
            {
                ({ setFieldValue, values, handleChange, handleBlur,  touched, errors }) => (
                    <Form>
                        <TextField
                            variant="standard"
                            id="regulation_name"
                            name="regulation_name"
                            value={values.regulation_name}
                            label="Regulation Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.regulation_name && Boolean(errors.regulation_name) }
                            helperText={<ErrorMessage name="regulation_name" />}
                            fullWidth
                        />

                        <TextField
                            variant="standard"
                            id="regulation_description"
                            name="regulation_description"
                            value={values.regulation_description}
                            label="Regulation Description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.regulation_description && Boolean(errors.regulation_description) }
                            helperText={<ErrorMessage name="regulation_description" />}
                            fullWidth
                        />

                        <Select
                               
                                hideSelectedOptions={true}
                                                               
                                name="regulation_type"
                                options={regulationTypeList.map(regtype => ({
                                    value: regtype.regulation_type_id,
                                    label: regtype.regulation_type
                                }))}
                                value= {
                                    regulationTypeList
                                    .map(regtype => ({ value: regtype.regulation_type_id, label: regtype.regulation_type }))
                                    .find(option => option.value === values.regulation_type) || null
                                }
                                onChange={(option) => setFieldValue('regulation_type', option ? option.value : '')}
                                placeholder="Select Regulation Type"
                                
                            />                                
                            <FormHelperText error={touched.regulation_type && Boolean(errors.regulation_type)}>
                            <ErrorMessage name="regulation_type" />
                            </FormHelperText>
                       
                    </Form>
                )
            }    

            </Formik>
        </div>
    )
}