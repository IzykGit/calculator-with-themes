
const buttons = document.querySelectorAll("#button")
const displayValue = document.querySelector('.displayValue')
const displayPreviousValue = document.querySelector('.displayPreviousValue')

const specialCharacters = ["DEL", "RESET", "."]
const operationCharacters = ["+", "-", "*", "/", "="]

let currentValue;

let firstValueEntered;

let currentOperation;
let result;
displayValue.innerHTML = "0"


// The firstValueEntered represents the value entered before an operation was selected.

// The currentValue represents the value that is currently displayed.

buttons.forEach(button => {

    button.addEventListener("click", () => {


        // When the frist value is entered at the start of the operation.

        if(!isNaN(button.value)) {
            if(currentValue === undefined) {
                currentValue = button.value
            }
            else {

                const parts = currentValue.split(".")
                if(parts.length === 1 || (parts.length === 2 && parts[1].length < 2)) {
                    currentValue += button.value
                }

            }
            displayValue.innerHTML = `${currentValue}`
        }
        
        // Adding decimal to be used in operation

        
        else if (button.value === ".") {

            if(currentValue === undefined) {
                currentValue = "0."
            }
            else if (!currentValue.includes(".") && currentValue !== undefined) {
                currentValue += "."
            }

            displayValue.innerHTML = `${currentValue}`;
        }

        // When the DEL or RESET button is pressed it will reset all values or the current value being displayed
        
        else if(specialCharacters.includes(button.value)) {
            switch(button.value) {
                case "DEL":
                    if(firstValueEntered !== undefined) {
                        currentValue = firstValueEntered;
                        firstValueEntered = undefined;
            
                        displayPreviousValue.innerHTML = "";
                        displayValue.innerHTML = `${currentValue}`;
                        console.log(currentValue);
                    }
                    else {
                        displayValue.innerHTML = "0";
                        currentValue = undefined;
                        console.log(currentValue)
                    }
                    break;

                case "RESET":
                    displayValue.innerHTML = "0";
                    displayPreviousValue.innerHTML = "";
        
                    currentValue = undefined;
                    firstValueEntered = undefined;
                    break
            }
        }



        // If the first value has been entered and an operation is selected then the current value will become firstValueEntered.
        // Afterwards the next new value will become the new current value.


        else if (currentValue !== undefined && button.value !== "=" && firstValueEntered === undefined) {
            
            displayPreviousValue.innerHTML = `${currentValue} ${button.value}`;
            firstValueEntered = currentValue;
            currentValue = undefined;
            displayValue.innerHTML = "0";
            currentOperation = button.value;

            if(firstValueEntered !== undefined && currentValue !== undefined) {
                return
            }
        }

        

        // Operation is carried out when the user presses the equals button

        else if (button.value === "=" && currentValue !== undefined && firstValueEntered !== undefined && currentOperation !== undefined) {

            currentValue = Number(currentValue)
            firstValueEntered = Number(firstValueEntered)

            switch(currentOperation) {

                case "+":
                    result = currentValue + firstValueEntered;

                    if(result.toString().includes(".")){
                        result = Number(result.toFixed(2));
                    };

                    currentValue = result;
                    firstValueEntered = undefined;

                    displayPreviousValue.innerHTML = "";
                    displayValue.innerHTML = result;
                    break;

                case "-":
                    result = firstValueEntered - currentValue;
                    
                    if(result.toString().includes(".")){
                        result = Number(result.toFixed(2));
                    };


                    currentValue = result;
                    firstValueEntered = undefined;

                    displayPreviousValue.innerHTML = "";
                    displayValue.innerHTML = result;
                    break;
                
                case "*":
                    result = firstValueEntered * currentValue;
                    
                    if(result.toString().includes(".")){
                        result = Number(result.toFixed(2));
                    };

                    currentValue = result;
                    firstValueEntered = undefined;

                    displayPreviousValue.innerHTML = "";
                    displayValue.innerHTML = result;
                    break;
                
                case "/": {
                    result = firstValueEntered / currentValue;
                    
                    if(result.toString().includes(".")){
                        result = Number(result.toFixed(2));
                    };
                    
                    currentValue = result;
                    firstValueEntered = undefined;

                    displayPreviousValue.innerHTML = "";
                    displayValue.innerHTML = result;
                }
            }

            currentOperation = undefined
        }



        console.log(currentValue, firstValueEntered, currentOperation)
    })
});


// Swapping themes

const themeButton = document.querySelector('.theme-button')
const theme = document.getElementById('style')
let currentTheme = 1;


themeButton.addEventListener('click', () => {
    if(currentTheme === 1) {
        theme.href = 'lightTheme.css'
        currentTheme = 2
    }
    else if (currentTheme === 2) {
        theme.href = 'purpleTheme.css'
        currentTheme = 3
    }
    else {
        theme.href = 'default.css'
        currentTheme = 1
    }

})






