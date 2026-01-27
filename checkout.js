/**********************************************************************************************************************
 * Program...........: Simple Checkout
 * Programmers.......: Ben Stearns, Taylor Rath
 * Date..............: 1-24-26
 * GitHub Repo.......: https://github.com/tarath01/CH1_2Assignment
 * Description.......: The purpose of this program is to:
 *                       - Take user input for a grocery checkout scenario
 *                       - Validate the user input
 *                        - Calculate totals, tax, and change due
 *                        - Display a receipt to the user as an alert
 * File Description..: defines the JavaScript code for validating user input and generating a receipt
 ***********************************************************************************************************************/

// use a directive to enforce strict mode.
// Prevents certain actions and throws more exceptions to prevent sloppy/bad code
"use strict";

// define a function that gets an HTML element
function getElement(selector) {
    return document.querySelector(selector);
}

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

    //validate name field
    if (name == "") {
        getElement("#name_error").textContent = "Name is required.";
        invalid = true;
    } else {
        getElement("#name_error").textContent = "";
    }

    //validate grocery item field
    if (item == "") {
        getElement("#grocery_error").textContent = "Grocery item is required.";
        invalid = true;
    } else {
        getElement("#grocery_error").textContent = "";
    }

    //validate unit price field
    if (getElement("#unit_price").value == ""){
        getElement("#unit_error").textContent = "Unit price is required.";
        invalid = true;
    } else {
        if (Number.isNaN(price)){
            getElement("#unit_error").textContent = "Please enter a valid price.";
            invalid = true;
        } else {
            getElement("#unit_error").textContent = "";
        }
    }

    //validate quantity field
    if (getElement("#quantity").value == ""){
        getElement("#quantity_error").textContent = "Quantity is required.";
        invalid = true;
    }
    else{
        if (!Number.isInteger(quantity)){
            getElement("#quantity_error").textContent = "Must be a whole number.";
            invalid = true;
        } else {
            getElement("#quantity_error").textContent = "";
        }
    }

    //validate cash field
    if (getElement("#cash").value == ""){
        getElement("#cash_error").textContent = "Cash amount is required.";
        invalid = true;
    }
    else {
        if (Number.isNaN(cash)){
            getElement("#cash_error").textContent = "Please enter a valid amount.";
            invalid = true;
        }
        else {
            getElement("#cash_error").textContent = "";
        }
    }

    // cancel form submit if any user entries are invalid
    if (invalid) {
        event.preventDefault();
    }

    // otherwise, perform needed calculations, generate the receipt, and display as an alert
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