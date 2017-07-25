'use strict';

function Image(name) {
  this.name = name;
  this.source = 'img/' + this.name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
  Image.all.push(this);
}


Image.numQuestionsAnswered = 0;
Image.names = [document.getElementById('imgOne'), document.getElementById('imgTwo'), document.getElementById('imgThree')];

Image.finalList = document.getElementById('finalList');

Image.all = [];

Image.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

for(var i = 0; i < Image.allNames.length; i++) {
  new Image(Image.allNames[i]);
}

function randomIndex() {
  return Math.floor(Math.random() * Image.all.length);
}

var lastNumbers = [];

// functions
function loadPhotos() {

  var numbers = [];
  numbers[0] = randomIndex();
  numbers[1] = randomIndex();
  numbers[2] = randomIndex();

  while (numbers[0] === lastNumbers[lastNumbers.length - 1] || numbers[0] === lastNumbers[lastNumbers.length - 2] || numbers[0] === lastNumbers[lastNumbers.length - 3]) {
    numbers[0] = randomIndex();
  }

  Image.names[0].src = Image.all[numbers[0]].source;
  Image.names[0].alt = Image.all[numbers[0]].name;
  Image.all[numbers[0]].timesShown += 1;

  while (numbers[0] === numbers[1] || numbers[1] === lastNumbers[lastNumbers.length - 1] || numbers[1] === lastNumbers[lastNumbers.length - 2] || numbers[1] === lastNumbers[lastNumbers.length - 3]) {
    numbers[1] = randomIndex();
  }

  Image.names[1].src = Image.all[numbers[1]].source;
  Image.names[1].alt = Image.all[numbers[1]].name;
  Image.all[numbers[1]].timesShown += 1;

  while (numbers[0] === numbers[2] || numbers[1] === numbers[2] || numbers[2] === lastNumbers[lastNumbers.length - 1] || numbers[2] === lastNumbers[lastNumbers.length - 2] || numbers[2] === lastNumbers[lastNumbers.length - 3]) {
    numbers[2] = randomIndex();
  }

  Image.names[2].src = Image.all[numbers[2]].source;
  Image.names[2].alt = Image.all[numbers[2]].name;
  Image.all[numbers[2]].timesShown += 1;

  lastNumbers.push(numbers[0]);
  lastNumbers.push(numbers[1]);
  lastNumbers.push(numbers[2]);
}

function whenDoneAskingQuestions() {
  if(Image.numQuestionsAnswered === 25) {
    var a = 0;
    for(var i = 0; i < Image.allNames.length; i++) {
      a = document.createElement('li');
      a.textContent = Image.all[i].name + ' Clicked: ' + Image.all[i].timesClicked + ' Shown: ' + Image.all[i].timesShown;
      Image.finalList.appendChild(a);
    }
    // remove event listener
    for(var i = 0; i < Image.names.length; i++) {
      Image.names[i].removeEventListener('click', randomImage);
    }

    document.getElementById('images').hidden = true;
    return;
  }
}


// event handler
function randomImage(e) {

  // add to the array of which image is clicked
  for(var i = 0; i < Image.all.length; i++) {
    if(Image.all[i].name === e.target.alt) {
      Image.all[i].timesClicked++;
    }
  }

  // add to the number questions answered
  Image.numQuestionsAnswered++;

  // when 25 clicks are reached
  whenDoneAskingQuestions();

  // load three photos
  loadPhotos();
}



// deploy event listeners
for(var i = 0; i < Image.names.length; i++) {
  Image.names[i].addEventListener('click', randomImage);
}


// load photos on page load
loadPhotos();
