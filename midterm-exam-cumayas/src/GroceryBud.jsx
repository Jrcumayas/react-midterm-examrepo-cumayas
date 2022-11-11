import React, {useState, useEffect} from 'react'
import {IoMdTrash} from 'react-icons/io'
import {BiEdit} from 'react-icons/bi'

const GroceryBud = () => {
    //Alert Messages for user to know what operation has been done
    const[successMessage, setSuccessMessage] = useState(false); //Success Message is for having succesfully added an item to cart
    const[errorMessage, setErrorMessage] = useState(false); //Error Message is for empty input field
    const[editMessage, setEditMessage] = useState(false); //Edit Message is for succesfully editing an existing item
    const[removeMessage, setRemoveMessage] = useState(false); //Remove Message is for having succesfully removed an item from cart
    const[clearAllMessage, setClearAllMessage] = useState(false); // Clear All for all the items removed
    const[editActive, setEditActive] = useState(false); // Edit Active is for the application to know whether the edit button has been activated

    const[product, setProduct] = useState(''); // Product or item inputted by the user | input field and editing
    const[recentlyRemoved, setRecentlyRemoved] = useState(); //Keep track what item has been removed
    const[recentlyAdded, setRecentlyAdded] = useState(); //Keep track what item has been added
    const[listItems, setListItems] = useState([]); // The Array or the list of items or products

    const[selected, setSelected] = useState(); // The selected element of the array
    const[selectedIndex, setSelectedIndex] = useState(); // The selected element's index

    useEffect(() => {
        var storedItems = JSON.parse(localStorage.getItem('listItems'));
        if(storedItems){
            setListItems(storedItems);
        } // To check whether an existing list is present in the Local Storage. We convert string to JSON data or format

        const handleKeyDown = (e) => {
            if(e.key === "Enter"){
                (document.getElementById("enter-button")).click();
            }
        }

        const inputField = document.getElementById("item-input");
        inputField.addEventListener("keydown", handleKeyDown);
        return (() => {
            inputField.removeEventListener("keydown", handleKeyDown);
        }) // An Event listener to keep track what keys have been pressed by the user. If "Enter" key has been pressed
           // then a click has been initialized with the id "enter-button" or our Add to Cart Button
           // in which it performs the onClick of the button
    },[]);

    const handleInputChange = (e) => {
        setProduct(String(e.target.value));
    } // Any input in the field is stored inside the Product Variable

    const handleButtonClick = () => {
        if(!editActive){ //checks if the EditActive is False
            if(product.trim().length == 0 && product == ''){
                setErrorMessage(true);
                setTimeout(() => {
                    setErrorMessage(false);
                }, 3000)
            } else {
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000)
                listItems.push({
                    item: product
                });
                localStorage.setItem('listItems', JSON.stringify(listItems));
                setRecentlyAdded(product);
                setProduct('');
            }
        } else {
            if(product.trim().length == 0 && product == ''){
                setErrorMessage(true);
                setTimeout(() => {
                    setErrorMessage(false);
                }, 3000)
            } else {
                setRecentlyRemoved(selected.item);
                setEditMessage(true);
                setTimeout(() => {
                    setEditMessage(false);
                }, 3000)
                selected.item = product;
                setListItems(listItems);
                localStorage.setItem('listItems', JSON.stringify(listItems));
                setEditActive(false);
                setProduct('');
                setSelectedIndex();
                setRecentlyAdded(selected.item);
            }
        }
        
    }

    const handleClearButton = () => {
        if(!editActive){
            localStorage.clear();
            setListItems([]);
            listItems.length = 0;
            setClearAllMessage(true);
            setTimeout(() => {
                setClearAllMessage(false);
            }, 3000)
        } else {
            setProduct('');
            setSelectedIndex();
            setEditActive(false);
        }
    }

    function handleRemoveButton(selected){
        setRecentlyRemoved(selected);
        setRemoveMessage(true);
        setTimeout(() => {
            setRemoveMessage(false);
        }, 3000)
        const newList = listItems.filter((items) => items.item !== selected);
        setListItems(newList);
        localStorage.setItem('listItems', JSON.stringify(newList));
    }

    function handleEditButton(selected, index){
        setEditActive(true);
        setSelected(selected);
        setSelectedIndex(index);
        setProduct(selected.item);
    }

    return(
        <div className="container">
            <div className="application-box">
                <div className="message-container">
                    {successMessage && (<label id = "success-message">"{recentlyAdded}" has been successfully added to cart!</label>)}  
                    {errorMessage && ( <label id = "error-message">Field is empty. Input item and hit enter or click add to cart.</label>)}        
                    {editMessage && (<label id = "success-message">"{recentlyRemoved}" has been editted to "{recentlyAdded}"!</label>)}
                    {removeMessage && (<label id = "success-message">"{recentlyRemoved}" has been removed from cart!</label>)}   
                    {clearAllMessage && (<label id = "success-message">All items are removed!</label>)}   
                </div>
                <h1 id ="header">Grocery Bud</h1>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="e.g. Eggs" 
                        id="item-input" 
                        value = {product}
                        onChange = {handleInputChange}
                    />
                    <button 
                        title = {!editActive ? "Add to List" : "Edit"}
                        id="enter-button"
                        type = "submit"
                        onClick = {handleButtonClick}
                    >{!editActive ? "Add to Cart" : "Edit"}</button>
                </div>
                <div className="cart-container">   
                    <ul className="item-container">
                        {
                            listItems.map((items,index) => {
                                return (
                                    <div className = {(selectedIndex === index) ? ("selected-product") : ("product")}>
                                        <li key = {index} id = "product-item">{items.item}</li>
                                        <div className = "item-buttons">
                                            <button title = "Edit" id = "edit-button" onClick = {()=>handleEditButton(items, index)}><BiEdit size={18}/></button>
                                            <button title = "Remove" id = "delete-button" onClick = {()=>handleRemoveButton(items.item)}><IoMdTrash size={18}/></button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
                <button title = {!editActive? "Clear All": "Cancel"} id={!editActive? "clear-all-items": "clear-all-items-cancel"} onClick = {handleClearButton}>{!editActive? "Clear All": "Cancel"}</button>
            </div>
        </div>
    );
}

export default GroceryBud;