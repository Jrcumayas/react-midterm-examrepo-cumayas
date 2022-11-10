import React, {useState, useEffect} from 'react'

const GroceryBud = () => {
    const[counter, setCounter] = useState(0);
    const[errorMessage, setErrorMessage] = useState(false);
    const[successMessage, setSuccessMessage] = useState(false);
    const[product, setProduct] = useState('');
    const[recentlyAdded, setRecentlyAdded] = useState();
    const[listItems, setListItems] = useState([]);

    useEffect(() => {
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
            setErrorMessage(false);
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
            }, 3000)
            listItems.push({
                id: counter,
                item: product
            });
            setRecentlyAdded(product);
            setCounter(counter+1);
            setProduct('');
        }
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
                <div className="cart-containter">   
                    <ul className="item-container">
                        {
                            listItems.map((items,index) => {
                                return <li key = {index}>{items.item}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default GroceryBud;