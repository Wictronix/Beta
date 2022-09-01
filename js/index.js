// loader
const preloader = document.querySelector('#loader');

// Our Book
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-235px)";
    nextBtn.style.transform = "translateX(235px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                closeBook(false);
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                break;
            case 4:
                openBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                break;
            default:
                throw new Error("unkown state");
        }

        currentLocation--;
    }
}

// Book Popup

const blur = document.querySelector('.blur');
const popup = document.getElementById('popup');
const bookcontainer = document.querySelector('.book-container');
const bookclose = document.querySelector('.close-btn');

popup.addEventListener('click' , () => {
  blur.classList.toggle('book-active');
  bookcontainer.classList.toggle('book-popup');
})

bookclose.addEventListener('click' , () => {
  blur.classList.toggle('book-active');
  bookcontainer.classList.toggle('book-popup');
})


// Toggle Navigation
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const navList = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  navList.classList.add("open");
});

close.addEventListener("click", () => {
  navList.classList.remove("open");
});

// theme
const icons = [...document.querySelectorAll(".theme-icon")];

icons.forEach((icon) => {
  if (icon) {
    icon.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        icon.innerHTML = '<i class="bx bx-sun"></i>';
        icon.style.color = "white";
      } else {
        icon.innerHTML = '<i class="bx bx-moon"></i>';
        icon.style.color = "#121713";
      }
    });
  }
});

// Colors
const widget = document.querySelector(".widget");
const control = document.querySelector(".control");

widget.addEventListener("click", () => {
  control.classList.toggle("open");
});

const colors = [...document.querySelectorAll(".colors span")];
 document.querySelector(":root").style.setProperty("--customColor", "#0088ff");

colors.forEach((color) => {
  color.addEventListener("click", () => {
    const currentColor = color.dataset.id;
    document
      .querySelector(":root")
      .style.setProperty("--customColor", currentColor);
  });
});

window.addEventListener("scroll", () => {
  control.classList.remove("open");
});

// Typeit
new TypeIt("#type1", {
  speed: 120,
  loop: true,
  waitUntilVisible: true,
})
  .type("A Digital Company", { delay: 400 })
  .pause(500)
  .delete(17)
  .go();

// Fix Nav
const navBar = document.querySelector(".navigation");
const navHeight = navBar.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});

// Swiper

const swiper = new Swiper(".right-swiper", {
  // effect: 'coverflow',
  slidesPerView : 2,
  loop: true,
  spaceBetween : 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1200:{
        slidesPerView : 3
    },

    991:{
        slidesPerView : 3
    },

    767:{
        slidesPerView : 2

    },

    576:{
        slidesPerView : 2
    },

    0:{
        slidesPerView : 1
    }
  }
});
// Scroll To

const links = [...document.querySelectorAll(".scroll-link")];

links.map((link) => {
  link.addEventListener("click", (e) => {

    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    let position = element.offsetTop - navHeight;

    window.scrollTo({
      top: position,
      left: 0,
    });

    navList.classList.remove("open");
  });
});

AOS.init();

var sketch = Sketch.create(),
    center = {
      x: sketch.width / 2,
      y: sketch.height / 2
    },
    orbs = [],    
    dt = 1,
    opt = {
      total: 0,
      count: 600,
      spacing: 1,
      speed: 50,
      scale: 2,
      jitterRadius: 0,
      jitterHue: 0,
      clearAlpha: 10,
      toggleOrbitals: true,
      orbitalAlpha: 100,
      toggleLight: true,      
      lightAlpha: 25,
      clear: function(){
        sketch.clearRect( 0, 0, sketch.width, sketch.height ),
        orbs.length = 0; 
      }
    };

var Orb = function( x, y ){
  var dx = ( x / opt.scale ) - ( center.x / opt.scale ),
	    dy = ( y / opt.scale ) - ( center.y / opt.scale );
  this.angle = atan2( dy, dx );
  this.lastAngle = this.angle;
	this.radius = sqrt( dx * dx + dy * dy );
  this.size = ( this.radius / 300 ) + 1;
	this.speed = ( random( 1, 10 ) / 300000 ) * ( this.radius ) + 0.015;
};

Orb.prototype.update = function(){  
  this.lastAngle = this.angle;
  this.angle += this.speed * ( opt.speed / 50 ) * dt;
  this.x = this.radius * cos( this.angle );
  this.y = this.radius * sin( this.angle );
};

Orb.prototype.render = function(){
  if(opt.toggleOrbitals){
    var radius = ( opt.jitterRadius === 0 ) ? this.radius : this.radius + random( -opt.jitterRadius, opt.jitterRadius );
   radius = ( opt.jitterRadius != 0 && radius < 0 ) ? 0.001 : radius;
    sketch.strokeStyle = 'hsla( ' + ( ( this.angle + 90 ) / ( PI / 180 ) + random( -opt.jitterHue, opt.jitterHue ) ) + ', 100%, 50%, ' + ( opt.orbitalAlpha / 100 ) + ' )';
    sketch.lineWidth = this.size;			
    sketch.beginPath();
    if(opt.speed >= 0){
      sketch.arc( 0, 0, radius, this.lastAngle, this.angle + 0.001, false );
    } else {
      sketch.arc( 0, 0, radius, this.angle, this.lastAngle + 0.001, false );
    };
    sketch.stroke();
    sketch.closePath();
  };
  
  if(opt.toggleLight){
    sketch.lineWidth = .5;
    sketch.strokeStyle = 'hsla( ' + ( ( this.angle + 90 ) / ( PI / 180 ) + random( -opt.jitterHue, opt.jitterHue ) ) + ', 100%, 70%, ' + ( opt.lightAlpha / 100 ) + ' )';
    sketch.beginPath();
    sketch.moveTo( 0, 0 );
    sketch.lineTo( this.x, this.y );
    sketch.stroke();
  };
};

var createOrb = function( config ){
  var x = ( config && config.x ) ? config.x : sketch.mouse.x,
      y = ( config && config.y ) ? config.y : sketch.mouse.y;
	orbs.push( new Orb( x, y ) );
};

var turnOnMove = function(){
	sketch.mousemove = createOrb;	
};

var turnOffMove = function(){
	sketch.mousemove = null;	
};

// sketch.mousedown = function(){
//   createOrb();
//   turnOnMove();
// };

sketch.mouseup = turnOffMove;

sketch.resize = function(){
  center.x = sketch.width / 2;
  center.y = sketch.height / 2;
  sketch.lineCap = 'round';
};

sketch.setup = function(){  
  while( opt.count-- ){
    createOrb( {
      x: random( sketch.width / 2 - 300, sketch.width / 2 + 300 ), 
      y: random( sketch.height / 2 - 300, sketch.height / 2 + 300 ) 
    } );
  };
};

sketch.clear = function(){
  sketch.globalCompositeOperation = 'destination-out';
  sketch.fillStyle = 'rgba( 0, 0, 0 , ' + ( opt.clearAlpha / 100 ) + ' )';
	sketch.fillRect( 0, 0, sketch.width, sketch.height );
  sketch.globalCompositeOperation = 'lighter';
};

sketch.update = function(){
  dt = ( sketch.dt < 0.1 ) ? 0.1 : sketch.dt / 16;
  dt = ( dt > 5 ) ? 5 : dt;
  var i = orbs.length;
  opt.total = i;
  while( i-- ){ 
    orbs[i].update();
  }
};

sketch.draw = function(){
  sketch.save();
  sketch.translate( center.x, center.y );
  // sketch.scale( opt.scale, opt.scale );
  var i = orbs.length;
	while( i-- ){	
    orbs[i].render();	
  }
  sketch.restore();
};

gui = new dat.GUI( { autoPlace: true } )
gui.add( opt, 'total' ).name( 'Total Orbitals' ).listen();
gui.add( opt, 'speed' ).min( -300 ).max( 300 ).step( 1 ).name( 'Speed' );
gui.add( opt, 'scale' ).min( 0.5 ).max( 5 ).step( 0.001 ).name( 'Scale' );
gui.add( opt, 'jitterRadius' ).min( 0 ).max( 5 ).step( 0.001 ).name( 'Radius Jitter' );
gui.add( opt, 'jitterHue' ).min( 0 ).max( 90 ).step( 1 ).name( 'Hue Jitter' );
gui.add( opt, 'clearAlpha' ).min( 0 ).max( 100 ).step( 1 ).name( 'Clear Alpha' );
gui.add( opt, 'toggleOrbitals' ).name( 'Toggle Orbitals' )
gui.add( opt, 'orbitalAlpha' ).min( 0 ).max( 100 ).step( 1 ).name( 'Orbital Alpha' );
gui.add( opt, 'toggleLight' ).name( 'Toggle Light' );
gui.add( opt, 'lightAlpha' ).min( 0 ).max( 100 ).step( 1 ).name( 'Light Alpha' );

gui.add( opt, 'clear' ).name( 'Clear' );
customContainer = document.getElementById( 'gui' );
customContainer.appendChild(gui.domElement);
  
document.onselectstart = function(){
  return false;
};

// Color Changer 

var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cH;
var cW;
var bgColor = "#FF6138";
var animations = [];
var circles = [];

var colorPicker = (function() {
  var colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
  var index = 0;
  function next() {
    index = index++ < colors.length-1 ? index : 0;
    return colors[index];
  }
  function current() {
    return colors[index]
  }
  return {
    next: next,
    current: current
  }
})();

function removeAnimation(animation) {
  var index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
}

function calcPageFillRadius(x, y) {
  var l = Math.max(x - 0, cW - x);
  var h = Math.max(y - 0, cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

function addClickListeners() {
  document.addEventListener("touchstart", handleEvent);
  document.addEventListener("mousedown", handleEvent);
};

function handleEvent(e) {
    if (e.touches) { 
      e.preventDefault();
      e = e.touches[0];
    }
    var currentColor = colorPicker.current();
    var nextColor = colorPicker.next();
    var targetR = calcPageFillRadius(e.pageX, e.pageY);
    var rippleSize = Math.min(200, (cW * .4));
    var minCoverDuration = 750;
    
    var pageFill = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: nextColor
    });
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration:  Math.max(targetR / 2 , minCoverDuration ),
      easing: "easeOutQuart",
      complete: function(){
        bgColor = pageFill.fill;
        removeAnimation(fillAnimation);
      }
    });
    
    var ripple = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: currentColor,
      stroke: {
        width: 3,
        color: currentColor
      },
      opacity: 1
    });
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 900,
      complete: removeAnimation
    });
    
    var particles = [];
    for (var i=0; i<32; i++) {
      var particle = new Circle({
        x: e.pageX,
        y: e.pageY,
        fill: currentColor,
        r: anime.random(24, 48)
      })
      particles.push(particle);
    }
    var particlesAnimation = anime({
      targets: particles,
      x: function(particle){
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function(particle){
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1000,1300),
      complete: removeAnimation
    });
    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

function extend(a, b){
  for(var key in b) {
    if(b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

var Circle = function(opts) {
  extend(this, opts);
}

Circle.prototype.draw = function() {
  ctx.globalAlpha = this.opacity || 1;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    ctx.strokeStyle = this.stroke.color;
    ctx.lineWidth = this.stroke.width;
    ctx.stroke();
  }
  if (this.fill) {
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
  ctx.closePath();
  ctx.globalAlpha = 1;
}

var animate = anime({
  duration: Infinity,
  update: function() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cW, cH);
    animations.forEach(function(anim) {
      anim.animatables.forEach(function(animatable) {
        animatable.target.draw();
      });
    });
  }
});

var resizeCanvas = function() {
  cW = window.innerWidth;
  cH = window.innerHeight;
  c.width = cW * devicePixelRatio;
  c.height = cH * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
};

(function init() {
  resizeCanvas();
  if (window.CP) {
    // CodePen's loop detection was causin' problems
    // and I have no idea why, so...
    window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
  }
  window.addEventListener("resize", resizeCanvas);
  addClickListeners();
  if (!!window.location.pathname.match(/fullcpgrid/)) {
    startFauxClicking();
  }
  handleInactiveUser();
})();

function handleInactiveUser() {
  var inactive = setTimeout(function(){
    fauxClick(cW/2, cH/2);
  }, 2000);
  
  function clearInactiveTimeout() {
    clearTimeout(inactive);
    document.removeEventListener("mousedown", clearInactiveTimeout);
    document.removeEventListener("touchstart", clearInactiveTimeout);
  }
  
  document.addEventListener("mousedown", clearInactiveTimeout);
  document.addEventListener("touchstart", clearInactiveTimeout);
}

function startFauxClicking() {
  setTimeout(function(){
    fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
    startFauxClicking();
  }, anime.random(200, 900));
}

function fauxClick(x, y) {
  var fauxClick = new Event("mousedown");
  fauxClick.pageX = x;
  fauxClick.pageY = y;
  document.dispatchEvent(fauxClick);
}