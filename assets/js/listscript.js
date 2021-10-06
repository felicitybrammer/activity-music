

document.getElementById('addFolder').onclick = function addFolder(){
// console.log("you clicked me, add folder");
var folderName = $('.folderName').val();//get folder name
document.querySelector('.folderName').value = '';
if(folderName.length==0){
    var errormessage = "please enter a valid name";
    var messagebox = document.getElementById("messagebox");
    messagebox.innerHTML = errormessage;
    messagebox.setAttribute("style","color: red; font-size: medium;");
}
else{
var messagebox = document.getElementById("messagebox");
messagebox.innerHTML='';
var folderArea = document.getElementById("folder");

//c img
var folderimg = document.createElement("img")
folderimg.setAttribute("src","./img/musicFolder.png");
folderimg.setAttribute("style","margin-top:15px;display: block; margin-left: auto; margin-right: auto;");
folderimg.setAttribute("alt","music folder icon");
folderimg.setAttribute("width",120);
folderimg.setAttribute("height",120);
folderArea.appendChild(folderimg);
//c name
var folderTitle = document.createElement("h2")
folderTitle.innerHTML=folderName;
folderTitle.setAttribute("id",folderName);
folderTitle.setAttribute("class","displayfolder");
folderTitle.setAttribute("style","margin-top:5px;text-align:center");
folderArea.appendChild(folderTitle);
}
}

//var test= localStorage.getitem(num)-> var temp= test.split(',');->songtitle = temp[0]; -> songArtist = temp[1];
function displaylocal(){
    var songArea = document.getElementById("songList"); 
for(var i=0; i<localStorage.length;i++){
    var songitem = localStorage.getItem(i)
    var temp = songitem.split(',');
    var songname = temp[1];
    var songartist = temp[2];

    var div = document.createElement("div");
    div.setAttribute("id",i);
    div.setAttribute("draggable",true);
    songArea.appendChild(div);

    var song = document.createElement("p");
    song.setAttribute("style","line-height: 200%;");
    song.innerHTML = "Song: "+songname+'&nbsp &nbsp &nbsp &nbsp &nbsp'+" Artist: "+songartist;
    div.appendChild(song);

}

}




    
   
    document.getElementById('locationBtn').onclick = function checkWeather() {
        console.log('button clicked');

        var city = $('.locationText').val();
        console.log(city);
        //document.querySelector('.locationText').value = '';

        fetch(
            'http://api.weatherapi.com/v1/current.json?key=44ade762643049cc9b433612210610&q='+city+'&aqi=no')
        .then(function(response) {
        return response.json();
        })
        .then (function(data) {
        console.log(data);
        var weatherContainerEl = document.getElementById('weather-container');
        weatherContainerEl.innerHTML = '';
        var currentTitle = document.createElement('h2');
        var currentWeather = document.createElement('p');
        currentTitle.innerHTML = 'Current Weather Conditions in ' + city + ':';
        currentWeather.innerHTML = 'Temp in Celsius:'+data.current.temp_c+' C'+'Feels like:'+data.current.feelslike_c+' C'+'Precipitation:'+data.current.precip_mm+' mm';
       
        // currentTitle.setAttribute(
        // currentWeather.setAttribute('innerHTML', data.current);
        weatherContainerEl.appendChild(currentTitle);
        weatherContainerEl.appendChild(currentWeather);
        })
        .catch(error => "error");
    };    


/** */
displaylocal();

