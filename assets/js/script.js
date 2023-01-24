//declare let iable
let genreList = []; //list of genre buttons
let songList = []; //playlist of chosen songs

// displays all the songs from the API
// function songListDisplay(songTitle, songUri, songArtist) {
//   //for css, list class: songlist div id:musicList, each song id: song title;
//   //button for each song to add to the localstorage, button id: each songUri, buttonclass: addButton;
//   //console.log("works!: ");
//   let musicSection = document.getElementById("musicList");
//   let musicitem = document.createElement("a");
//   musicitem.innerHTML = "Title:  " + songTitle + "\<br>Artist:  " + songArtist;
//   let br = document.createElement("br");
//   //create button -- add to default folder
//   let addButton = document.createElement("button");
//   addButton.innerHTML = "+ Add to playlist";
//   addButton.setAttribute('id', songUri);
//   addButton.setAttribute('class', 'addButton');
//   // // create button -- try listen button -- with the other api
//   // let listenButton = document.createElement("button");
//   // listenButton.innerHTML="Listen";
//   // listenButton.setAttribute('id',songUri+"listen");
//   // listenButton.setAttribute('class','listenButton');
//   // musicSection.appendChild(listenButton);

//   musicSection.appendChild(musicitem);
//   musicSection.appendChild(addButton);
//   musicSection.appendChild(br);
//   musicitem.setAttribute("id", songTitle);
//   musicitem.setAttribute("class", "songlist");
//   //for develop purpose, should be delet ed 
//   musicitem.setAttribute("href", songUri);
// };

/**display all the genre based on BPM and first 250 */
// function songGenreDisplay(genreListTotal) {
//   //for css, genrelist class: genreOption, genrelist div id: genreList, element for each <button>, Button id : shown as html name

//   // add the list of genres
//   for (let j = 0; j < genreListTotal.length; j++) {
//     let genreSection = document.getElementById("genreList");
//     let genreItem = document.createElement("button");
//     genreItem.innerHTML = genreListTotal[j];
//     genreSection.appendChild(genreItem);
//     genreItem.setAttribute("name", genreItem);
//     genreItem.setAttribute("id", genreItem);
//     genreItem.setAttribute("class", "genreOption");
//   }
// };

/**remove all display while refresh the search */
function removeAll() {
  let musicSection = document.getElementById("musicList");
  musicSection.innerHTML = '';
  let genreSection = document.getElementById("genreList");
  genreSection.innerHTML = '';
}

// /**for genre list to be clickable && change based on genre*/
// function clickGenre() {
//   $('#genreList').on('click', '.genreOption', function (e) {
//     let genreName = e.target.innerHTML;
//     let genreSongList = [];
//     //  let testnum =0;
//     //console.log(genreName);
//     for (let q = 0; q < songList.length; q++) {
//       currentgenre = [];
//       currentgenre.push(songList[q][0]);
//       //  / console.log(currentgenre.length);
//       for (let r = 0; r < currentgenre.length; r++) {
//         if (currentgenre[0] != null && currentgenre[0][r] == genreName) {
//           //    testnum++;
//           //console.log("G: "+currentgenre[r]);
//           // console.log("title: "+songList[q][1]);
//           //console.log(songList[q][0]);
//           genreSongList.push(songList[q]);
//         }
//       }
//     }
//     //console.log("num: "+testnum);
//     removeAll();
//     for (let p = 0; p < genreSongList.length; p++) {
//       //0. genres,1. songTitle,2. songArtist,3. songUri
//       songListDisplay(genreSongList[p][1], genreSongList[p][3], genreSongList[p][2]);
//     }
//   })

// }
// /**list add to local based on addButton+
//  * functionally complet e, please let  me know what info do you need from here to display music from other API
// */
// // for music API developer: 
// //num = range of localStorage.length;
// // let test= localStorage.getitem(num)-> let temp= test.split(',');->songTitle = temp[0]; -> songArtist = temp[1];
// function clickAdd() {
//   $('#musicList').on('click', '.addButton', function (e) {
//     let songUli = e.target.id;
//     // let addButton = document.getElementById(songUli);
//     //add disable
//     let localNum = localStorage.length;

//     //localStorage.clear();// for develop purpose
//     for (let n = 0; n < songList.length; n++) {
//       if (songList[n][3] == songUli) {
//         let temp = [];
//         temp.push("default");//folder
//         temp.push(songList[n][1]);//songTitle
//         temp.push(songList[n][2]);//songArtist
//         localStorage.setItem(localNum, temp);
//         let addButton = document.getElementById(songUli);
//         addButton.disabled = true;
//       }
//     }
//     // localStorage.setItem('default',songUli);

//   })
// }
// function clickListen() {
//   $('#musicList').on('click', '.listenButton', function (e) {
//     let listenButton = e.target.id;
//     // https://api.spotify.com
//     //client ID: 9f83c65c6c7a40f99a42cd7559b83fb2
//     //client secret: f2538f56b2714286a4d2c6cb238c95e7
//     console.log("yes,clicked");
//     fetch('https://api.spotify.com')
//       .then(response => response.json())
//       .then(data => console.log(data));
//   })
// }

// function nearest(n, v) {
//   n = n / v;
//   n = Math.round(n) * v;
//   return n;
// }




function getSongsByBPM(event) {
  event.preventDefault();
  
  let bpmValue = document.getElementById("search").value; //works
  let requestUrl = 'https://api.getsongbpm.com/tempo/?api_key=f3c958b0703b54d22b8335f49728191a&bpm=';
  let bpmSearch = requestUrl + bpmValue;
  //document.querySelector(".search").value = '';
  //removeAll();

  //restrict bpm selection value

  fetch(bpmSearch) 
    .then(response => response.json())
    .then(data => {
      let bpmListLength = data['tempo'].length;
      // console.log(data['tempo'][0]);
      for (let i = 0; i < 5; i++) {
        //collect track information
        let genre = data['tempo'][i]['artist']['genres'][0];
        let songImg = data['tempo'][i]['album']['img'];
        let songUri = data['tempo'][i]['song_uri'];
        let songId = data['tempo'][i]['song_id'];
        let songTitle = data['tempo'][i]['song_title'];
        let songArtist = data['tempo'][i]['artist']['name'];
        
        //songList is an array of objects
        //single song is an object with 6 properties and more properties can be easily added
        let singleSong = {};
        //add these fields to an object singleSong
        singleSong.genre = genre;
        singleSong.songTitle = songTitle;
        singleSong.songUri = songUri;
        singleSong.songArtist = songArtist;
        
       
        //total songlist
        songList.push(singleSong); //this can stay
      };
        //song list display
        //songListDisplay(songTitle, songUri, songArtist);
        console.log('displaying songs');
        console.log(songList); //contains all songs with specified 

        // let diff = $(genre).not(genreList).get();
        
        // //console.log("diff: "+diff);
        // for (let k = 0; k < diff.length; k++) {
        //   genreList.push(diff[k]);
        // };

        //songGenreDisplay(genreList);
        console.log('displaying genres');
      
    })
    .catch(error => console.log('error'));
};

let searchBtn = document.getElementById('searchBtn');
// event listener for initial song search
searchBtn.onclick = getSongsByBPM;



  // limit the bpm range from 40 to 220
  // if (bpmValue < 40) {
  //   bpmValue = 40;
  //   console.log(bpmValue);
  // }
  // else if (bpmValue > 220) {
  //   bpmValue = 220;
  //   console.log(bpmValue);
  // }
  // else if (bpmValue % 5 !== 0) {
  //   //round to nearest 5 or 10
  //   bpmValue = nearest(bpmValue, 5);
  //   console.log(bpmValue);
  // }
  // // limit the bpm range from 40 to 220
  // if (bpmValue >= 40 && bpmValue <= 220) {


//&tempo='+bmpvalue+'bpm'
//https://api.getsongbpm.com/search/?api_key=YOUR_API_KEY_HERE&type=artist&lookup=green+day"
// &f3c958b0703b54d22b8335f49728191a

// clickGenre();
// clickAdd();
// clickListen();



