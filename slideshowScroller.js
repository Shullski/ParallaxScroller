var animateTranslate = 100;
var currentTranslate = 0;
//Timer for disableing animation
var animationEnabled = true;
//Prevent scrolling into emptiness
var atTop;
var atBottom;
//For parallax transitions
var currentSection = 1;
var previousSection;

function isAtTop() {
  if(currentTranslate == 0) {
    return true;
  }
  return false;
}

function isAtBottom() {
  if(currentTranslate == -300) {
    return true;
  }
  return false;
}

//--- ANIMATION TIMERS ---------------
function throttleAnimation() {
    animationEnabled = false;
    animationTimer = setTimeout(enableAnimation, 1200);
}

function enableAnimation() {
    animationEnabled = true;
}
//-----------------------------------

//PARALLAX EFFECT--------------------
function applyParallax(direction){
  if(direction == 'up') {
    previousSection = currentSection;
    currentSection--;
    $('#' + previousSection).toggleClass('parallaxUnder');
    $('#' + currentSection).toggleClass('parallaxAbove');
  }else if (direction == 'down'){
    previousSection = currentSection;
    currentSection++;
    $('#' + previousSection).toggleClass('parallaxAbove');
    $('#' + currentSection).toggleClass('parallaxUnder');
  }
}
//-----------------------------------

//Translate animations --------------
function translateUp(element) {
  element.css('transform', 'translateY(' + (animateTranslate + currentTranslate) + '%)');
  currentTranslate = currentTranslate + animateTranslate;
}

function translateDown(element) {
  element.css('transform', 'translateY(' + (-animateTranslate + currentTranslate) + '%)');
  currentTranslate = currentTranslate - animateTranslate;
}
//-----------------------------------

$(document).ready(function(){
  animationDiv = $('.container');

  //------ SCROLL WEEL FUNCTIONALITY --------
  $(window).bind('mousewheel DOMMouseScroll', function(event){
    if(animationEnabled){
      atTop = isAtTop();
      atBottom = isAtBottom();

      if (event.originalEvent.wheelDelta >= 0 && !atTop) {
        translateUp(animationDiv);
        applyParallax('up');
        throttleAnimation();
      }
      else if(event.originalEvent.wheelDelta < 0 && !atBottom)  {
        translateDown(animationDiv);
        applyParallax('down');
        throttleAnimation();
      }
    }
  });
  //-----------------------------------------

  //------ KEYBOARD ARROW FUNCTIONALITY -----

  $('body').on( "keydown", function( event ) {
    if(animationEnabled) {
      atTop = isAtTop();
      atBottom = isAtBottom();
      //up arrow pressed
      if(event.which == 38 && !atTop) {
        translateUp(animationDiv);
        applyParallax('up');
        throttleAnimation();
      }
      //down arrow pressed
      else if(event.which == 40 && !atBottom) {
        translateDown(animationDiv);
        applyParallax('down');
        throttleAnimation();
      }
    }
  });
  //-----------------------------------------

  //---------- MOBILE DEVICES ---------------
  $('body').on('swipedown',function(){
    if(animationEnabled) {
      atTop = isAtTop();
      atBottom = isAtBottom();
      //up arrow pressed
      if(!atTop) {
        translateUp(animationDiv);
        applyParallax('up');
        throttleAnimation();
      }
    }
  });

  $('body').on('swipeup',function(){
    if(animationEnabled) {
      atTop = isAtTop();
      atBottom = isAtBottom();
      if(!atBottom) {
        translateDown(animationDiv);
        applyParallax('down');
        throttleAnimation();
      }
    }
  });
  //-----------------------------------------

});
