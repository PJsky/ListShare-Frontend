import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PasswordModal from './Modals/PasswordModal';
import Item from './Item';
import AddItemModal from './Modals/AddItemModal';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useDispatch, useSelector, useStore } from 'react-redux';
import * as SignalR from '@aspnet/signalr';
import {hub_join_group} from '../actions/listHubActions';



const ItemList = (props) => {
    let doesListExist = true;
    let dispatch = useDispatch();
    const listAccessCode = props.match.params.listCode;
    const history = useHistory();
    const [isModalActive, setIsModalActive] = useState(null);
    const [isAddModalActive, setIsAddModalActive] = useState(false);
    const [listPassword, setListPassword] = useState("");
    const [listItems, setListItems] = useState({});
    const [listName, setListName] = useState("no name");
    const [isStarred, setIsStarred] = useState(false);
    const isLogged = useSelector(state => state.logged_in);
    const hubChange = useSelector(state => state.listHub)
    
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
            setListName={setListName}
            setIsStarred={setIsStarred}
            >
            </PasswordModal>
        )
        return (
            <>
            {getAddModal()}
            <div className="itemList-container">
                <h4 
                onClick={()=>{changeStar()}} 
                className={isStarred?"starred-highlight":"starred"}>
                    {getStar()}
                </h4>
                <h2>{listName}</h2>
                <h3>#{listAccessCode}</h3>
                {getItems()}
                <button className="item-add-button"
                    onClick={(e)=>{addItem()}}>
                    + ADD
                </button>
            </div>
            </>
        )
    }

    useEffect(() =>{
        //if modal has been closed and password has be put in correctly
        //or the list has been starred then modal gets closed
        //IF MODAL CLOSED
        //THEN add a person to the websocket group that gets notifications about this list
        if(!isModalActive || isModalActive == null){
            dispatch(hub_join_group("listGroup_"+listAccessCode));
        }
    },[isModalActive])

    useEffect(()=>{
        try{
            let myStorageLists = window.localStorage.getItem('RecentItemLists').split(',');
            if(!myStorageLists.includes(listAccessCode)){
                if(myStorageLists.length>=5) myStorageLists.shift();
                myStorageLists.push(listAccessCode);
                window.localStorage.setItem(`RecentItemLists`, myStorageLists);
                }
        }catch{
            window.localStorage.setItem(`RecentItemLists`, [listAccessCode]);
        }
    })

    useEffect(()=>{
        axios.get(global.BACKEND+ "/api/ItemLists/", {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("AccessToken")
            },
            params:{
                "AccessCode": "#" + listAccessCode,
                "ListPassword": listPassword
            }
        })
        .then(({data}) => {
            setIsModalActive(false);
            setListItems(data.items);
            setListName(data.name);
            setIsStarred(data.isStarred);
        }).catch( error => {
            setIsModalActive(true);
            if(error.response.status != 400) {
                alert("Trying to access not existing list")
                history.push("/");
            }
        });
    },[isModalActive])

    useEffect(() => {
        setTimeout(() => {
            axios.get(global.BACKEND+ "/api/ItemLists/", {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("AccessToken")
                },
                params:{
                    "AccessCode": "#" + listAccessCode,
                    "ListPassword": listPassword
                }
            }).then((response) => {
                setListItems({});
                setListItems(response.data.items);
            })
        }, 50);
        
    },[hubChange])

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

    const getStar = () => {
        if(!isLogged) return ;
        if(isStarred) return (<FaStar/>);
        return (<FaRegStar/>);
    }

    const changeStar = () => {
        if(!isStarred)
            axios.post(global.BACKEND + "/api/users/starred", {
                "AccessCode" : "#"+listAccessCode
            },{
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("AccessToken")
                }
            }).then(response => {
                setIsStarred(true);
            }).catch(error => {
            })
        else
            axios.delete(global.BACKEND + "/api/users/starred", {
                data:{
                    "AccessCode" : "#" + listAccessCode
                },
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("AccessToken") 
                }
            }).then(response => {
                setIsStarred(false);
            }).catch(error => {
            })
    }

    return(
        <>
            {getItemList()}
        </>
    )
}

export default ItemList;
