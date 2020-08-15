if (document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready(){
    var rateItemsButtons = document.getElementsByClassName('btn-danger')
    console.log(rateItemsButtons)
    for (var i = 0; i<rateItemsButtons.length; i++) {
        var button = rateItemsButtons[i]
        button.addEventListener('click', removeRateItem) 
    }

    var rateInputs = document.getElementsByClassName('rate-input')
    for (var i = 0; i<rateInputs.length; i++) {
        var input = rateInputs[i]
        input.addEventListener('change', quantityChanged)
    }
}

function removeRateItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateRateAverage()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value < 0 || input.value > 5){
        input.value = 0
    }
    updateRateAverage()
}

function updateRateAverage(){
    var rateItemsContainer = document.getElementsByClassName('rate-items')[0]
    var rateRows = rateItemsContainer.getElementsByClassName('rate-row')
    var total = parseFloat(0)
    var average = 0
    for (var i = 0; i<rateRows.length; i++) {
        var rateRow = rateRows[i]
        var rateInputsSkills = rateRow.getElementsByClassName('rate-input')[0]
        var rateInputsLevel = rateRow.getElementsByClassName('rate-input')[1]
        var rateInputsAccuracy = rateRow.getElementsByClassName('rate-input')[2]
        var rateInputsTime = rateRow.getElementsByClassName('rate-input')[3]
        var skills = rateInputsSkills.value
        var level = rateInputsLevel.value
        var accuracy = rateInputsAccuracy.value
        var time = rateInputsTime.value
        total += parseFloat(skills) + parseFloat(accuracy) + parseFloat(time)
    }
    average = total / (3*(rateRows.length))
    average = Math.round(average*100)/100
    document.getElementsByClassName('rate-average-rate')[0].innerText = average

}