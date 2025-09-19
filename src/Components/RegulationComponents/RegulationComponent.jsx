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
            })
        }

    },[])

    return(
        <div className="container">
            <Box>
                <Typography variant="h4" gutterBottom>{btnValue}</Typography>
            </Box>

            <Formik
                initialValues={ { regulation_name , regulation_description, regulation_type : regulation_type ? regulation_type : null } }
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
                            value={props.values.regulation_name}
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
                            styles={customStyles}                                     
                            name="regulation_type"
                            options={trainingList.map(training => ({
                                value: training.training_id,
                                label: training.training_name
                            }))}
                            value={
                                trainingList
                                    .map(training => ({ value: training.training_id, label: training.training_name }))
                                    .find(option => option.value === values.training_ids) || null
                            }
                                onChange={(option) => setFieldValue('training_ids', option ? option.value : '')}
                                placeholder="Select Training"
                        /> 

                    <FormHelperText error={touched.training_ids && Boolean(errors.training_ids)}>
                    <ErrorMessage name="training_ids" />
                    </FormHelperText>  
                    </Form>
                )
            }    

            </Formik>
        </div>
    )
}