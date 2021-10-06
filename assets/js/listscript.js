var folderList =[];
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
folderList.push(folderName);
localStorage.setItem("folderList",folderList);
folderTitle.setAttribute("id",folderName);
folderTitle.setAttribute("class","displayfolder");
folderTitle.setAttribute("style","margin-top:5px;text-align:center");
folderArea.appendChild(folderTitle);
}
}


//var test= localStorage.getitem(num)-> var temp= test.split(',');->songtitle = temp[0]; -> songArtist = temp[1];
function displaylocal(){
    var songArea = document.getElementById("songList"); 
for(var i=0; i<localStorage.length-1;i++){
    var key = localStorage.getItem("folderList");
    var songitem = localStorage.getItem(i);
    console.log("key: "+key);
    console.log("item: "+songitem);
    if(songitem!=key&& songitem!=null){
    var temp = songitem.split(',');
    var songname = temp[1];
    var songartist = temp[2];
    }
    if(songname!=undefined){
    var div = document.createElement("div");
    div.setAttribute("id",i);
    div.setAttribute("draggable",true);//
    songArea.appendChild(div);

   


    var song = document.createElement("p");
    song.setAttribute("style","line-height: 200%;");
    song.innerHTML = "Song: "+songname+'&nbsp &nbsp &nbsp &nbsp &nbsp'+" Aritist: "+songartist;
    div.appendChild(song);
    }
}
}

//display folders
function displayfolders(){
    var folderlisttemp = localStorage.getItem("folderList");
    if(folderlisttemp!=null){
    var temp = folderlisttemp.split(',');
    var folderArea = document.getElementById("folder");

    for(var i =0; i<folderlisttemp.length;i++){
        var folderName = temp[i];
        if(folderName!=undefined){
        console.log(folderName);
        //d img
    var folderimg = document.createElement("img")
    folderimg.setAttribute("src","./img/musicFolder.png");
    folderimg.setAttribute("style","margin-top:15px;display: block; margin-left: auto; margin-right: auto;");
    folderimg.setAttribute("alt","music folder icon");
    folderimg.setAttribute("ondrop","drop(event)");
    folderimg.setAttribute("ondragover","allowDrop(event)");
    folderimg.setAttribute("width",120);
    folderimg.setAttribute("height",120);
    folderArea.appendChild(folderimg);
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
displaylocal();
displayfolders();