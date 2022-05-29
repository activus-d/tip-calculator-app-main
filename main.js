// get value of bill
// get percentage of tip
// get number of people
// get total amount of tip by dividing tip by 100 and multiplying the result by bill
// get tip per person by dividing total amount of tip by number of people
// get the total amount by adding total amount of tip with bill
// get total per person by dividing total amount by number of people

let bill = document.querySelector('#bill')
let numOfPeople = document.querySelector('#people')
let displayTip = document.querySelector('.displayTip')
let displayTotal = document.querySelector('.displayTotal')
let tips = document.querySelector('.tipBtns')
let customTip = document.querySelector('#customTip')

let valueStorage = 0
tips.addEventListener('click', event => { //add click event to tip buttons to get get value and give output
    target = event.target;
    let tip = target.value
    !target.matches('button') ? '' : ( splitter.parseInput(tip), valueStorage = tip ) // performs calculation when tip button is clicked and also assigns the value of button clicked to valueStorage
})

customTip.addEventListener('input', () => { // allows live calculation of values while taking custom tip input
    valueStorage = customTip.value //assigns value of custom tip to value storage
    splitter.parseInput(valueStorage)
})

bill.addEventListener('input', () => { // allows live calculation of values while taking bill input
    splitter.parseInput(valueStorage)
})

numOfPeople.addEventListener('input', () => { // allows live calculation of values while taking numOfPeople input
    splitter.parseInput(valueStorage)
})


let keyPressOutput = [bill, customTip, numOfPeople]
keyPressOutput.forEach( e => {
    e.addEventListener("keypress", function(event) { // add keypress event to all inputs to get value entered and give output
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
            splitter.parseInput(Number(customTip.value))
        }
      });
} )

const splitter = {
    parseInput(tip) {
        if( (bill.value === null || bill.value <= 0) && (numOfPeople === null || numOfPeople.value <= 0) ) {
            document.querySelector('.errorBill').textContent = `Can't be zero`
            document.querySelector('.errorPeople').textContent = `Can't be zero`
            document.querySelector('.peopleInput').style.border = "1px solid red"
            document.querySelector('.billInput').style.border = "1px solid red"
            displayTip.textContent = '$0.00'
            displayTotal.textContent = '$0.00'
        }else if( bill.value === null || bill.value <= 0 ) {
            document.querySelector('.errorBill').textContent = `Can't be zero`
            document.querySelector('.billInput').style.border = "1px solid red"
            displayTip.textContent = '$0.00'
            displayTotal.textContent = '$0.00'
        }else if( numOfPeople === null || numOfPeople.value <= 0 ) {
            document.querySelector('.errorPeople').textContent = `Can't be zero`
            document.querySelector('.peopleInput').style.border = "1px solid red"
            displayTip.textContent = '$0.00'
            displayTotal.textContent = '$0.00'
        }else{
            document.querySelector('.peopleInput').style.border = "none"
            document.querySelector('.billInput').style.border = "none"
            document.querySelector('.errorBill').textContent = ''
            document.querySelector('.errorPeople').textContent = ''
            displayTip.textContent = '$' + this.tipPerPerson(tip)
            displayTotal.textContent = '$' + this.totalPerPerson(tip) 
        }
    },

    totalTip(tip) { // get total tip
        let result = ( (+tip / 100) * Number(bill.value) )
        return result.toFixed(2)
    },
    tipPerPerson(tip) { //get tip per person 
        let result = (this.totalTip(tip)) / (Number(numOfPeople.value))
        return result.toFixed(2)
    },
    totalPerPerson(tip) { // get total amount per person
        let totalAmount = Number(this.totalTip(tip)) + Number(bill.value)
        let result = totalAmount / Number(numOfPeople.value)
        return result.toFixed(2)
    }
}

document.querySelector('.resetBtn').addEventListener('click', () => { //clear all input and button value(RESET)
    displayTip.textContent = '$0.00'
    displayTotal.textContent = '$0.00'
    bill.value = ''
    numOfPeople.value = ''
    customTip.value = ''
    document.querySelector('.errorBill').textContent = ''
    document.querySelector('.errorPeople').textContent = ''
    document.querySelector('.peopleInput').style.border = "none"
    document.querySelector('.billInput').style.border = "none"
})
