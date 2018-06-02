//array of all cards
let arrayCards = Array.from(document.getElementsByClassName('card'));
//cards which card's className has 'show'
const show = document.getElementsByClassName('show');
//element of div restart
const restart = document.querySelector('.restart');
//ul class deck
const deck = document.querySelector('.deck');
//card's correctly matching number
const moves = document.querySelector('.moves');
//star element. I don't understand role of this.
//const star = document.querySelector('.fa-star');

const container = document.querySelector('.container');
//count makes to move new page if all cards are matched
let count = 0;

//failed event : function shuffle cards to add shuffle event
// 01
// function randomDeck () {
//   for (const card of cards) {
//     deck.appendChild(card);
//   }
// }
//02
// function randomDeck () {
//   shuffle(cards);
//   for (const card of cards) {
//     if (card.childNodes[1].className === 'open') {
//       card.childNodes[1].classList.remove('open');
//     } else if (card.childNodes[1].className === 'show') {
//       card.childNodes[1].classList.remove('show');
//     } else {
//       card.childNodes[1].classList.remove('match');
//     }
//   }
//   moves.innerHTML = 0;
// }

//Add event : shuffle cards

restart.addEventListener('click', function (e) {
  e.preventDefault();

  shuffle(arrayCards);
  //empty all cards
  deck.innerHTML = '';
  //and input shuffled cards
  for (card of arrayCards) {
    //remove open, show, match class to initialize cards
    card.classList.remove('open', 'show', 'match');
    deck.appendChild(card);
  }
  moves.innerHTML = 0;
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/* I used setTimeout method to give enough time to have animations. */
//Add event : open and close card
deck.addEventListener('click', function (ev) {
  ev.preventDefault();
  if ((ev.target.className !== 'open') || (ev.target.className !== 'match')) {
    ev.target.classList.add('open', 'show');
    // ev.target.style.animationName = 'click';
    //get li that className is 'card open show' and give setTimeout. It needs time that second card have animation.
    setTimeout(function () {
      if (show.length === 2) {
        if(show[0].children[0].classList.value === show[1].children[0].classList.value) {
          //change show's first element
          trueClass(ev.target);
          //set show[0] not show[1]. show has one HTMLCollection because one of show was deleted before
          trueClass(show[0]);
          //change moves
          moves.innerHTML = parseInt(moves.innerText) + 1;
          count += 1;
          if (count === 8) {
            setTimeout(function () {success();}, 2000);
          }
        } else {

          setTimeout(function ()
            { falseClass(ev.target) }, 800);
          setTimeout(function ()
            { falseClass(show[0]) }, 800);
          //change moves
          moves.innerHTML = parseInt(moves.innerText) + 1;

        }
      }
    }, 1600);
  }

});

//Add event : matching

//change cards if they are same
function trueClass (target) {
  target.classList.add('match');
  target.classList.remove('show', 'open');
}
//change cards if they aren't same
function falseClass (target) {
  target.classList.remove('show', 'open');
  target.classList.add('wrong');
  setTimeout(function () {
    target.classList.remove('wrong');
  }, 800);
}

//failed function : matching
// function matching (targets) {
//   if(show[0].childNodes[1].className === show[1].childNodes[1].className) {
//     trueClass(show[0]);
//     trueClass(show[1]);
//     moves.innerHTML = parseInt(moves.innerText) + 1
//
//   } else {
//     falseClass(show[0]);
//     falseClass(show[1]);
//   }
// }

//It will be used to give value at resultPage.
let score = parseInt(moves.innerText);

//function that appearing message when all cards are matched.
function successMessage () {
  let resultPage = '';
  let score = parseInt(moves.innerText);
  resultPage += `<div class="success" style="text-align:center; width:300px; height:300px; margin-left: 800px;">
  <h1 class="message">Congratulation!!</h1>
  <p class="message">You have ${score} moves to win the game!</p>
  <button class="restart" onclick="restartButton()">Restart</button>`;
  document.body.innerHTML = resultPage;
}

//function that restart memory game again.
/* I used this loop again because restartButton() excutes shuffle(arrayCards). It needs to input shuffled cards to HTML.
This codes has problem. It sometimes makes error when two cards are not matched.
 (Error is that moves add two counts, not one. And Console says "Uncaught TypeError: Cannot read property 'classList' of undefined
  at falseClass (app.js:117) at app.js:97)
But strange thing is that this restartButton works well sometimes. I can't find the reason. Why this problem happes? */
function restartButton () {
  document.body.innerHTML = '';
  shuffle(arrayCards);
  //note. this part sometimes makes error.
  // for (const card of arrayCards) {
  //   card.classList.remove('open', 'show', 'match');
  //   deck.appendChild(card);
  // }
  // moves.innerHTML = 0;

  document.body.appendChild(container);
}

//success function that starts successMessage function.
function success () {
  successMessage();
}
