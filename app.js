'use strict';

function Image(name) {
  this.name = name;
  this.source = 'img/' + this.name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
  Image.all.push(this);
}

Image.prototype.randomIndex = function() {
  var randomIndex = Math.floor(Math.random() * Image.all.length);
  return randomIndex;
};

Image.numQuestionsAnswered = 0;
Image.names = [document.getElementById('imgOne'), document.getElementById('imgTwo'), document.getElementById('imgThree')];

Image.imgOneEl = document.getElementById('imgOne');
Image.imgTwoEl = document.getElementById('imgTwo');
Image.imgThreeEl = document.getElementById('imgThree');
Image.finalList = document.getElementById('finalList');

Image.all = [];

Image.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

for(var i = 0; i < Image.allNames.length; i++) {
  new Image(Image.allNames[i]);
}



// event handler

function randomImage(e) {

  // add to the number questions answered
  Image.numQuestionsAnswered++;

  // when 25 clicks are reached
  whenDoneAskingQuestions();

  // add to the array of which image is clicked
  for(var i = 0; i < Image.all.length; i++) {
    if(Image.all[i].name === e.target.alt) {
      Image.all[i].timesClicked++;
    }
  }

  // load three photos
  loadPhotos();
}



function whenDoneAskingQuestions() {
  if(Image.numQuestionsAnswered > 25) {
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
    return;
  }
}

function loadPhotos() {
  for(var i = 0; i < Image.names.length; i++) {
    var randomIndex = Image.prototype.randomIndex();
    if (Image.all[randomIndex].name !== Image.names[0].alt && Image.all[randomIndex].name !== Image.names[1].alt) {
      Image.names[i].src = Image.all[randomIndex].source;
      Image.names[i].alt = Image.all[randomIndex].name;
      Image.all[randomIndex].timesShown += 1;
    } else {
      i--;
    }
  }
}


// event listeners
for(var i = 0; i < Image.names.length; i++) {
  Image.names[i].addEventListener('click', randomImage);
}




// initial function
loadPhotos();
