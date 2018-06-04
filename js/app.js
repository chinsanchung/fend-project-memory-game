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
//star element.
//const stars = document.querySelector('.stars');
const stars = document.querySelector('.stars');
//container element.
const container = document.querySelector('.container');
//count makes to move new page if all cards are matched
let count = 0;
//starCount helps to change stars.
let starCount = 0;

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
  count = 0;
  starCount = 0;
  if (finalStar === 2) {
    stars.children[0].innerHTML = `<i class="fa fa-star"></i>`;
  } else if (finalStar === 1) {
    stars.children[0].innerHTML = `<i class="fa fa-star"></i>`;
    stars.children[1].innerHTML = `<i class="fa fa-star"></i>`;
  }
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
    deck.style.pointerEvents = 'none';
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
          starCount += 1;
          starGrade();
          if (count === 8) {
            stopTime();
            setTimeout(function () {success();}, 2000);
          }
        } else {
          setTimeout(function ()
            { falseClass(ev.target) }, 700);
          setTimeout(function ()
            { falseClass(show[0]) }, 700);
          //change moves
          moves.innerHTML = parseInt(moves.innerText) + 1;
          starCount += 1;
          starGrade();
        }
      }
      deck.style.pointerEvents = 'auto';
    }, 1100);
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
  }, 700);
}

//It will be used to show timer.
let second = 0;
let minute = 0;
let timeCheck = setInterval(timer, 1000);
//function : timer
function timer () {
  second += 1;

  if (second === 60) {
    minute += 1;
    second = 0;
  }
  let time = `${minute}:${second}`;
  document.querySelector('.timer').innerHTML = time;
}
function stopTime () {
  clearInterval(timeCheck);
}

/* function : star grade. if moves are higher than 8, stars will change colors.
For test, I reduced starCount number in switch statement to case 3, case 5.*/
//This star is white star. It will be used to change <ul class="star">
const newStar = `<i class="fa fa-star-o"></i>`;
//This variable gives value to the final score page.
let finalStar = 0;
function starGrade () {
  switch (starCount) {
    case 3:
      console.log(starCount);
      stars.children[0].innerHTML = newStar;
      finalStar = 2
      break;
    case 5:
      console.log(starCount);
      stars.children[1].innerHTML = newStar;
      finalStar = 1
      break;
  }
}

//function that appearing message when all cards are matched.
function successMessage () {
  //It helps to give value at resultPage.
  let score = parseInt(moves.innerText);
  // let score = parseInt(moves.innerText);
  document.body.innerHTML = '';
  swal({
    title: 'Success!',
    text: `You have ${score} moves and ${finalStar} stars left!`,
    type: 'success',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Try again'
  }).then((result) => {
    if (result.value) {
      restartButton();
    }
  });
}
//It makes to reset stars element.
const oldStar = `<i class="fa fa-star"></i>`;
//function that restart memory game again.
function restartButton () {
  document.body.innerHTML = '';
  shuffle(arrayCards);

  for (const card of arrayCards) {
    card.classList.remove('open', 'show', 'match');
    deck.appendChild(card);
  }
  //reset moves, starCount, minute, second
  moves.innerHTML = 0;
  count = 0;
  starCount = 0;
  minute = 0;
  second = 0;
  //reset star elements
  stars.children[0].innerHTML = oldStar;
  stars.children[1].innerHTML = oldStar;

  setInterval(timer, 1000);
  document.body.appendChild(container);

}

//success function that starts successMessage function.
function success () {
  successMessage();
}
