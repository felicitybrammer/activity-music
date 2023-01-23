var folderList=[];
var dragitem;
/**click function for add folder*/
document.getElementById('addFolder').onclick = function addFolder(){
// console.log("you clicked me, add folder");
var folderName = $('.folderName').val();//get folder name
document.querySelector('.folderName').value = '';
if(folderName.length==0){
var errormessage = "Please enter a valid name.";
var messagebox = document.getElementById("messagebox");
messagebox.innerHTML = errormessage;
messagebox.setAttribute("style","color: red; font-size: medium;");
}
else{
var messagebox = document.getElementById("messagebox");
messagebox.innerHTML='';
folderList.push(folderName);
localStorage.setItem("folderList",folderList);


localrefresh();
}
}
/**make sure won't erase history first when refresh the page */
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
function addtoFolder(click_id){
var id = click_id;
var tempid = id.split(',');
var folderid = tempid[0]+tempid[1];
var tempname = tempid[0];
var tempartist = tempid[1];
var select = document.getElementById(folderid+"select");
var resultfolder = select.options[select.selectedIndex].text;
//console.log(tempid[0]+"artist:"+tempid[1]);
//console.log("folder: "+resultfolder);
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


/**delete from the list and re-key the list after that
 */
function deletefromList(click_id){
var id = click_id;
console.log(id);
var tempid = id.split(',');
//var folderid = tempid[0]+tempid[1];
var tempname = tempid[0];
var tempartist = tempid[1];
for(var i=0; i<localStorage.length;i++){
var llength = localStorage.length;
var key = localStorage.getItem("folderList");
var songitem = localStorage.getItem(i);
if(songitem!=key&& songitem!=null){
  var temp = songitem.split(',');
var songname = temp[1];
var songartist = temp[2];
if(songname == tempname && songartist==tempartist){
  localStorage.removeItem(i);
  var num =i+1;
  for(var j=num; j<llength;j++){
    var s =[];
    var st = localStorage.getItem(j);
    if(st!=key&& st!=null){
    var songtemp = st.split(',');
    var songfolder = songtemp[0];
    var songnametemp = songtemp[1];
    var songartisttemp = songtemp[2];
    localStorage.removeItem(j);
    s.push(songfolder);
    s.push(songnametemp);
    s.push(songartisttemp);
    localStorage.setItem(j-1,s);
    }
  }
  }
}
}
localrefresh();
}
/**delete the folder, as well as all the songs in the folders */
function deletefolder(click_id){
  var id = click_id;
  var tempid = id.split(',');
  var tempfolderid = tempid[0];
 // console.log(tempfoldername);
  var key = localStorage.getItem("folderList");
  console.log("id: "+id);
  var keytemp = key.split(',');
  //console.log(keytemp[0]);
  for(var i=0; i<keytemp.length;i++){
    //console.log("id: "+id);
    //console.log(keytemp[i]);
    if(keytemp[i]==tempfolderid){
      keytemp.splice (i, 1);
     // console.log("key2: "+key);
      localStorage.setItem("folderList",keytemp);
    }
  }
  for(var i=0; i<localStorage.length;i++){
    var llength = localStorage.length;
    var key = localStorage.getItem("folderList");
    var songitem = localStorage.getItem(i);
    if(songitem!=key&& songitem!=null){
      var temp = songitem.split(',');
    var songfolder = temp[0];//the current song folder
    if(songfolder == tempfolderid){//check with the deleted one
      localStorage.removeItem(i);
      var num =i+1;
      for(var j=num; j<llength;j++){
        var s =[];
        var st = localStorage.getItem(j);
       console.log(st);
        }
      }
    }
    localrefresh();
    }
    
    }






/**refesh local display to let the new folder showing to the dropdown list  */
function localrefresh(){
var songArea = document.getElementById("songList"); 
songArea.innerHTML = '';
var folderArea = document.getElementById("folder");
folderArea.innerHTML='';
displaylocal();
displayfolders();
}
/**display the selection -> drop down list, and clickable submit button
 * input, class name: inputclass
 * option, class name: optionclass
 * select, classname: selectclass
 */
function displayselection(songname,songartist){
var songArea = document.getElementById("songList");
var div = document.createElement("div");
//var form = document.createElement("form");
//form.setAttribute("id",songname+songartist+"form");
var label = document.createElement("label");
label.innerHTML = "";
var select = document.createElement("select");
select.setAttribute("class","selectclass");
select.setAttribute("id",songname+songartist+"select");
var folderlisttemp = localStorage.getItem("folderList");
if(folderlisttemp!=null){
var temp = folderlisttemp.split(',');

for(var i =0; i<temp.length;i++){

  var folderName = temp[i];
  if(folderName!=undefined){
    var option = document.createElement("option");
    option.setAttribute('value',folderName);
    option.setAttribute('class','optionclass')
    option.innerHTML = folderName;
    select.appendChild(option)
    var input = document.createElement("input");
  input.setAttribute("id",songname+","+songartist+","+"input");
    //console.log(input.id);
  input.setAttribute("onclick","addtoFolder(this.id)");
  input.setAttribute("class","inputclass");
  input.setAttribute("type","submit");
  input.setAttribute("value","Add to playlist");
  input.setAttribute("style","display:inline;");   

  }
}
div.appendChild(input);
// div.appendChild(del);
}
label.appendChild(select);
//div.appendChild(form);
div.appendChild(label);
songArea.appendChild(div);
}
/**
 * 
 * @param {*} folder_id 
 * display into another html file, make the useful information into the localStorage
 */
function checkfolder(folder_id){
var id = folder_id;
console.log(id);
localStorage.setItem("pageName",id);

}
//var test= localStorage.getitem(num)-> var temp= test.split(',');->songtitle = temp[0]; -> songArtist = temp[1];
/**display localstorage of songs and artist, in the default folder */
function displaylocal(){
var songArea = document.getElementById("songList"); 
var h2 = document.createElement("h2");
h2.innerHTML = "Unorganized Song List";
var p = document.createElement("p");
p.setAttribute("id","displaySong");
songArea.appendChild(p);
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
//console.log(songname);
//var form = document.createElement("form");
//div.appendChild(form);
//label
    //create delete button for the song
    var del = document.createElement("button");
    del.innerHTML='Remove song';
    del.setAttribute("id",songname+","+songartist+","+"del");
    del.setAttribute("onclick","deletefromList(this.id)");
  del.setAttribute("class","delclass");
    del.setAttribute("value","delete");
  div.appendChild(del);


displayselection(songname,songartist);
}
}
}
}

/**display folders */
function displayfolders(){

var folderlisttemp = localStorage.getItem("folderList");
if(folderlisttemp!=null){
var temp = folderlisttemp.split(',');
var folderArea = document.getElementById("folder");

for(var i =0; i<temp.length;i++){
    var folderName = temp[i];
    if(folderName!=undefined){

    //d name
    /**the folder list class name: displayfolder */
    var folderTitlea = document.createElement("a");
    folderTitlea.setAttribute("id",folderName);
    folderTitlea.setAttribute("onclick","checkfolder(this.id)");
    folderTitlea.setAttribute("href","./songdetail.html")
var folderTitle = document.createElement("li");
folderTitle.innerHTML=folderName;
//folderTitle.setAttribute("id",folderName);
//folderTitle.setAttribute("onclick","checkfolder(this.id)");
folderTitle.setAttribute("class","displayfolder");
folderTitle.setAttribute("style","margin-top:5px;text-align:center");
folderTitlea.appendChild(folderTitle);
folderArea.appendChild(folderTitlea);

//create delete button for the folders
var delfolder = document.createElement("button");
delfolder.innerHTML='Delete playlist';
delfolder.setAttribute("id",folderName+","+"del");
delfolder.setAttribute("onclick","deletefolder(this.id)");
delfolder.setAttribute("class","defolderlclass");
delfolder.setAttribute("value","delete");
folderArea.appendChild(delfolder);
}
}
}
}

/** functions*/
init();
displaylocal();
displayfolders();


/** display for the weather API */ 
  document.getElementById('locationBtn').onclick = function checkWeather() {
      console.log('button clicked');

      var city = $('.locationText').val();
      console.log(city);
      //document.querySelector('.locationText').value = '';

      fetch(
          'https://api.weatherapi.com/v1/current.json?key=44ade762643049cc9b433612210610&q='+city+'&aqi=no')
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
      currentWeather.innerHTML = 'Temp in Celsius:'+data.current.temp_c+'C'+' Feels like:'+data.current.feelslike_c+'C'+' Precipitation:'+data.current.precip_mm+' mm';
      var lon = data.location.lon;
      var lan = data.location.lat
      console.log("lon: "+lon+"lan: "+lan)
      /**use google map to get the same location as weather*/
     var options= {
      center: { lat: lan, lng: lon },
      zoom: 15,
    }
    var map = new google.maps.Map(document.getElementById('map'),options);
    
    

      weatherContainerEl.appendChild(currentTitle);
      weatherContainerEl.appendChild(currentWeather);
      })
      .catch(error => "error");
  };  

  
 
 
