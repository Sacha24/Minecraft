$(document).ready(function () {

world = [
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "cloud", "cloud", "cloud", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "cloud", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "rock", "rock", "sky", "tree", "sky", "sky", "rock",],
    ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",]
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

function removePixelBorder(){
    var square = event.currentTarget;
    square.style.border = "none";
}
$(".pixel").on("mouseout", removePixelBorder)


function shovel (){
    var square = event.currentTarget;
    square.classList.replace("grass", "sky")
    square.classList.replace("dirt", "sky")
}
$(".tool.shovel").on("click", function (){
    $(".pixel.dirt").on("click", lastElement)
    $(".pixel.grass").on("click", lastElement)
    $(".tool.shovel").css("background-color","blue")
    $(".tool.pickAxe").css("background-color","black")
    $(".tool.axe").css("background-color","black")
    $(".pixel.dirt").on("click", shovel)
    $(".pixel.grass").on("click", shovel)
    $(".pixel.rock").off("click", pickAxe)
    $(".pixel.tree").off("click", Axe)
    $(".pixel.leaf").off("click", Axe)
})

function pickAxe(){
    var square = event.currentTarget;
    square.classList.replace("rock", "sky")
}
$(".tool.pickAxe").on("click", function (){
    $(".pixel.rock").on("click", lastElement)
    $(".tool.shovel").css("background-color","black")
    $(".tool.pickAxe").css("background-color","blue")
    $(".tool.axe").css("background-color","black")
    $(".pixel.rock").on("click", pickAxe)
    $(".pixel.dirt").off("click", shovel)
    $(".pixel.grass").off("click", shovel)
    $(".pixel.tree").off("click", Axe)
    $(".pixel.leaf").off("click", Axe)
})

function Axe(){
    var square = event.currentTarget;
    square.classList.replace("tree", "sky")
    square.classList.replace("leaf", "sky")
}
$(".tool.axe").on("click", function (){
    $(".pixel.tree").on("click", lastElement)
    $(".pixel.leaf").on("click", lastElement)
    $(".tool.axe").css("background-color","blue")
    $(".tool.shovel").css("background-color","black")
    $(".tool.pickAxe").css("background-color","black")
    $(".pixel.tree").on("click", Axe)
    $(".pixel.leaf").on("click", Axe)
    $(".pixel.dirt").off("click", shovel)
    $(".pixel.grass").off("click", shovel)
    $(".pixel.rock").off("click", pickAxe)
})

var tile = [];
function lastElement() {
    var square = event.currentTarget;
    tile.push(square.className);
    var last = tile[tile.length-1].replace("pixel ","");
    var beforeLast = tile[tile.length-2].replace("pixel ","");
    $(".tile").removeClass(".tile "+ beforeLast).addClass(last)
}

function useLastElement(){
    var square = event.currentTarget;
    var last = tile[tile.length-1].replace("pixel ","");
    square.classList.replace("sky", last)
}
$(".tile").on("click", function(){
/*     $(".pixel").off("click", lastElement) */
    $(".pixel.sky").on("click", useLastElement)
})






});