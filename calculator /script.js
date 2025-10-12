const display = document.getElementById('display');
const operatorDisplay = document.getElementById('operator-display');
const buttons = document.querySelectorAll('.buttons button');

// State variables
let currentInput = '0'; // Start with 0
let previousInput = '';
let operation = null;
let awaitingNextOperand = false;

// Function to update the main number display
function updateDisplay(value) {
    // Ensure "Error" or a very long number doesn't break the input field
    const displayValue = value.length > 15 ? parseFloat(value).toPrecision(10) : value;
    display.value = displayValue === '' ? '0' : displayValue;
}

// Function to update the operator symbol display
function updateOperatorDisplay(op) {
    operatorDisplay.textContent = op === null ? '' : op;
}

// Function to perform the calculation
function calculate(n1, operator, n2) {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    if (isNaN(num1) || isNaN(num2)) return '';

    // Switch statement for operators
    switch (operator) {
        case '+':
            return (num1 + num2).toString();
        case '-':
            return (num1 - num2).toString();
        case '*':
            return (num1 * num2).toString();
        case '/':
            if (num2 === 0) return 'Error';
            return (num1 / num2).toString();
        default:
            return '';
    }
}

// Main Event Listener Loop
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        const action = button.dataset.action;
        
        // 1. Handle Number Input
        if (button.classList.contains('number') && action !== 'decimal') {
            // If the display is "Error", start a new calculation
            if (currentInput === 'Error') {
                currentInput = '0';
                operation = null;
                previousInput = '';
            }

            if (currentInput === '0' || awaitingNextOperand) {
                currentInput = value;
                awaitingNextOperand = false;
            } else {
                currentInput += value;
            }
        }
        
        // Handle Decimal
        else if (action === 'decimal') {
            if (awaitingNextOperand) {
                currentInput = '0.';
                awaitingNextOperand = false;
            } else if (!currentInput.includes('.')) {
                currentInput += '.';
            }
        }

        // 2. Handle Operator Buttons (+, -, *, /)
        else if (button.classList.contains('operator') && action !== 'clear' && action !== 'delete' && action !== 'calculate') {
            if (currentInput === 'Error') return; // Ignore operator if error is displayed

            if (operation && !awaitingNextOperand) {
                // If an operation is pending and we're not waiting for a number, calculate
                currentInput = calculate(previousInput, operation, currentInput);
                previousInput = currentInput;
            } else {
                previousInput = currentInput;
            }
            operation = value; // Set the new operator
            awaitingNextOperand = true; 
        }

        // 3. Handle Equals (=)
        else if (action === 'calculate') {
            if (operation && previousInput !== '' && currentInput !== 'Error') {
                currentInput = calculate(previousInput, operation, currentInput);
                operation = null; 
                previousInput = '';
                awaitingNextOperand = true;
            }
        }

        // 4. Handle Clear (AC)
        else if (action === 'clear') {
            currentInput = '0';
            previousInput = '';
            operation = null; 
            awaitingNextOperand = false;
        }

        // 5. Handle Delete (DEL)
        else if (action === 'delete') {
            if (currentInput.length > 1 && currentInput !== 'Error') {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
        }

        // Update both displays after every button click
        updateOperatorDisplay(operation); 
        updateDisplay(currentInput);
    });
});

// Initialize displays on load
updateDisplay(currentInput); 
updateOperatorDisplay(operation);