var genereListToatal =[];

$(".searchBtn").on("click", function(event) {
var bpmvalue = $(".search").val(); 
// limit the bpm range from 40 to 220
if(bpmvalue >40&&bpmvalue<220){
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
 // console.log(generaList.length);
 if(genereList!=null){
  for(var j=0; j<genereList.length;j++){
    var gname = genereList[j];
    //console.log("genera: "+gname);
  }
}
  var diff = $(genereList).not(genereListToatal).get();
  //console.log("diff: "+diff);
  for(var k =0; k<diff.length;k++){
    genereListToatal.push(diff[k]);
  }
}
console.log("totalList:"+genereListToatal);
// put the list
for(var l =0; l<genereListToatal.length;l++){
  var listsection = document.getElementById("list");
  var genereitem = document.createElement("button");
  genereitem.innerHTML = genereListToatal[l];
  list.appendChild(genereitem);
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






