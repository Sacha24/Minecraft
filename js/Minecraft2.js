$(document).ready(function () {

world = [
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "cloud", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky", "sky",],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky", "sky",],
    ["sky", "rock", "rock", "rock", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky", "sky",],
    ["sky", "rock", "sky", "rock", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "sky", "sky", "sky", "sky",],
    ["sky", "rock", "sky", "rock", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "tree", "sky", "sky", "sky", "sky",],
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

function openTutorial() {
    $(".tutoContent").css("display","block")
    $(".closeTuto").css("display","block")
}
$("#tutorial").on("click",openTutorial)

function closeTutorial() {
    $(".tutoContent").css("display","none")
    $(".closeTuto").css("display","none")
}
$(".closeTuto").on("click",closeTutorial)


var tile = [];  // stock all the elements I took off
var useTile = false; // if true, the user can use the last element (tile) without using tools 
var toolSelected = ""; 
var elementSelected = ""; // element selected in the inventory


function pickTool(){
    useTile = false;
    $(".pixel").off("click", useInventory);
    $(".tool").css("background-color", "white");
    toolSelected = event.target
    toolSelected.style.backgroundColor = "green"
    toolSelected = event.target.classList[1]
    $(".pixel").on("click", playWithElements)
}
$(".tool").on("click", pickTool)


function playWithElements() {
    if(!useTile){
        var square = event.target;
        last = square.classList[1];
        // stock only the elements that I allow to take off according the tool I selected
        if((toolSelected === "shovel" && last === "grass")   
        ||(toolSelected === "shovel" && last === "dirt")){
            tile.push(square.classList[1]);
            $(".tile").removeClass().addClass("tile " + last)
            square.classList.replace("grass", "sky");
            square.classList.replace("dirt", "sky");
        }
        if(toolSelected === "pickAxe" && last === "rock"){
            tile.push(square.classList[1]);
            $(".tile").removeClass().addClass("tile " + last);
            square.classList.replace("rock", "sky");
        }
        if((toolSelected === "axe" && last === "leaf")
        ||(toolSelected === "axe" && last === "tree")){
            tile.push(square.classList[1]);
            $(".tile").removeClass().addClass("tile " + last);
            square.classList.replace("tree", "sky");
            square.classList.replace("leaf", "sky");
        }
        stockInventory()
    }
    else{
        tile_type = $(".tile")[0].classList[1];
        if(this.classList[1] === "sky" && tile_type !== undefined){
            $(this).attr('class', 'pixel ' + tile_type);
            $(".tile").removeClass(tile_type)
        }
        else{
            $(this).attr('class', this.classList);
        }
    }
}
$(".pixel").on("click", playWithElements);
$(".tile").on("click", function(){
    useTile = true;
    $(".tool").css("background-color","white")
})

function pickInventory(){
    $(".tool").css("background-color", "white")
    elementSelected = event.target;
    elementSelected = event.target.classList[1];
    $(".pixel").on("click", useInventory)
}
$(".inventory").on("click", pickInventory)

function stockInventory() {
    counter = 0;
    $(".inventory." + last).empty()
    for (var i = 0; i < tile.length; i++) {
        if(tile[i] === last){
            counter++
        }
    }
    $(".inventory." + last).append(counter)
}

function useInventory() {
    if(tile.includes(elementSelected)){
        counter = 0;
        $(".pixel").off("click", playWithElements);
        $(".inventory." + elementSelected).empty()
        if(this.classList[1] === "sky"){
            $(this).attr('class', 'pixel ' + elementSelected);
            var index = tile.indexOf(elementSelected);
            tile.splice(index, 1);
        }
        else{
            $(this).attr('class', this.classList);
        }
        for (var i = 0; i < tile.length; i++){
            if(tile[i] === elementSelected){
                counter++
            }
        }
        $(".inventory." + elementSelected).append(counter)
    }
    console.log(tile)
}
$(".pixel").on("click", useInventory)
});