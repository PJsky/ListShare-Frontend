import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const Register = () => {
    
    return(
        <>
            <div className="mainpage-container">
                <h2>Register</h2>
                <Formik
                initialValues={{ email:'', password:'', password_confirmation:'' }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    console.log("Logging");
                    }, 400);
                }}
                >
                {({ isSubmitting, errors }) => (
                    <Form>
                    <label for="email" className="">Email</label>
                    <Field type="text" name="email" className="" id="email"/>
                    <ErrorMessage name="email" component="div" />
                    <label for="password" className="">Password</label>
                    <Field type="password" name="password" className="" id="password"/>
                    <ErrorMessage name="password" component="div" />
                    <label for="password" className="sign-up-page-label">Password confirmation</label>
                    <Field type="password" name="password_confirmation" className="sign-up-page-input" id="password"/>
                    <ErrorMessage name="password_confirmation" component="div" />

                    {/* <Link to="/content"> */}
                        <button type="submit" disabled={isSubmitting} className="">
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

export default Register;
