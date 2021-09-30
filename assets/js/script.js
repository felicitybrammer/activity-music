

$(".searchBtn").on("click", function(event) {
var bpmvalue = $(".search").val(); 
console.log(bpmvalue);

/**api cors solved with extension, rejected fail to fetch problem */
  fetch('https://api.getsongbpm.com/tempo/?api_key=f3c958b0703b54d22b8335f49728191a&bpm='+bpmvalue)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => "error");
 
})
//&tempo='+bmpvalue+'bpm'
//https://api.getsongbpm.com/search/?api_key=YOUR_API_KEY_HERE&type=artist&lookup=green+day"
// &f3c958b0703b54d22b8335f49728191a


  




