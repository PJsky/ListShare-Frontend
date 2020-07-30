import React, { useEffect } from 'react';
import axios from 'axios';


const Item = ({name, deletePayload, setListItems, listItems}) => {
    
    const deleteItem = () =>{
        axios.delete(global.BACKEND + "/api/items", {
            data:deletePayload
        })
        setListItems(listItems.filter(i=>i.id != deletePayload.ItemId))
    }

    return(
        <>
        <div className="item-container">
            {/* <div className="item">
                <h3>{name || "no name"}</h3>
            </div> */}
            <label class="container">{name || "no name"}
                <input type="checkbox"/>
                <span class="checkmark"></span>
            </label>
            <div className="delete-item"
            onClick={()=>{
                deleteItem();
            }}>X</div>
        </div>
        </>
    )
}

export default Item;
