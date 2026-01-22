"use strict";

// define a function that gets an HTML element
function getElement(selector) { 
    return document.querySelector(selector);
}
parseFloat()
parseInt()
// define a function that handles the click event of the Join button
function joinButtonClick(event) {
    // get user entries from text boxes
    const name = getElement("#customer_name").value;
    const item = getElement("#grocery_item").value;
    const price = parseFloat(getElement("#unit_price").value);
    const quantity = parseInt(getElement("#quantity").value);
    const cash = parseFloat(getElement("#cash").value);
    
    // check user entries
    let invalid = false;
    if (name == "") {
        getElement("#name_error").textContent = "Name is required.";
        invalid = true;
    } else { 
        getElement("#name_error").textContent = "";
    }

    if (item == "") {
        getElement("#grocery_error").textContent = "Emails must match.";
        invalid = true;
    } else { 
        getElement("#grocery_error").textContent = "";
    }

    if (price == NaN){
        getElement("#unit_error").textContent = "Please enter a valid price.";
        invalid = true;
    } else {
        getElement("#unit_error").textContent = "";
    }

    if (quantity == NaN){
        getElement("#quantity_error").textContent = "Please enter a valid quantity (whole number).";
        invalid = true;
    } else {
        getElement("#quantity_error").textContent = "";
    }

    if (cash == NaN){
        getElement("#cash_error").textContent = "Please enter a valid quantity (whole number).";
        invalid = true;
    } else {
        getElement("#cash_error").textContent = "";
    }

    // cancel form submit if any user entries are invalid
    if (invalid) {
        event.preventDefault(); 
    }
    else{
        let msg =
            `==========Receipt==========\n
            Customer: ${name}\n
            Item: ${item}\n
            Unit Price: ${price}\n
            Quantity: ${quantity}\n
            -------------\n
        `
    }
};

// add code that's run when the web page is loaded
document.addEventListener("DOMContentLoaded", () => {
    // specify the function that's run when the Join button is clicked
    getElement("#join_button").addEventListener("click", joinButtonClick);
});