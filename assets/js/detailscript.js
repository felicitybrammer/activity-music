var folderName = localStorage.getItem("pageName");
console.log(folderName);
/**
 * <h1 class="folderTitle" id="folderTitle"></h1>
<div>
    <ul id="unSonglist" class="unSonglist">
      
    </ul>
</div>

 */

//display folder title on the top
/**for the title of the folder should display on the top of the page: 
 * id&class: folderTitle
 */
h1 = document.getElementById("folderTitle");
h1.innerHTML = folderName;

displayfoldermusic()

// display the playlist
/**for each list item, class: folderSongList, for the entire order: class&id: unSonglist */
function displayfoldermusic(){
for(var i=0; i<localStorage.length;i++){
    var key = localStorage.getItem("folderList");
    var songitem = localStorage.getItem(i);
    // console.log("key: "+key);
    //console.log("item: "+songitem);
    
    if(songitem!=key&& songitem!=null){
      var temp = songitem.split(',');
      if(temp[0]==folderName){
    var songname = temp[1];
    var songartist = temp[2];
    console.log("song: "+songname+songartist);
  
    if(songname!=undefined){
    var ulist = document.getElementById("unSonglist");
    var li = document.createElement("li");
    li.innerHTML = "Song: "+songname+'&nbsp &nbsp &nbsp &nbsp &nbsp'+" Artist: "+songartist;
    li.setAttribute("id",songname+","+songartist+","+"li");
    li.setAttribute("draggable",true);
    li.setAttribute("style","line-height: 200%;");
    li.setAttribute("class","folderSongList");
    ulist.appendChild(li);
    }
}
}
}
}
/**drag and drop function for item to change order */
var item = null;

function handleDragStart(e) {
    item = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); 
    }
    e.dataTransfer.dropEffect = 'move'; 
    return false;
}
function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');  
}
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); 
    }

    if (item != this) {
       
        item.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}
function handleDragEnd(e) {
    [].forEach.call(items, function (col) {
        col.classList.remove('over');
    });
}

var items = document.querySelectorAll('#unSonglist .folderSongList');
[].forEach.call(items, function (litem) {
    litem.addEventListener('dragstart', handleDragStart, false);
    litem.addEventListener('dragenter', handleDragEnter, false)
    litem.addEventListener('dragover', handleDragOver, false);
    litem.addEventListener('dragleave', handleDragLeave, false);
    litem.addEventListener('drop', handleDrop, false);
    litem.addEventListener('dragend', handleDragEnd, false);
});


