import React, {useState, useEffect} from 'react'

const GroceryBud = () => {
    const[error, setError] = useState(false);
    const[product, setProduct] = useState('');

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
    }, [])

    const detectKeyDown = (e) => {
        if(e.key === "Enter"){
            if(product === ""){
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 3000)
            }
        }
    }

    const handleInputChange = (e) => {
        setProduct(e.target.value);
    }

    const handleButtonClick = (e) => {
        if(product == ''){
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000)
        }
    }

    return(
        <div className="container">
            <div className="application-box">
                <h1 id ="header">Grocery Bud</h1>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="e.g. Eggs" 
                        id="item-input" 
                        onChange = {handleInputChange}
                    />
                    <button 
                        id="enter-button"
                        onClick = {handleButtonClick}
                    >Add to cart</button>
                </div>
                <div className="error-message-container">
                    <label id="error-message">
                        {error && (`Field is empty. Input item to text field and add to cart.`)}
                    </label>
                </div>
                <div className="cart-containter">   
                    
                </div>
            </div>
        </div>
    );
}

export default GroceryBud;