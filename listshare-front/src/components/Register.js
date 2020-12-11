import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { user_log_in, user_log_out } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import registerSchema from '../validation/registerSchema';

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isDataInvalid,setIsDataInvalid] = useState(false);
    const [registerError,setRegisterError] = useState(false);
     
    return(
        <>
            <div className="register-container">
                <h2>Register</h2>
                <Formik
                initialValues={{ email:'', password:'', passwordConfirmation:'' }}
                validationSchema={registerSchema}
                onSubmit={(values, { setSubmitting }) => {                    
                    axios.post(global.BACKEND + "/api/users/register", {
                        "email": values["email"],
                        "password": values["password"]
                    }).then( ({data}) => {
                        window.localStorage.setItem("AccessToken", data.token);
                        dispatch(user_log_in());
                        history.push("/");
                    }).catch( (error) => {
                        try{
                            if(error.response.data)
                                setRegisterError(error.response.data[0].toUpperCase() + error.response.data.slice(1));
                            else
                                setRegisterError("Something went wrong");
                            setIsDataInvalid(true);
                        }catch{}
                    }) 
                }}
                >
                {({ isSubmitting }) => (
                    <Form onChange={()=>{setIsDataInvalid(false)}}>
                        <label for="email" className="register-email-label">Email:</label>
                        <Field type="text" name="email" className="register-email-input" id="email"/>
                    <ErrorMessage name="email" component="div" />
                        <label for="password" className="register-password-label">Password:</label>
                        <Field type="password" name="password" className="register-password-input" id="password"/>
                    <ErrorMessage name="password" component="div" />
                        <label for="passwordConfirmation" className="register-password-label">Password confirmation:</label>
                        <Field type="password" name="passwordConfirmation" className="register-password-input" id="passwordConfirmation"/>
                    <ErrorMessage name="passwordConfirmation" component="div" />
                        <button type="submit" disabled={isSubmitting} className="register-button">
                            Submit
                        </button>
                <div className={isDataInvalid?"form-error":"hidden-class"}>{registerError}</div>
                    </Form>
                )}
                </Formik>
            </div>
        </>
    )
}

export default Register;
