var animateTranslate = 100;
var currentTranslate = 0;
//Timer for disableing animation
var animationEnabled = true;
//Prevent scrolling into emptiness
var atTop = true;
var atBottom = false;
//For parallax transitions
var currentSection = 1;
var previousSection;

function isMobile() {
  if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  ){
    return true;
  }
 else {
   return false;
  }
}

function updateIcon(icon){
  if (icon == 'up') {
    if(atTop) icon.fadeOut(fast);
    else icon.fadeIn(fast);
  }
  else if (icon == 'down') {
    if(atBottom) icon.fadeOut(fast);
    else icon.fadeIn(fast);
  }
}

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
  if(isMobile()){
    $('.section').each(function(){
      $(this).addClass('mobile');
    });
  }
  animationDiv = $('.container');
  //icons
  var up = $('.upArrowContainer');
  var down = $('.downArrowContainer');

  //------ SCROLL WEEL FUNCTIONALITY --------
  $(window).bind('mousewheel DOMMouseScroll', function(event){
    if(animationEnabled){
      //Firefox compatibility, .wheelDelta vs .detail
      var delta = (event.detail == 0) ? event.originalEvent.wheelDelta : -event.detail;
      if (delta >= 0 && !atTop) {
        translateUp(animationDiv);
        applyParallax('up');
        throttleAnimation();
      }
      else if(delta < 0 && !atBottom)  {
        translateDown(animationDiv);
        applyParallax('down');
        throttleAnimation();
      }

      atTop = isAtTop();
      atBottom = isAtBottom();
      if(atTop) up.fadeOut('fast');
      else up.fadeIn('fast');
      if(atBottom) down.fadeOut('fast');
      else down.fadeIn('fast');

    }
  });
  //-----------------------------------------

  //------ KEYBOARD ARROW FUNCTIONALITY -----
  $('body').on( "keydown", function( event ) {
    if(animationEnabled) {
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
      atTop = isAtTop();
      atBottom = isAtBottom();
      if(atTop) up.fadeOut('fast');
      else up.fadeIn('fast');
      if(atBottom) down.fadeOut('fast');
      else down.fadeIn('fast');
    }
  });
  //-----------------------------------------

  //---------- ARROW BUTTOMS ----------------
  $('.upArrowContainer').click(function(){
    if(animationEnabled) {
      if(!atTop) {
        translateUp(animationDiv);
        applyParallax('up');
        throttleAnimation();
      }
      atTop = isAtTop();
      atBottom = isAtBottom();
      if(atTop) up.fadeOut('fast');
      else up.fadeIn('fast');
      if(atBottom) down.fadeOut('fast');
      else down.fadeIn('fast');
    }
  });

  $('.downArrowContainer').click(function(){
    if(animationEnabled) {
      if(!atBottom) {
        translateDown(animationDiv);
        applyParallax('down');
        throttleAnimation();
      }
      atTop = isAtTop();
      atBottom = isAtBottom();
      if(atTop) up.fadeOut('fast');
      else up.fadeIn('fast');
      if(atBottom) down.fadeOut('fast');
      else down.fadeIn('fast');
    }
  });
  //-----------------------------------------
});
