var weatherdata;
var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var input;
var apiKey = '&appid=ad6e239ec0ac58d0a9836e942aac97eb';
var units = '&cnt=16&units=metric';
var canvas;
var Rdrop = [];
var Sdrop = [];
var Cdrop = [];
var paddingImg;
var coatImg;
var manImg;
var shirtImg;
var tshirtImg;
var nasiImg;
var item;

function setup() {
    canvas = createCanvas(1400, 700);
    canvas.position(20, 50);
    var button = select('#submit');
    button.mousePressed(CallWeather);
    input = select('#city');
        paddingImg = loadImage("penguin1.png");
         coatImg = loadImage("penguin2.png");
         manImg = loadImage("penguin3.png");
         shirtImg = loadImage("penguin4.png");
        tshirtImg = loadImage("penguin5.png");
         nasiImg = loadImage("penguin6.png");
    item = loadImage("umbrella.png");
}

function CallWeather() {
    var url = api + input.value() + apiKey + units;
    loadJSON(url, gotData);
}

function gotData(data) {
    weatherdata = data;

    for (var j = 0; j < 100; j++) {
        Rdrop[j] = new RainDrop();
    }

    for (var k = 0; k < 100; k++) {
        Sdrop[k] = new SnowDrop();
    }

    for (var k = 0; k< 20; k++) {
        Cdrop[k] = new CloudsDrop();
    }
}

function draw() {
    clear();
    textAlign(CENTER);
    if (weatherdata) {
        var todaytemp = weatherdata.main.temp;
        var todaymin = weatherdata.main.temp_min;
        var todaymax = weatherdata.main.temp_max;
        noStroke();
        textSize(60);
        fill(255, 255, 255);
        text(weatherdata.name, 160, 100);
        //City Name
        textSize(30);
        fill(255);
        text(floor(todaytemp) + "\u2103", 160, 130);
        // average temp
        textSize(17);
        text("Max:" + floor(todaymax) + "\u2103", 160, 160);
        text("Min:" + floor(todaymin) + "\u2103", 160, 180);
        // max and min temp

        //different penguin images according to the temperature
        if (todaytemp <= -3){
            image(paddingImg, width/2.5, height/2,  paddingImg.width/2.5, paddingImg.height/2.5);
                    fill(255,255,255);
                    rect(width/3 -50,height/2 - 60,180,60,10);
                    fill(0,0,0);
                    text("It's so cold today!", width/3+40, height/2-30);
                    text("Please wear a padding!", width/3+40, height/2-15);  
                    fill(255,255,255);
                    textSize(18);
                    text(weatherdata.name,width/2-50, height/2+150);         
        }
        else if ( (-3 < todaytemp) && (todaytemp <= 10)){
            image(coatImg, width/2.5, height/2,  paddingImg.width/2.5, paddingImg.height/2.5);
            fill(255,255,255);
                    rect(width/3 -50,height/2 - 60,180,60,10);
                    fill(0,0,0);
                    text("It's a little cold today!", width/3+40, height/2-30);
                    text("You can wear a coat!", width/3+40, height/2-15);  
                    fill(255,255,255);
                    textSize(15);
                    text(weatherdata.name,width/2, height/2+210);
        }
        else if ( (10 < todaytemp) && (todaytemp <= 20)){
            image(manImg, width/2.5, height/2,  paddingImg.width/2.5, paddingImg.height/2.5);
            fill(255,255,255);
                    rect(width/3 -50,height/2 - 60,180,60,10);
                    fill(0,0,0);
                    text("Its a cool weather!", width/3+40, height/2-30);
                    text("You can wear man to man!", width/3+40, height/2-15);  
                    fill(255,255,255);
                    textSize(18);
                    text(weatherdata.name,width/2-50, height/2+180);
        }
        else if ( (20 < todaytemp) && (todaytemp <= 25)){
            image(shirtImg, width/2.5, height/2,  paddingImg.width/2.5, paddingImg.height/2.5);
            fill(255,255,255);
                    rect(width/3 -50,height/2 - 60,180,60,10);
                    fill(0,0,0);
                    text("Its a great weather!", width/3+40, height/2-30);
                    text("You can wear shirts!", width/3+40, height/2-15);  
                    fill(255,255,255);
                    textSize(15);
                    text(weatherdata.name,width/2+5, height/2+180);
        }
        else if ( (25 < todaytemp) && (todaytemp <= 30)){
            image(tshirtImg, width/2.5, height/2,  paddingImg.width/2.5, paddingImg.height/2.5);
            fill(255,255,255);
                    rect(width/3 -50,height/2 - 60,180,60,10);
                    fill(0,0,0);
                    text("Its a little hot today!", width/3+40, height/2-30);
                    text("You can wear t-shirts!", width/3+40, height/2-15);  
                    fill(255,255,255);
                    textSize(18);
                    text(weatherdata.name,width/2-50, height/2+170);
        }
        else{
            image(nasiImg, width/2.5, height/2,  paddingImg.width/2.5, paddingImg.height/2.5);
            fill(255,255,255);
                    rect(width/3 -50,height/2 - 60,180,60,10);
                    fill(0,0,0);
                    text("Its very hot today!", width/3+40, height/2-30);
                    text("You can wear nanings!", width/3+40, height/2-15);  
                 
        }
        
        
        


        var d = new Date();
        var c = d.getHours();
        if (c <= 12){
            fill(255,255-c*10,0);
        }
        else {
            fill(255,100+10*(c-12),0);
        }
        ellipse(width - 200, 100, 100, 100); // sun changing colors

        // background color changes as day and night changes
        if( (7 <= c) && (c <= 18) ){
            var t = select('.selectcity');
            t.style("backgroundColor", "#7EC0EE");
        }
        else{
            var t = select('.selectcity');
            t.style("backgroundColor", "#16191e");
        }

        // weather animation scenes
        if (weatherdata.weather[0].main == "Rain") {
            for (var j = Rdrop.length - 1; j >= 0; j--) {
                Rdrop[j].show();
                Rdrop[j].fall();
                image(item, width/2 -75, height/2-95,  item.width/2.5, item.height/2.5);
             } // raining scene
        }
        if (weatherdata.weather[0].main == "Snow") {
            for (var j = Sdrop.length - 1; j >= 0; j--) {
                Sdrop[j].show();
                Sdrop[j].fall();
            } //snowing scene
        } 

        if (weatherdata.weather[0].main == "Clouds") {
            for (var j = Cdrop.length - 1; j >= 0; j--) {
                Cdrop[j].show();
                Cdrop[j].fall();
            } //clouding scene
        }
    }
}

function RainDrop() {
    this.x = random(0, width);
    this.y = random(-1000, 0);
    this.show = function() {
        stroke(255, 255,255);
        line(this.x, this.y, this.x, this.y + 10);
        if (this.y > height) {
            this.y = 0;
        }
    };
    this.fall = function() {
        this.y = this.y + 2;
    };
}

function SnowDrop() {
    this.x = random(0, width);
    this.y = random(-1000,0);
    var s = random(5, 10);
    this.show = function() {
        fill(255, 255, 255);
        ellipse(this.x, this.y, s, s);
        if (this.y > height) {
            this.y = 0;
        }
    };
    this.fall = function() {
        this.y = this.y + 1.5;
    };
}

function CloudsDrop() {
    this.x = random(0, width);
    this.y = random(50,250);
    this.show = function() {
        fill(255, 255, 255, 80);
        noStroke();
        arc(this.x, this.y, 100, 50, PI + TWO_PI, TWO_PI);
        arc(this.x + 10, this.y, 100, 100, PI + TWO_PI, TWO_PI);
        arc(this.x + 25, this.y, 100, 80, PI + TWO_PI, TWO_PI);
        arc(this.x + 60, this.y, 120, 50, PI + TWO_PI, TWO_PI);
        if (this.x > width) {
            this.x = 200;
        }
    };
    this.fall = function() {
        this.x = this.x + 1.5;
    };
}
