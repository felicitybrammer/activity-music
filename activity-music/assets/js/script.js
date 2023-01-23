var genereList =[];
var songDetailList =[];

/**display all the songs from the API */
function songListDisplay(songtitle,songuri,songartist){
//for css, list class: songlist div id:musicList, each song id: song title;
//button for each song to add to the localstorage, button id: each songuri, buttonclass: addbutton;
//console.log("works!: ");
var musicsection = document.getElementById("musicList");
var musicitem = document.createElement("a");
musicitem.innerHTML = "Title:  "+songtitle+ "\<br>Artist:  "+songartist;
var br = document.createElement("br");
//create button -- add to default folder
var addbutton = document.createElement("button");
addbutton.innerHTML="+ Add to playlist";
addbutton.setAttribute('id',songuri);
addbutton.setAttribute('class','addbutton');
// console.log("songtotle: "+songtitle);


// // create button -- try listen button -- with the other api
// var listenbutton = document.createElement("button");
// listenbutton.innerHTML="Listen";
// listenbutton.setAttribute('id',songuri+"listen");
// listenbutton.setAttribute('class','listenbutton');
// musicsection.appendChild(listenbutton);

musicsection.appendChild(musicitem);
musicsection.appendChild(addbutton);
musicsection.appendChild(br);
musicitem.setAttribute("id",songtitle);
musicitem.setAttribute("class","songlist");
//for develop purpose, should be deleted 
  musicitem.setAttribute("href",songuri);
}

/**display all the genre based on BPM and first 250 */
function songGenreDisplay(genereListToatal){
//for css, genrelist class: genereoption, genrelist div id: genreList, element for each <button>, Button id : shown as html name
for(var j =0; j<genereListToatal.length;j++){
var genresection = document.getElementById("genreList");
var genereitem = document.createElement("button");
genereitem.innerHTML = genereListToatal[j];
genresection.appendChild(genereitem);
genereitem.setAttribute("name",genereitem);
genereitem.setAttribute("id",genereitem);
genereitem.setAttribute("class","genereoption");
}
}

/**remove all display while refresh the search */
function removeall(){
var musicsection = document.getElementById("musicList");
musicsection.innerHTML='';
var genresection = document.getElementById("genreList");
genresection.innerHTML='';
}

/**for genere list to be clickable && change based on genere*/
function clickGenere(){
$('#genreList').on('click', '.genereoption', function(e) {
var generename = e.target.innerHTML;
var genereSongList=[];
//  var testnum =0;
//console.log(generename);
for(var q=0; q<songDetailList.length;q++){
  currentgenere=[];
  currentgenere.push(songDetailList[q][0]);
//  / console.log(currentgenere.length);
  for(var r=0; r<currentgenere.length;r++){
  if(currentgenere[0]!=null&&currentgenere[0][r]==generename){
//    testnum++;
    //console.log("G: "+currentgenere[r]);
    // console.log("title: "+songDetailList[q][1]);
    //console.log(songDetailList[q][0]);
    genereSongList.push(songDetailList[q]);
  } 
}
}
//console.log("num: "+testnum);
  removeall();
for(var p=0; p<genereSongList.length;p++){
    //0. genres,1. songtitle,2. songartist,3. songuri
  songListDisplay(genereSongList[p][1],genereSongList[p][3],genereSongList[p][2]);
} 
})

}
/**list add to local based on addbutton+
 * functionally complete, please let me know what info do you need from here to display music from other API
*/
// for music API developer: 
//num = range of localStorage.length;
// var test= localStorage.getitem(num)-> var temp= test.split(',');->songtitle = temp[0]; -> songArtist = temp[1];
function clickAdd(){
$('#musicList').on('click','.addbutton',function(e){
var songuli = e.target.id;
// var addbutton = document.getElementById(songuli);
//add disable
var localnum = localStorage.length;

//localStorage.clear();// for develop purpose
for(var n=0; n<songDetailList.length;n++){
if(songDetailList[n][3]==songuli){
  var temp=[];
  temp.push("default");//folder
  temp.push(songDetailList[n][1]);//songTitle
  temp.push(songDetailList[n][2]);//songArtist
  localStorage.setItem(localnum,temp);
  var addbutton = document.getElementById(songuli);
  addbutton. disabled = true;
}
}
// localStorage.setItem('default',songuli);

})
}
function clickListen(){
$('#musicList').on('click','.listenbutton',function(e){
var listebbutton = e.target.id;
// https://api.spotify.com
//client ID: 9f83c65c6c7a40f99a42cd7559b83fb2
//client secret: f2538f56b2714286a4d2c6cb238c95e7
console.log("yes,clicked");
fetch('https://api.spotify.com')
.then(response => response.json())
.then(data => console.log(data));


})
}

function nearest(n, v) {
n = n / v;
n = Math.round(n) * v;
return n;
}

$(".searchBtn").on("click", function(event) {
var bpmvalue = $(".search").val(); 
document.querySelector(".search").value ='';
removeall();
//removeall();
// limit the bpm range from 40 to 220
if (bpmvalue < 40) {
bpmvalue = 40;
console.log(bpmvalue);
} 
else if (bpmvalue > 220) {
bpmvalue = 220;
console.log(bpmvalue);
} 
else if (bpmvalue % 5 !== 0) {
  //round to nearest 5 or 10
    bpmvalue = nearest(bpmvalue, 5);
    console.log(bpmvalue);
} 
// limit the bpm range from 40 to 220
if(bpmvalue >=40 &&bpmvalue <=220){

/**api cors solved with extension, rejected fail to fetch problem */
//console.log(data)
fetch('https://api.getsongbpm.com/tempo/?api_key=f3c958b0703b54d22b8335f49728191a&bpm='+bpmvalue)
.then(response => response.json())
.then(data => {
console.log(data);
/**for loop test out the music list to get genera0-250 or list length, 
 * tempo -> get songid -> same songid from artist -> from artist object get genres */
var bpmListLength = data['tempo'].length;
for(var i=0;i<bpmListLength;i++){
var genere = data['tempo'][i]['artist']['genres'];
var songimg = data['tempo'][i]['album']['img'];
var songuri = data['tempo'][i]['song_uri'];
var songid = data['tempo'][i]['song_id'];
var songtitle = data['tempo'][i]['song_title'];
var songartist = data['tempo'][i]['artist']['name'];
// console.log(generaList.length);
var singleDetail =[];
//0. genres,1. songtitle,2. songartist,3. songuri
singleDetail.push(genere);
singleDetail.push(songtitle);
singleDetail.push(songartist);
singleDetail.push(songuri);
//total songlist
songDetailList.push(singleDetail);
//song list display
songListDisplay(songtitle,songuri,songartist);

var diff = $(genere).not(genereList).get();
//console.log("diff: "+diff);
for(var k =0; k<diff.length;k++){
genereList.push(diff[k]);
}
}
//console.log("totalList:"+genereListToatal);
// put the list
songGenreDisplay(genereList);
//console.log("total: "+songDetailList.length);
//console.log("details_test1: "+songDetailList[0]);
//console.log("details_test2: "+songDetailList[0][1]);
})

.catch(error => "error");
}

})


//&tempo='+bmpvalue+'bpm'
//https://api.getsongbpm.com/search/?api_key=YOUR_API_KEY_HERE&type=artist&lookup=green+day"
// &f3c958b0703b54d22b8335f49728191a

clickGenere();
clickAdd();
clickListen();



