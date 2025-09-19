import { ErrorMessage, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { Box, Button,  TextField, Typography } from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"
import { getRegulationTypeById, saveRegulationType, updateRegulationType } from "../../api/RegulationTypeApi" 
import { showToast } from "../SharedComponent/showToast";

export default function RegulationTypeComponent() {

    const [regulation_type_id,setRegulationTypeId] = useState('')
    const [regulation_type,setRegulationType] = useState('')
    const [btnValue,setBtnValue] = useState('Add Regulation Type')

    const {id} =  useParams()
    const navigate = useNavigate()

   useEffect(()=> {
      
        if(id != -1) {
            setBtnValue('Update Regulation Type')
          getRegulationTypeById(id).then((response) => {
                alert(response.data.regulation_type)
                setRegulationTypeId(response.data.regulation_type_id)
                setRegulationType(response.data.regulation_type)
            })
        }
    },[id])


    function validate(values) {
        let errors = {}

        if(values.regulation_type=='') {
            errors.regulation_type = 'Regulation Type Can\'t be Blank '
        }

        return errors
    }

    function onSubmit(values) {

        if(id != -1) {
            let regulationType = {
                regulation_type_id : id,
                regulation_type : values.regulation_type
            }

            updateRegulationType(regulationType).then((response)=> {
                showToast(response.data?.responseMessage,'success')
                navigate(`/regulationtypes`)
            }).catch((error) => {
                showToast(error?.data?.errorMessage,"error")
                navigate(`/regulationtypes`)
            })
        }
        else {            
            let regulationType = {
                regulation_type : values.regulation_type
            }

            saveRegulationType(regulationType).then((response)=> {              
                showToast(response.data?.responseMessage,'success')
                navigate(`/regulationtypes`)
            }).catch((error) => {
                showToast(error?.data?.errorMessage,"error")
                navigate(`/regulationtypes`)
            })
        }
    }

    return(
        <div className="container">
            <Typography variant="h4" gutterBottom > {btnValue} </Typography>
            <Formik 
                initialValues={ { regulation_type_id, regulation_type   } }
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
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
                                value={props.values.regulation_type}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                error={props.touched.regulation_type && Boolean(props.errors.regulation_type) }
                                helperText={<ErrorMessage name="regulation_type" />}
                                fullWidth
                            />

                            <Box className="btnvalue">
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    style={{ float : 'left' }}
                                >
                                  {btnValue}
                                </Button>
                            </Box>
                        </Box>
                    </Form>
                )
            }
        </Formik>
    </div>
   )
}