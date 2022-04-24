import React, { useState, useRef,  } from 'react'
import TextField from './TextField';
import SimpleReactValidator from 'simple-react-validator';
import {Service} from './../service';
import { ToastContainer, toast } from 'react-toastify'
import { Container, Row, Col } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';

function FormComponent() {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);   
    const simpleValidator = useRef(new SimpleReactValidator({
        autoForceUpdate: this,
        validators: {
            apostrophe: {
                message: " 1 uppercase and 1 special and 1 number min length 6 :attribute",
                rule: (val, params, validator) => {
                  return (
                    validator.helpers.testRegex(val, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{6,}$/) &&
                    params.indexOf(val) === -1
                  );
                },
                required: true,
              }
        }
    }))
    const [selectedform, setselectedform] = useState('fan')
    const [data, setdata] = useState()
    const [url] = useState('')
    const [agree, setagree] = useState(false)
    const [Formchoices] = useState( [
        { label: 'FAN SIGNUP ', value: 'fan' },
        { label: 'TALENT SIGNUP', value: 'talent' }
      ])
    const [loader, setloader] = useState(false)
    const InputChange = (e) => {
        const {name, value} = e?.target
        setdata({...data,[name]:value})
    }

    const handleRadioChange = (e) => {
        setselectedform(e?.target?.value)
    }
    const CheckBoxChange = (e) => {
        setagree(e?.target?.checked)
    }

    const SubmitFormComponent = async(e) => {
        e.preventDefault()
        setloader(true)
        if(simpleValidator?.current?.allValid()){
            let formdata = {
                alldata: data,
                formtype:selectedform
            }
            await Service.SignupForm(formdata).then((res) => {
                toast.success(res?.statusText)
                setdata({first_name:'', last_name:'', username:'', email:'', password:''})
            });
            setloader(false)
        }else{
            simpleValidator?.current?.showMessages()
            forceUpdate()
            setloader(false)
        }
    }

  return (
      <Container>
           <Row className='justify-content-center'>
                <Col  md="8" lg="4">
                    <div className='main_content'>
                        <div className='form_section'>
                            <form onSubmit={(e) => SubmitFormComponent(e)} >
                                <div className='text_center'>
                                    <div className='tab_wrap'>
                                        {
                                            Formchoices?.map((form , i) => {
                                                return (
                                                    <label htmlFor={form?.value} key={i}>
                                                        <input type="radio" name='formtype' id={form?.value} value={form?.value} onChange={(e) => handleRadioChange(e)} checked={selectedform=== form?.value} /> 
                                                        <span>{form?.label}</span>
                                                    </label>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                </div>
                                <div className='formdata'>
                                    <TextField name="first_name" type="text" label="First Name:" value={data?.first_name} handleChange={InputChange} placeholder="Enter First Name " error = {simpleValidator.current.message('First Name', data?.first_name, 'required')} />
                                    <TextField name="last_name" type="text" label="Last Name:" value={data?.last_name} handleChange={InputChange} placeholder="Enter Last Name " error = {simpleValidator.current.message('Last Name', data?.last_name, 'required')} />
                                    <TextField name="username" type="text" label="User Name:" value={data?.username} handleChange={InputChange} placeholder="User Name" error = {simpleValidator.current.message('User Name', data?.username, 'required')} />
                                    <TextField name="email" type="text" label="Email:" value={data?.email} handleChange={InputChange} placeholder="Email" error = {simpleValidator.current.message('Email', data?.email, 'required|email')} />
                                    <TextField name="password" type="password" label="password:" value={data?.password} handleChange={InputChange} placeholder="Password" error = {simpleValidator.current.message('Password', data?.password, 'required|apostrophe')} />

                                    <FormGroup className='text-center'>
                                        <Label>
                                            <Input type="checkbox" name='agree' value={agree} onChange={(e) => CheckBoxChange(e)} />{' '}
                                                I agree too the
                                            <a href={url}> Tearm and Condition </a>
                                        </Label>
                                            {simpleValidator.current.message('Tearm and Condition', agree, 'accepted')}
                                    </FormGroup>
                                    <div className='text-center'>
                                        <button type='submit'>SIGN UP</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>   
                </Col>
           </Row>
            <ToastContainer autoClose={1000}/> 
    {
         loader && <span className='overlay'> <img src='/loader.gif' alt='loader' width="80" height="80" /> </span>
    }
    </Container>
  )
}

export default FormComponent