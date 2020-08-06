import React, { Component, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import axios from "axios";
import { useHistory } from "react-router-dom";
import listPasswordSchema from "../../validation/listPasswordSchema";

const CreateListModal = ({ show, setIsCreateModalActive }) => {
    const history = useHistory();
    const showHideClassName = show ? "createListModal display-block" : "createListModal display-none";
    const [isPublic, setIsPublic] = useState(true);

    return (
      <div className={showHideClassName} onClick={(e)=>{
        if(e.target.classList[0] == "createListModal")setIsCreateModalActive(false);
      }}>
        <section className="createListModal-main">
          <p className="createListModal-paragraph">Please enter list name:</p>
          <Formik
                initialValues={{ listName:'', listPassword:'' }}
                validationSchema={!isPublic?listPasswordSchema:null}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post(global.BACKEND + "/api/itemLists", {
                        isPublic: isPublic,
                        Name: values["listName"],
                        ListPassword: isPublic? null : values['listPassword']
                    }).then(({data}) =>{
                        let listLink = data.accessCode.split('').filter(x=>x!="#").join('');
                        history.push("/"+listLink)

                    }).catch((error)=>{
                        alert(error.response.data);
                    })
                    setSubmitting(false);
                }}
                >
                {({ isSubmitting }) => (
                    <>
                    <Form>
                        <div className="upper-form">
                            <Field type="text" name="listName" className="createListModal-input"/>
                            <ErrorMessage name="listName" component="div" />
                            
                            <button type="submit" disabled={isSubmitting} className="createListModal-submit-button">
                                Submit
                            </button>
                        </div>
                        <div className="createListModal-type">
                            <div className={isPublic?"createListModal-public createListModal-public-highlighted":"createListModal-public"}
                            onClick={()=>setIsPublic(true)}>PUBLIC</div>
                            <div className={!isPublic?"createListModal-private createListModal-private-highlighted":"createListModal-private"}
                            onClick={()=>setIsPublic(false)}>PRIVATE</div>
                        </div>
                            <label for="listPassword" className={!isPublic?"createListModal-password-label":"hidden-class"}>Password:</label>
                        <div className={!isPublic?"upper-form":"hidden-class"}>
                            <Field type="password" name="listPassword" className="createListModal-password-input"/>
                        </div>
                    </Form>
                            <ErrorMessage name="listPassword" component="div" />
                    </>
                )}
                </Formik>
        </section>
      </div>
    );
  };

  export default CreateListModal;