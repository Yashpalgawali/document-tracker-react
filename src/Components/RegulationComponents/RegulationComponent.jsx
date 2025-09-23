import { useEffect, useState } from "react"
import { getAllRegulationTypes } from "../../api/RegulationTypeApi"
import { useNavigate, useParams } from "react-router-dom"
import { getRegulationById } from "../../api/RegulationApi" 
import { Box, Button, FormHelperText, TextField, Typography } from "@mui/material"
import { ErrorMessage, Form, Formik } from "formik"

import Select from 'react-select';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import isLeapYear from "dayjs/plugin/isLeapYear";

export default function RegulationComponent() {

    const [regulationTypeList, setRegulationTypeList] = useState([])
    const [regulation_name,setRegulationName] = useState('')
    const [regulation_description,setRegulationDescription] = useState('')
    const [regulation_type,setRegulationType] = useState('')
    const [next_renewal_date,setNextRenewalDate] = useState('')
    const [regulation_issued_date, setRegulationIssuedDate] = useState('')
    const [regulation_frequency, setRegulationFrequency] = useState('')
    
    const [regulation_frequency_list] = useState( [
        {frequency : "1" , frequency_type : "Monthly"},
        {frequency : "2" , frequency_type : "Quarterly"},
        {frequency : "3" , frequency_type : "Yearly"}
    ])

    const [btnValue,setBtnValue] = useState('Add Regulation')

    const {id} = useParams()

    const navigate = useNavigate()

    function validate(values) {
        let errors = { }

        if(values.regulation_name=='') {
            errors.regulation_name = 'Regulation Name can\'t be Blank'
        }

        if(values.regulation_description=='') {
            errors.regulation_description = 'Regulation Description can\'t be Blank'
        }

        if(values.regulation_issued_date==null) {
            errors.regulation_issued_date = 'Regulation Issued date can\'t be null'
        }
        
        return errors
    }

    function onSubmit(values) {
        let formatted_reg_date = dayjs(values.regulation_issued_date).format('DD-MM-YYYY')
        let formatted_next_date = dayjs(values.next_renewal_date ).format('DD-MM-YYYY')

        if(values.frequency) {
            alert(values.frequency)
        }

        let regulation_object = {

        }
        console.log('Regulation Object',values)
    }

    const customStyles = {
        menu : (provided) => ({
            ...provided,
            backgroundColor : 'white',
            zIndex : 9999
        }),
        option : ((provided,state) => ({
            ...provided,
            backgroundColor : state.isFocused ? "#f0f0f0" : "White", // hover effect
            color : "black"
        }))
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
    }, [id])

    function getNextRenewalDate(issued_date) {
        setNextRenewalDate('')

        let frequency_duration = sessionStorage.getItem('frequency')
        let formatted_issued_date = dayjs(issued_date).format('DD-MM-YYYY')

        const d = dayjs(issued_date)
        
        let [date,month,year] = [d.date(), d.month()+1, d.year() ]
        
        // if(date<=9) {
        //     date = "0"+date
        // }
        // if(month<=9) {
        //     month ="0"+month
        // }
        
        let leapyear =  false
        if(year % 400 == 0 || ( year % 4 ===0 && year % 100 !=0) ) {
            leapyear = true
        }

        
        alert('date = '+date+"\n Month "+month+"\n Year "+year)
        if(frequency_duration == 1 ) {

            if(month==12) {

                alert('Next Year date is '+date+'-01-'+(year+1))
                setNextRenewalDate(date+'-'+'01'+'-'+(year+1))

            }

            else {
                let current_month_days = returnDaysOfMonth(month,year)
                let next_month_days = returnDaysOfMonth((month+1),year)
               
                if(current_month_days>=next_month_days) {
                    setNextRenewalDate(date+'-'+(month+1)+'-'+year)
                }
            }
             
            
        }
      

    }

    function returnDaysOfMonth(month,year) {
        const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth()
        return daysInMonth
    }

    return (
        <div className="container">
            <Box>
                <Typography variant="h4" gutterBottom>{btnValue}</Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Formik
                initialValues= { { regulation_name , regulation_description, 
                                   regulation_type : regulation_type ? regulation_type : null,
                                   regulation_issued_date : regulation_issued_date ? dayjs(regulation_issued_date) : null,
                                   next_renewal_date : next_renewal_date ? dayjs(next_renewal_date) : null,
                                   regulation_frequency :regulation_frequency ? regulation_frequency : null
                                } }
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
                                styles={customStyles}                           
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
                                onChange={(option) => {
                                    setFieldValue('regulation_type', option ? option.value : '')
                                     
                                }}
                                placeholder="Select Regulation Type"
                                
                            />                                
                            <FormHelperText error={touched.regulation_type && Boolean(errors.regulation_type)}>
                            <ErrorMessage name="regulation_type" />
                            </FormHelperText>

                         <Select
                                hideSelectedOptions={true}
                                styles={customStyles}
                                name="regulation_frequency"
                                options={regulation_frequency_list.map(frequency => ({
                                    value: frequency.frequency,
                                    label: frequency.frequency_type
                                }))}
                                value = {
                                    regulation_frequency_list
                                    .map(frequency => ({ value: frequency.frequency, label: frequency.frequency_type }))
                                    .find(option => option.value === values.frequency) || null
                                }
                                onChange= {(option) => {
                                            setFieldValue('frequency', option ? option.value : '')
                                            sessionStorage.setItem('frequency',option.value)
                                        }}
                                placeholder="Select Regulation Frequency"
                                
                            />                                
                            <FormHelperText error={touched.regulation_frequency && Boolean(errors.regulation_frequency)}>
                            <ErrorMessage name="regulation_frequency" />
                            </FormHelperText>
                        
                        <Box m={2} sx={{ justifyContent : 'start' , marginLeft : '131px !important'} }  >

                                <DatePicker
                                    sx={ {  width : '40ch'} }
                                    format="DD-MM-YYYY"
                                    label="Regulation Issue Date"
                                    value={values.regulation_issued_date}
                                    onChange={(date) => 
                                        {
                                            setFieldValue('regulation_issued_date', date)
                                            
                                            getNextRenewalDate(date)
                                        }
                                    }
                                    slotProps={{
                                    textField: { 
                                        error: touched.regulation_issued_date && Boolean(errors.regulation_issued_date),
                                        helperText: <ErrorMessage name="regulation_issued_date"  />
                                    }
                                    }}
                                />
                                <DatePicker
                                    sx={ { marginRight : '5px' ,width : '40ch'} }
                                    format="DD-MM-YYYY"
                                    label="Next Renewal Date"
                                    value={values.next_renewal_date}
                                    onChange={(date) => setFieldValue('next_renewal_date', date)}
                                    slotProps={{
                                    textField: { 
                                        error: touched.next_renewal_date && Boolean(errors.next_renewal_date),
                                        helperText: <ErrorMessage name="next_renewal_date" />
                                    }
                                    }}
                                />
                         </Box>
                       <Box>
                            <Button variant="contained" color="primary" type="submit">{btnValue}</Button>
                       </Box>
                    </Form>
                )
            }    

            </Formik>
          </LocalizationProvider>
        </div>
    )
}