import React, { useEffect } from 'react';


const Item = ({name}) => {
    
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
        </div>
        </>
    )
}

export default Item;
