import React, {useState, useEffect} from 'react'
import {IoMdTrash} from 'react-icons/io'
import {BiEdit} from 'react-icons/bi'

const GroceryBud = () => {
    const[counter, setCounter] = useState(0);
    const[errorMessage, setErrorMessage] = useState(false);
    const[successMessage, setSuccessMessage] = useState(false);
    const[product, setProduct] = useState('');
    const[recentlyAdded, setRecentlyAdded] = useState();
    const[listItems, setListItems] = useState([]);

    useEffect(() => {
        var storedItems = JSON.parse(localStorage.getItem('listItems'));
        if(storedItems){
            setListItems(storedItems);
            setCounter(storedItems.length)
        }

        const handleKeyDown = (e) => {
            console.log(e.key);
            if(e.key === "Enter"){
                (document.getElementById("enter-button")).click();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return (() => {
            document.removeEventListener("keydown", handleKeyDown);
        })
    },[]);

    const handleInputChange = (e) => {
        setProduct(String(e.target.value));
    }

    const handleButtonClick = () => {
        if(product.trim().length == 0 && product == ''){
            setErrorMessage(true);
            setProduct('');
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
            setCounter(counter+1);
            setProduct('');
        }
    }

    const handleClearButton = () => {
        localStorage.clear();
        setListItems([]);
        setCounter(0);
        listItems.length = 0;
    }

    function handleRemoveButton(selected){
        const newList = listItems.filter((item) => item.item !== selected);
        setListItems(newList);
        localStorage.setItem('listItems', JSON.stringify(newList));
    }

    function handleEditButton(selected){

    }

    return(
        <div className="container">
            <div className="application-box">
                <div className="message-container">
                    {successMessage && (<label id = "success-message">"{recentlyAdded}" has been successfully added to cart!</label>)}  
                    {errorMessage && ( <label id = "error-message">Field is empty. Input item to text field and click add to cart.</label>)}        
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
                        id="enter-button"
                        type = "submit"
                        onClick = {handleButtonClick}
                    >Add to cart</button>
                </div>
                <div className="cart-container">   
                    <ul className="item-container">
                        {
                            listItems.map((items,index) => {
                                return (
                                    <div className = "product">
                                        <li key = {index} id = "product-item">{items.item}</li>
                                        <div className = "item-buttons">
                                            <button id = "edit-button" onClick = {()=>handleEditButton(items.item)}><BiEdit size={18}/></button>
                                            <button id = "delete-button" onClick = {()=>handleRemoveButton(items.item)}><IoMdTrash size={18}/></button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
                <button id="clear-all-items" onClick = {handleClearButton}>Clear All</button>
            </div>
        </div>
    );
}

export default GroceryBud;