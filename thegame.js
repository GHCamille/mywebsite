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

    var selectPictureButtons = document.getElementsByClassName('game-item-button')
    for (var i = 0; i < selectPictureButtons.length; i++){
        var button = selectPictureButtons[i]
        button.addEventListener('click', selectPictureButtonsClicked)
    }

    document.getElementsByClassName('btn-rate')[0].addEventListener('click', rateCLicked)

}

function rateCLicked() {
    alert('Thank you for rating my work !')
    var rateItems = document.getElementsByClassName('rate-items')[0]
    while (rateItems.hasChildNodes()){
        rateItems.removeChild(rateItems.firstChild)
    }
    updateRateAverage()
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

function selectPictureButtonsClicked(event){
    var button = event.target
    var pictureItem = button.parentElement.parentElement
    var title = pictureItem.getElementsByClassName('game-item-title')[0].innerText
    var level = pictureItem.getElementsByClassName('game-item-level')[0].innerText
    var imageSrc = pictureItem.getElementsByClassName('game-item-image')[0].src
    addActivityToRating(title, level, imageSrc)
}

function addActivityToRating(title, level, imageSrc){
    var rateRow = document.createElement('div')
    rateRow.classList.add('rate-row')
    var rateItems = document.getElementsByClassName('rate-items')[0]
    var rateItemNames = rateItems.getElementsByClassName('rate-title')
    for (var i = 0; i < rateItemNames.length; i++){
        if (rateItemNames[i].innerText == title){
            alert('You have already selected this picture once.')
            return
        }
    }
    var rateRowContents = `
        <div class="rate-skills rate-header rate-column">
            <span class="rate-title">${title}</span>
        </div>
        <div class="rate-skills rate-column">
            <input class="rate-input" type="number" value="5">
        </div>
        <div class="rate-level rate-column">
            <input class="rate-input" type="number" value="${parseFloat(level.replace('Lvl ',''))}">
        </div>
        <div class="rate-accuracy rate-column">
            <input class="rate-input" type="number" value="5">
        </div>
        <div class="rate-time rate-column ">
            <input class="rate-input" type="number" value="5">
        </div>
        <div class="rate-rate rate-header rate-column">
            <button class="btn btn-danger" type="button">RATE</button>
        </div>`
    rateRow.innerHTML = rateRowContents
    rateItems.append(rateRow)
    rateRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeRateItem)
    var rateInputs = rateRow.getElementsByClassName('rate-input')
    for (var i = 0; i<rateInputs.length; i++) {
        var input = rateInputs[i]
        input.addEventListener('change', quantityChanged)
    }
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
