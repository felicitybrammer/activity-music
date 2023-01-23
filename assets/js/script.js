var genreList = [];
var songDetailList = [];

/**display all the songs from the API */
function songListDisplay(songTitle, songUri, songArtist) {
  //for css, list class: songlist div id:musicList, each song id: song title;
  //button for each song to add to the localstorage, button id: each songUri, buttonclass: addButton;
  //console.log("works!: ");
  var musicSection = document.getElementById("musicList");
  var musicitem = document.createElement("a");
  musicitem.innerHTML = "Title:  " + songTitle + "\<br>Artist:  " + songArtist;
  var br = document.createElement("br");
  //create button -- add to default folder
  var addButton = document.createElement("button");
  addButton.innerHTML = "+ Add to playlist";
  addButton.setAttribute('id', songUri);
  addButton.setAttribute('class', 'addButton');
 


  // // create button -- try listen button -- with the other api
  // var listenButton = document.createElement("button");
  // listenButton.innerHTML="Listen";
  // listenButton.setAttribute('id',songUri+"listen");
  // listenButton.setAttribute('class','listenButton');
  // musicSection.appendChild(listenButton);

  musicSection.appendChild(musicitem);
  musicSection.appendChild(addButton);
  musicSection.appendChild(br);
  musicitem.setAttribute("id", songTitle);
  musicitem.setAttribute("class", "songlist");
  //for develop purpose, should be deleted 
  musicitem.setAttribute("href", songUri);
}

/**display all the genre based on BPM and first 250 */
function songGenreDisplay(genreListTotal) {
  //for css, genrelist class: genreOption, genrelist div id: genreList, element for each <button>, Button id : shown as html name

  // add the list of genres
  for (var j = 0; j < genreListTotal.length; j++) {
    var genreSection = document.getElementById("genreList");
    var genreItem = document.createElement("button");
    genreItem.innerHTML = genreListTotal[j];
    genreSection.appendChild(genreItem);
    genreItem.setAttribute("name", genreItem);
    genreItem.setAttribute("id", genreItem);
    genreItem.setAttribute("class", "genreOption");
  }
}

/**remove all display while refresh the search */
function removeAll() {
  var musicSection = document.getElementById("musicList");
  musicSection.innerHTML = '';
  var genreSection = document.getElementById("genreList");
  genreSection.innerHTML = '';
}

/**for genre list to be clickable && change based on genre*/
function clickGenre() {
  $('#genreList').on('click', '.genreOption', function (e) {
    var genreName = e.target.innerHTML;
    var genreSongList = [];
    //  var testnum =0;
    //console.log(genreName);
    for (var q = 0; q < songDetailList.length; q++) {
      currentgenre = [];
      currentgenre.push(songDetailList[q][0]);
      //  / console.log(currentgenre.length);
      for (var r = 0; r < currentgenre.length; r++) {
        if (currentgenre[0] != null && currentgenre[0][r] == genreName) {
          //    testnum++;
          //console.log("G: "+currentgenre[r]);
          // console.log("title: "+songDetailList[q][1]);
          //console.log(songDetailList[q][0]);
          genreSongList.push(songDetailList[q]);
        }
      }
    }
    //console.log("num: "+testnum);
    removeAll();
    for (var p = 0; p < genreSongList.length; p++) {
      //0. genres,1. songTitle,2. songArtist,3. songUri
      songListDisplay(genreSongList[p][1], genreSongList[p][3], genreSongList[p][2]);
    }
  })

}
/**list add to local based on addButton+
 * functionally complete, please let me know what info do you need from here to display music from other API
*/
// for music API developer: 
//num = range of localStorage.length;
// var test= localStorage.getitem(num)-> var temp= test.split(',');->songTitle = temp[0]; -> songArtist = temp[1];
function clickAdd() {
  $('#musicList').on('click', '.addButton', function (e) {
    var songUli = e.target.id;
    // var addButton = document.getElementById(songUli);
    //add disable
    var localNum = localStorage.length;

    //localStorage.clear();// for develop purpose
    for (var n = 0; n < songDetailList.length; n++) {
      if (songDetailList[n][3] == songUli) {
        var temp = [];
        temp.push("default");//folder
        temp.push(songDetailList[n][1]);//songTitle
        temp.push(songDetailList[n][2]);//songArtist
        localStorage.setItem(localNum, temp);
        var addButton = document.getElementById(songUli);
        addButton.disabled = true;
      }
    }
    // localStorage.setItem('default',songUli);

  })
}
function clickListen() {
  $('#musicList').on('click', '.listenButton', function (e) {
    var listenButton = e.target.id;
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

$(".searchBtn").on("click", function (event) {
  var bpmValue = $(".search").val();
  document.querySelector(".search").value = '';
  removeAll();
  //removeAll();
  // limit the bpm range from 40 to 220
  if (bpmValue < 40) {
    bpmValue = 40;
    console.log(bpmValue);
  }
  else if (bpmValue > 220) {
    bpmValue = 220;
    console.log(bpmValue);
  }
  else if (bpmValue % 5 !== 0) {
    //round to nearest 5 or 10
    bpmValue = nearest(bpmValue, 5);
    console.log(bpmValue);
  }
  // limit the bpm range from 40 to 220
  if (bpmValue >= 40 && bpmValue <= 220) {

    /**api cors solved with extension, rejected fail to fetch problem */
    //console.log(data)
    fetch('https://api.getsongbpm.com/tempo/?api_key=f3c958b0703b54d22b8335f49728191a&bpm=' + bpmValue)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        /**for loop test out the music list to get genera0-250 or list length, 
         * tempo -> get songid -> same songid from artist -> from artist object get genres */
        var bpmListLength = data['tempo'].length;
        for (var i = 0; i < bpmListLength; i++) {
          var genre = data['tempo'][i]['artist']['genres'];
          var songImg = data['tempo'][i]['album']['img'];
          var songUri = data['tempo'][i]['song_uri'];
          var z = data['tempo'][i]['song_id'];
          var songTitle = data['tempo'][i]['song_title'];
          var songArtist = data['tempo'][i]['artist']['name'];
          // console.log(generaList.length);
          var singleDetail = [];
          //0. genres,1. songTitle,2. songArtist,3. songUri
          singleDetail.push(genre);
          singleDetail.push(songTitle);
          singleDetail.push(songArtist);
          singleDetail.push(songUri);
          //total songlist
          songDetailList.push(singleDetail);
          //song list display
          songListDisplay(songTitle, songUri, songArtist);

          var diff = $(genre).not(genreList).get();
          //console.log("diff: "+diff);
          for (var k = 0; k < diff.length; k++) {
            genreList.push(diff[k]);
          }
        }
        //console.log("totalList:"+genreListTotal);
        // put the list
        songGenreDisplay(genreList);
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

clickGenre();
clickAdd();
clickListen();



