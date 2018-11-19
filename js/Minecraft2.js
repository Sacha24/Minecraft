$(document).ready(function () {

world = [
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "cloud", "cloud", "cloud", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky",],
    ["sky", "sky", "sky", "cloud", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "sky", "sky", "sky",],
    ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",]
];

function generateWorld (world) {
    for (var i = 0; i < world.length; i++) {
        $("#world").append("<div class='row justify-content-center'>");
        for (var j = 0; j < world[0].length; j++) {
            $(".row:nth-child("+ i + ")").append(`<div class='pixel ${world[i][j]}'>`);
        }
    }
}

function start() {
    generateWorld(world);
}
start();

function pixelBorder(){
    var square = event.currentTarget;
    square.style.border = "1px solid white";
}
$(".pixel").on("mouseover", pixelBorder)

function removeWhiteBorder(){
    var square = event.currentTarget;
    square.style.border = "none";
}
$(".pixel").on("mouseout", removeWhiteBorder)


function shovel (){
    var square = event.currentTarget;
    square.classList.replace("grass", "sky")
    square.classList.replace("dirt", "sky")
}
$(".tool.shovel").on("click", function (){
    $(".tool.shovel").css("background-color", "blue")
    $(".pixel.dirt").on("click", shovel)
    $(".pixel.grass").on("click", shovel)
})











});