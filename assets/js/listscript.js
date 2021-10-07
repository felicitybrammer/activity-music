var folderList=[];
var dragitem;
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
/*
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
folderTitle.innerHTML=folderName;*/

folderList.push(folderName);
localStorage.setItem("folderList",folderList);
localrefresh();
/*
folderTitle.setAttribute("id",folderName);
folderTitle.setAttribute("class","displayfolder");
folderTitle.setAttribute("style","margin-top:5px;text-align:center");
folderArea.appendChild(folderTitle);
}*/
}
}
function init(){
  var folderlisttemp = localStorage.getItem("folderList");
if(folderlisttemp!=null){
var temp = folderlisttemp.split(',');
for(var i =0; i<temp.length;i++){
    var fn = temp[i];
    if(fn!=undefined){
      folderList.push(fn);
 
}
}
}
}
/** let the song added to the new folder
 * change to different folder name of local storage temp[0]
*/
function clickfunction(click_id){
  var id = click_id;
  var tempid = id.split(',');
  var folderid = tempid[0]+tempid[1];
  var tempname = tempid[0];
  var tempartist = tempid[1];
  var select = document.getElementById(folderid+"select");
  var resultfolder = select.options[select.selectedIndex].text;
  console.log(tempid[0]+"artist:"+tempid[1]);
  console.log("folder: "+resultfolder);
  for(var i=0; i<localStorage.length;i++){
    var key = localStorage.getItem("folderList");
    var songitem = localStorage.getItem(i);
    if(songitem!=key&& songitem!=null){
      var temp = songitem.split(',');
    var songname = temp[1];
    var songartist = temp[2];
    if(songname == tempname && songartist==tempartist){
      localStorage.removeItem(i);
      var templist =[];
      templist.push(resultfolder);
      templist.push(songname);
      templist.push(songartist);
      localStorage.setItem(i,templist);
    }
    }
}
localrefresh();
}
/**refesh local display to let the new folder showing to the dropdown list  */
function localrefresh(){
  var songArea = document.getElementById("songList"); 
  songArea.innerHTML = '';
  displaylocal();
}

function displayselection(songname,songartist){
  var songArea = document.getElementById("songList");
  var div = document.createElement("div");
  //var form = document.createElement("form");
  //form.setAttribute("id",songname+songartist+"form");
  var label = document.createElement("label");
  label.innerHTML = "select folder";
  var select = document.createElement("select");
  select.setAttribute("id",songname+songartist+"select");

  var folderlisttemp = localStorage.getItem("folderList");
  if(folderlisttemp!=null){
  var temp = folderlisttemp.split(',');

  for(var i =0; i<temp.length;i++){
      var folderName = temp[i];
      if(folderName!=undefined){
        var option = document.createElement("option");
        option.setAttribute('value',folderName);
        option.innerHTML = folderName;
        select.appendChild(option)
        var input = document.createElement("input");
        input.setAttribute("id",songname+","+songartist+","+"input");
        console.log(input.id);
      input.setAttribute("onclick","clickfunction(this.id)");
      input.setAttribute("type","submit");
      input.setAttribute("value","submit");
      input.setAttribute("style","display:inline;");   
      
      }
    }
    div.appendChild(input);
  }
 
  label.appendChild(select);
  //div.appendChild(form);
  div.appendChild(label);
  songArea.appendChild(div);

}
//var test= localStorage.getitem(num)-> var temp= test.split(',');->songtitle = temp[0]; -> songArtist = temp[1];
function displaylocal(){
    var songArea = document.getElementById("songList"); 
for(var i=0; i<localStorage.length;i++){
    var key = localStorage.getItem("folderList");
    var songitem = localStorage.getItem(i);
   // console.log("key: "+key);
    //console.log("item: "+songitem);
    
    if(songitem!=key&& songitem!=null){
      var temp = songitem.split(',');
      if(temp[0]=="default"){
    var songname = temp[1];
    var songartist = temp[2];
    }

    if(songname!=undefined){
    var div = document.createElement("div");
    div.setAttribute("id",i);
    div.setAttribute("class",song)
    //div.setAttribute("draggable",true);//
    songArea.appendChild(div);

    var song = document.createElement("p");
    song.setAttribute("style","line-height: 200%;");
    song.innerHTML = "Song: "+songname+'&nbsp &nbsp &nbsp &nbsp &nbsp'+" Artist: "+songartist;
    div.appendChild(song);
    console.log(songname);
    //var form = document.createElement("form");
    //div.appendChild(form);
    //label
    displayselection(songname,songartist);
    }
  }
}
}
/* draggable
$(document).ready (function(){
  $('#songList div').draggable({
    helper:'clone',
    revert: "valid",
  })
})
*/


//display folders
function displayfolders(){
    var folderlisttemp = localStorage.getItem("folderList");
    if(folderlisttemp!=null){
    var temp = folderlisttemp.split(',');
    var folderArea = document.getElementById("folder");

    for(var i =0; i<temp.length;i++){
        var folderName = temp[i];
        if(folderName!=undefined){
     
        //d img display
    var folderimg = document.createElement("img")
    folderimg.setAttribute("src","./img/musicFolder.png");
    folderimg.setAttribute("style","margin-top:15px;display: block; margin-left: auto; margin-right: auto;");
    folderimg.setAttribute("alt","music folder icon");
    folderimg.setAttribute("id",folderName);
    //folderimg.setAttribute("name",folderName);//draggable[0].outerText
     folderimg.setAttribute("width",120);
    folderimg.setAttribute("height",120);
    folderArea.appendChild(folderimg);
    
/*droppable
    document.getElementById(folderName).droppable({
      drop:function(event, ui){
        $('#folder').append(ui.draggable);
        //song 1- test1 -> 
        console.log(event.target.id);
      },
    
      
    })
    */
   
        //d name
    var folderTitle = document.createElement("h2")
    folderTitle.innerHTML=folderName;
    folderTitle.setAttribute("id",folderName);
    folderTitle.setAttribute("class","displayfolder");
    folderTitle.setAttribute("style","margin-top:5px;text-align:center");
    folderArea.appendChild(folderTitle);
}
    }
}
}

/** */
init();
displaylocal();
//displayfolders();



    
  /** display for the weather API */ 
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



