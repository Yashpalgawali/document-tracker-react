import { useEffect, useState } from "react"
import { getAllRegulationTypes } from "../../api/RegulationTypeApi"
import { useNavigate, useParams } from "react-router-dom"
import { getRegulationById } from "../../api/RegulationApi" 
import { alertTitleClasses, Box, Button, FormHelperText, TextField, Typography } from "@mui/material"
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

    function getNextRenewalDate(issued_date,setFieldValue) {
        
        let frequency = sessionStorage.getItem('frequency')
        
        // Convert to dayjs object
        const nextRenewalDate = dayjs(issued_date, "DD-MM-YYYY");
        let cur_date = nextRenewalDate.date()
        let cur_month = nextRenewalDate.month()+1
        let cur_year = nextRenewalDate.year()

        if(frequency==1) {

            if(cur_month == 12) {
                // let newDate = String(cur_date).padStart(2,"0")+"-"+String("1").padStart(2,"0")+"-"+(cur_year+1)
                let newDate = setNextRenewalDateFunction(cur_date,("1"),(cur_year+1))
                setFieldValue("next_renewal_date",newDate)                
            }
            else {
              
                let current_month_days = returnDaysOfMonth(cur_month,cur_year)
                let next_month_days = returnDaysOfMonth((cur_month+1),cur_year)                
                  
                if(next_month_days < current_month_days ) {
                         
                    if(cur_date > next_month_days) {
                        let diff = cur_date - next_month_days
                        alert('difference is '+diff)
                        // let newDate = String(diff).padStart(2,"0")+"-"+String(cur_month+2).padStart(2,"0")+"-"+(cur_year)
                        let newDate = setNextRenewalDateFunction(diff,(cur_month+2),cur_year)
                        setFieldValue("next_renewal_date",newDate)    
                    }
                    else {
                          //let newDate = String(cur_date).padStart(2,"0")+"-"+String(cur_month+1).padStart(2,"0")+"-"+(cur_year)
                          let newDate = setNextRenewalDateFunction(cur_date,(cur_month+1),cur_year)
                          setFieldValue("next_renewal_date",newDate)  
                    }
                }
                else {
                      //let newDate = String(cur_date).padStart(2,"0")+"-"+String(cur_month+1).padStart(2,"0")+"-"+(cur_year)
                      let newDate = setNextRenewalDateFunction(cur_date,(cur_month+1),cur_year)
                      setFieldValue("next_renewal_date",newDate)    
                }
            }

        }

        if(frequency == 3) {

            let next_year = cur_year + 1

            let currentYearDays = returnDaysOfMonth(cur_month,cur_year)
            let nextYearDays = returnDaysOfMonth(cur_month,next_year)
            
            if(nextYearDays < currentYearDays) {

                let diff = currentYearDays - nextYearDays

                if(cur_date > nextYearDays) {
                    //let newDate = String(diff).padStart(2,"0")+"-"+String(cur_month+1).padStart(2,"0")+"-"+(next_year)
                    let newDate = setNextRenewalDateFunction(cur_date,(cur_month+1),cur_year)
                    setFieldValue("next_renewal_date",newDate)
                }
                else {
                    //let newDate = String(cur_date).padStart(2,"0")+"-"+String(cur_month).padStart(2,"0")+"-"+(next_year)                
                    let newDate = setNextRenewalDateFunction(cur_date,(cur_month),cur_year)
                    setFieldValue("next_renewal_date",newDate)
                }
                
            }
            else {
                //let newDate = String(cur_date).padStart(2,"0")+"-"+String(cur_month).padStart(2,"0")+"-"+(next_year)
                let newDate = setNextRenewalDateFunction(cur_date,(cur_month),cur_year)
                setFieldValue("next_renewal_date",newDate)
            }            
        }

        if(frequency == 2) {
            let current_month_days = returnDaysOfMonth(cur_month,cur_year)
            let next_month_days = ""

            if(cur_month==10 ) {
                next_month_days = returnDaysOfMonth(("1"),(cur_year+1))
                let newDate = setNextRenewalDateFunction(cur_date,(cur_month+3),cur_year)
                //let newDate = String(cur_date).padStart(2,"0")+"-"+String(cur_month+3).padStart(2,"0")+"-"+(cur_year)
                setFieldValue("next_renewal_date",newDate)
            }
            if(cur_month==11 ) {
                next_month_days = returnDaysOfMonth(("2"),(cur_year+1))
                let newDate = setNextRenewalDateFunction(cur_date,(cur_month+3),cur_year)
                setFieldValue("next_renewal_date",newDate)
            }
            if(cur_month==12 ) {
                next_month_days = returnDaysOfMonth(("3"),(cur_year+1))
                let newDate = setNextRenewalDateFunction(cur_date,(cur_month+3),cur_year)
                setFieldValue("next_renewal_date",newDate)
            }
           
            else {
                next_month_days = returnDaysOfMonth((cur_month+3),(cur_year))

                 if(next_month_days < current_month_days ) {
                    if(cur_date > next_month_days) {
                        let diff = cur_date - next_month_days
                        let newDate = setNextRenewalDateFunction(cur_date,(cur_month+4),cur_year)
                        setFieldValue("next_renewal_date",newDate)
                    }
                    else {
                        let newDate = setNextRenewalDateFunction(cur_date,(cur_month+3),cur_year)
                        setFieldValue("next_renewal_date",newDate)
                    }
                 }
                  else {
                        let newDate = setNextRenewalDateFunction(cur_date,(cur_month+3),cur_year)
                        setFieldValue("next_renewal_date",newDate)
                    }
            }            
        }
    }

    function setNextRenewalDateFunction(date,month,year) {
        alert('function called')
       return String(date).padStart(2,"0")+"-"+String(month).padStart(2,"0")+"-"+(year)
    }

    function returnDaysOfMonth(month,year) {
        const daysInMonth = dayjs(`${year}-${String(month).padStart(2, "0") }-01`).daysInMonth()
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
                                   regulation_issued_date : regulation_issued_date ? dayjs(regulation_issued_date) : "",
                                   next_renewal_date : next_renewal_date ? dayjs(next_renewal_date) : "",
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
                                    value={values.regulation_issued_date ? dayjs(values.regulation_issued_date,"DD-MM-YYYY") : null}
                                    onChange={(date) => 
                                        {   
                                            const formatted_date = date ? date .format("DD-MM-YYYY") : ""
                                            setFieldValue('regulation_issued_date', formatted_date)
                                            alert('date changed')
                                            getNextRenewalDate(formatted_date,setFieldValue)
                                             
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
                                    value={
                                            values.next_renewal_date ? dayjs(values.next_renewal_date,"DD-MM-YYYY") : null
                                        }
                                    onChange={(date) => setFieldValue('next_renewal_date', date ? date.format("DD-MM-YYYY") : "" )}
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