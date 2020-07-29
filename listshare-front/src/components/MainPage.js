import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const Nav = () => {
    
    return(
        <>
            <div className="mainpage-container">
                {/* <h1>Hello!</h1> */}
                <h2>Search for a list</h2>
                <Formik
                initialValues={{ searchList:'' }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log("searching for a list")
                    }, 400);
                }}
                >
                {({ isSubmitting }) => (
                    <Form>
                    <Field type="text" name="searchList" className=""/>
                    <ErrorMessage name="searchList" component="div" />
                    <button type="submit" disabled={isSubmitting} className="">
                        Search
                    </button>
                    </Form>
                )}
                </Formik>
                <p>or</p>
                <button className="create-list-button">Create List</button>
            </div>
        </>
    )
}

export default Nav;
