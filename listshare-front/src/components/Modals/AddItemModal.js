import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import axios from "axios";

const AddItemModal = ({ show, listAccessCode, listPassword, setIsAddModalActive, setListItems, listItems }) => {
    const showHideClassName = show ? "addItemModal display-block" : "addItemModal display-none";
  
    return (
      <div className={showHideClassName} onMouseDown={(e)=>{
        if(e.target.classList[0] == "addItemModal")setIsAddModalActive(false);
      }}>
        <section className="addItemModal-main">
          <p className="addItemModal-paragraph">Please enter item name:</p>
          <Formik
                initialValues={{ itemName:'' }}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post(global.BACKEND + "/api/items", {
                        "Name": values["itemName"],
                        "ListAccessCode": "#"+listAccessCode,
                        "ListPassword": listPassword,
                    }).then(({data}) =>{
                        console.log(data);
                        setSubmitting(false);
                        setListItems([...listItems, {
                            name: values["itemName"],
                            IsDone: false,
                            id: data.itemId
                        }]);
                        setIsAddModalActive(false);
                    })
                    
                    
                    // setTimeout(() => {
                    //     console.log(values["itemName"])
                    // }, 400);
                }}
                >
                {({ isSubmitting }) => (
                    <Form>
                    <Field type="text" name="itemName" className="addItemModal-input"/>
                    <ErrorMessage name="itemName" component="div" />
                    <button type="submit" disabled={isSubmitting} className="addItemModal-submit-button">
                        Submit
                    </button>
                    </Form>
                )}
                </Formik>
          {/* <button onClick={handleClose}>close</button> */}
        </section>
      </div>
    );
  };

  export default AddItemModal;