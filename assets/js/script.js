var genereListToatal =[];

function songListDisplay(songtitle,songuri,songartist){
  //for css, list class: songlist id:musicList
  console.log("works!: ");
  var musicsection = document.getElementById("musicList");
  var musicitem = document.createElement("a");
  musicitem.innerHTML = "Title:  "+songtitle+"   Artist:  "+songartist;
  var br = document.createElement("br");
  console.log("songtotle: "+songtitle);
  musicsection.appendChild(musicitem);
  musicsection.appendChild(br);
  musicitem.setAttribute("id",songtitle);
  musicitem.setAttribute("class","songlist");
  //for develop purpose, should be deleted 
  musicitem.setAttribute("href",songuri);

}


$(".searchBtn").on("click", function(event) {

var bpmvalue = $(".search").val(); 
// limit the bpm range from 40 to 220
if(bpmvalue >40 &&bpmvalue <220){

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
    var genereList = data['tempo'][i]['artist']['genres'];
    var songimg = data['tempo'][i]['album']['img'];
    var songuri = data['tempo'][i]['song_uri'];
    var songid = data['tempo'][i]['song_id'];
    var songtitle = data['tempo'][i]['song_title'];
    var songartist = data['tempo'][i]['artist']['name'];
 // console.log(generaList.length);
 
 //song list display
  songListDisplay(songtitle,songuri,songartist);

  var diff = $(genereList).not(genereListToatal).get();
  //console.log("diff: "+diff);
  for(var k =0; k<diff.length;k++){
    genereListToatal.push(diff[k]);
  }
}
console.log("totalList:"+genereListToatal);
// put the list
for(var j =0; j<genereListToatal.length;j++){
  var genresection = document.getElementById("genreList");
  var genereitem = document.createElement("button");
  genereitem.innerHTML = genereListToatal[j];
  genresection.appendChild(genereitem);
  genereitem.setAttribute("id",genereitem);
  genereitem.setAttribute("class","genereoption");
}

})

.catch(error => "error");
}
else{
  console.log("should inner HTML write input number error(cannot prompt)");
}
})
//&tempo='+bmpvalue+'bpm'
//https://api.getsongbpm.com/search/?api_key=YOUR_API_KEY_HERE&type=artist&lookup=green+day"
// &f3c958b0703b54d22b8335f49728191a






