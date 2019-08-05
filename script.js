var canvas = document.querySelector('canvas');
canvas.width = window.screen.width;
canvas.height = document.getElementById("showroom").offsetHeight;

var c = canvas.getContext('2d');


var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 70;

var colorArray = [
    '#00001D',
    '#010D2D',
    '#091C3F',
    '#22406D',
    '#77B9F2',
];

window.addEventListener('mousemove', 
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(){
    canvas.width = window.screen.width;
    canvas.height = document.getElementById("showroom").offsetHeight;
    console.log(document.getElementById("showroom").offsetHeight);
    
    init();
})

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
    
        this.y += this.dy;
        this.x += this.dx;
    
       if(mouse.x - this.x < 80 && mouse.x - this.x > -80 && mouse.y - this.y  < 80 && mouse.y - this.y > -50){
        if(this.radius < maxRadius){
            this.radius += 1;
        }   
       } else if(this.radius > this.minRadius) {
           this.radius -= 1;
       }
       
    }
}

var circleArray = [];

function init(){

    circleArray = [];

    for(var i = 0; i < 700; i++){
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 1;
        var dy = (Math.random() - 0.5) * 1;
        var radius = Math.random() * 3 + 1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    
    c.fillStyle = '#69667e';
    c.fillRect(0,0,window.innerWidth, window.innerHeight);

    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].draw();
        circleArray[i].update();
    }
    

}

init();
animate();