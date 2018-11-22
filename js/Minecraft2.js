$(document).ready(function () {

world = [
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "cloud", "cloud", "cloud", "cloud", "cloud", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "cloud", "cloud", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "rock", "rock", "sky", "tree", "sky", "sky", "rock", "sky", "sky", "sky",],
    ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
    ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",]
];

function generateWorld (world) {
    var rows = "<div class='row justify-content-end'>";
    world.forEach((w,i) => {  $("#world").append(rows), 
        w.forEach((s, j)=>{$(".row:nth-child("+ i + ")").append("<div class='pixel " + world[i][j] + "'>")} )})
}
generateWorld(world);

function startGame(){
    $("#world").css("display","block")
    $("button").css("display", "none")
}
$("#startGame").on("click", startGame)

var toolSelected = ""  // get the tool I selected
function pickTool(){
    $(".tool").css("background-color", "black")
    toolSelected = event.target;
    toolSelected.style.backgroundColor = "blue"
    toolSelected = event.target.classList[1];
}
$(".tool").on("click", pickTool)


var useTile = false;
var tile = [];  // stock all the elements I took off
function getLastElement() {
    if(!useTile){
        var square = event.target;
        tile.push(square.classList[1]);
        last = square.classList[1];
        // stock only the elements that I allow to take off according the tool I selected
        if((toolSelected === "shovel" && last === "grass")   
        ||(toolSelected === "shovel" && last === "dirt")){
            $(".tile").removeClass().addClass("tile " + last)
            square.classList.replace("grass", "sky");
            square.classList.replace("dirt", "sky");
        }
        if(toolSelected === "pickAxe" && last === "rock"){
            $(".tile").removeClass().addClass("tile " + last);
            square.classList.replace("rock", "sky");
        }
        if((toolSelected === "axe" && last === "leaf")
        ||(toolSelected === "axe" && last === "tree")){
            $(".tile").removeClass().addClass("tile " + last);
            square.classList.replace("tree", "sky");
            square.classList.replace("leaf", "sky");
        }
    }
    else{
        $(".tool").css("background-color","black")
        tile_type = $(".tile")[0].classList[1];
        if(this.classList[1] === "sky"){
            $(this).attr('class', 'pixel ' + tile_type);
        }
        else{
            $(this).attr('class', this.classList);
        }
        useTile = false;
    }
}
$(".pixel").on("click", getLastElement);

function useLastElement() {
    var square = event.target;
    var last = tile[tile.length-1].replace("pixel ","");
    square.classList.replace("sky", last);
    $(".tile."+last).removeClass(last)
    $(".pixel.sky").off("click", useLastElement)
}

$(".tile").on("click", function(){
    useTile = true;
})
});