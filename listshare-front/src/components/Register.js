import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const register = () => {
    
    return(
        <>
            <div className="register-container">
                <h2>Register</h2>
                <Formik
                initialValues={{ email:'', password:'', passwordConfirmation:'' }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log( values['email']);
                    
                    axios.post(global.BACKEND + "/api/users/register", {
                        "email": values["email"],
                        "password": values["password"]
                    }).then( ({data}) => {
                        console.log(data);
                    }).catch( (error) => {
                        console.log(error.response);
                    }) 
                }}
                >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <label for="email" className="register-email-label">Email:</label>
                        <Field type="text" name="email" className="register-email-input" id="email"/>
                    <ErrorMessage name="email" component="div" />
                        <label for="password" className="register-password-label">Password:</label>
                        <Field type="password" name="password" className="register-password-input" id="password"/>
                    <ErrorMessage name="password" component="div" />
                        <label for="passwordConfirmation" className="register-password-label">Password confirmation:</label>
                        <Field type="password" name="passwordConfirmation" className="register-password-input" id="passwordConfirmation"/>
                    <ErrorMessage name="passwordConfirmation" component="div" />
                    {/* <Link to="/content"> */}
                        <button type="submit" disabled={isSubmitting} className="register-button">
                            Submit
                        </button>
                    {/* </Link> */}
                    </Form>
                )}
                </Formik>
            </div>
        </>
    )
}

export default register;
