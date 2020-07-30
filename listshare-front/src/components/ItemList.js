import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PasswordModal from './Modals/PasswordModal';
import Item from './Item';
import AddItemModal from './Modals/AddItemModal';


const ItemList = (props) => {
    let doesListExist = true;
    const listAccessCode = props.match.params.listCode;
    const history = useHistory();
    const [isModalActive, setIsModalActive] = useState(null);
    const [isAddModalActive, setIsAddModalActive] = useState(false);
    const [listPassword, setListPassword] = useState("");
    const [listItems, setListItems] = useState({});
    
    const getItemList = () =>{
        if(isModalActive == null){
            return(
                <></>
            )
        }
        else if(isModalActive) return (
            <PasswordModal show={isModalActive} 
            handleClose={()=>setIsModalActive(false)}
            accessCode={"#"+listAccessCode}
            setIsModalActive={setIsModalActive}
            setListPassword={setListPassword}
            >
            </PasswordModal>
        )
        return (
            <>
            {getAddModal()}
            <div className="itemList-container">
                <h2>#{listAccessCode}</h2>
                {getItems()}
                <button className="item-add-button"
                    onClick={()=>{addItem()}}>
                    + ADD
                </button>
            </div>
            </>
        )
    }

    useEffect(()=>{
        axios.get(global.BACKEND+ "/api/ItemLists/", {
            headers:{},
            params:{
                "AccessCode": "#" + listAccessCode,
                "ListPassword": listPassword
            }
        })
        .then(({data}) => {
            console.log(data.items);
            setIsModalActive(false);
            setListItems(data.items);
        }).catch( error => {
            setIsModalActive(true);
            if(error.response.status != 400) {
                alert("Trying to access not existing list")
                history.push("/");
            }
        });
    },[isModalActive])


    const getItems= () => {
        let items = [];
        try{
            for(let item of listItems){
                let deletePayload = {
                    "ItemId":item.id,
                    "ListAccessCode": "#"+listAccessCode,
                    "ListPassword": listPassword
                }
                items.push(
                    <Item name={item.name}
                          isDone={item.isDone}
                          deletePayload={deletePayload}
                          setListItems={setListItems}
                          listItems={listItems}
                    />
                )}
        }catch{

        }
        return items;
    }

    const addItem = () =>{
        setIsAddModalActive(true);
        
    }

    const getAddModal = () =>{
        return(
            <AddItemModal show={isAddModalActive} 
            setIsAddModalActive={setIsAddModalActive}
            listAccessCode={listAccessCode}
            listPassword={listPassword}
            setListItems={setListItems}
            listItems={listItems}
            />
        )
    }

    return(
        <>
            {getItemList()}
        </>
    )

    
}

export default ItemList;
