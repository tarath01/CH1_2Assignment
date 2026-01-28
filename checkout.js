/**********************************************************************************************************************
 * Program............: Simple Checkout
 * Programmers........: Ben Stearns, Taylor Rath
 * Date...............: 1-24-26
 * GitHub Repo........: https://github.com/tarath01/CH1_2Assignment
 * Description........: The purpose of this program is to:
 *                       - Take user input for a grocery checkout scenario
 *                       - Validate the user input
 *                        - Calculate totals, tax, and change due
 *                        - Display a receipt to the user as an alert
 * File Description...: defines the JavaScript code for validating user input and generating a receipt
 ***********************************************************************************************************************/

// use a directive to enforce strict mode.
// Prevents certain actions and throws more exceptions to prevent sloppy/bad code
"use strict";

// define a function that gets an HTML element
function getElement(selector) {
    return document.querySelector(selector);
}

// define a function that handles the click event of the Join button
function calculateButtonClick(event) {
    // define function variables
    const DISCOUNT_RATE = 0.10;                 // discount rate applied if total >= 50
    const TAX_RATE = 0.0825;                    // for calculating tax to be paid
    const money = (n) => n.toFixed(2);      // for rounding to 2 decimal places
    let invalid = false;                       // represents if validation passed

    // retrieve error message fields
    const customerErr = document.querySelector("#name_error")
    const itemErr = document.querySelector("#grocery_error")
    const priceErr = document.querySelector("#unit_error")
    const quantityErr = document.querySelector("#quantity_error")
    const cashErr = document.querySelector("#cash_error")

    // get user entries from text boxes
    const name = getElement("#customer_name").value;       // name of user
    const item = getElement("#grocery_item").value;        // name of grocery item
    const price = parseFloat(getElement("#unit_price").value);  // stores item's price
    const quantity = parseInt(getElement("#quantity").value);   // quantity of grocery item user bought
    const cash = parseFloat(getElement("#cash").value);         // cash tendered to buy item(s)

    //prevent the form from being submitted to the server
    event.preventDefault();

    // reset error message elements
    customerErr.textContent = "*";
    itemErr.textContent = "*";
    priceErr.textContent = "*";
    quantityErr.textContent = "*";
    cashErr.textContent = "*";

    //validate name field
    if (name === "") {
        customerErr.textContent = "Name is required.";
        invalid = true;
    }

    //validate grocery item field
    if (item === "") {
        itemErr.textContent = "Grocery item is required.";
        invalid = true;
    }

    //validate unit price field
    if (getElement("#unit_price").value === ""){
        priceErr.textContent = "Unit price is required.";
        invalid = true;
    } else {
        if (Number.isNaN(price)) {
            priceErr.textContent = "Please enter a valid price.";
            invalid = true;
        }
        else if(price <= 0){
            priceErr.textContent = "Must be greater than 0.";
            invalid = true;
        }
    }

    //validate quantity field
    if (getElement("#quantity").value === ""){
        quantityErr.textContent = "Quantity is required.";
        invalid = true;
    }
    else{
        if (!Number.isInteger(quantity)){
            quantityErr.textContent = "Must be a whole number.";
            invalid = true;
        }
        else if(quantity <= 0){
            quantityErr.textContent = "Must be greater than 0.";
            invalid = true;
        }
    }

    //validate cash field
    if (getElement("#cash").value === ""){
        cashErr.textContent = "Cash amount is required.";
        invalid = true;
    }
    else {
        if (Number.isNaN(cash)){
            cashErr.textContent = "Please enter a valid amount.";
            invalid = true;
        }
        else if(cash <= 0){
            cashErr.textContent = "Must be greater than 0.";
            invalid = true;
        }
    }

    // cancel form submit if any user entries are invalid
    if (invalid) {
        event.preventDefault();
    }
    // otherwise, perform needed calculations, generate the receipt, and display receipt as an alert
    else{
        const subtotal = price * quantity;
        const discount = (subtotal >=50) ? subtotal * DISCOUNT_RATE : 0;
        const taxable = subtotal - discount;
        const tab = TAX_RATE * taxable;
        const total = taxable + tab;
        const change = cash - total;

        const msg =
        `==========Receipt==========
        Customer: ${name}
        Item: ${item}
        Unit Price: $${money(price)}
        Quantity: ${quantity}
        -------------
        Subtotal: $${money(subtotal)}
        Discount: -$${money(discount)}
        Tax: $${money(tab)}
        Total: $${money(total)}
        -------------
        Cash: $${money(cash)}
        Change: $${money(change)}
       =========End of Receipt======`

        alert(msg);
    }
}

// add code that's run when the web page is loaded
document.addEventListener("DOMContentLoaded", () => {
    // specify the function that's run when the Display Receipt button is clicked
    getElement("#cash_button").addEventListener("click", calculateButtonClick);
});