
var element = document.getElementById("__VIEWSTATE");
var encryptedFlag = document.getElementById("__VIEWSTATEENCRYPTED");

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'get_viewstate') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        element = document.getElementById("__VIEWSTATE");
        if (element != null){
          sendResponse(element.value);
        } else {
          sendResponse("NOT FOUND");
        }
    }
});


if(element != null){
  //alert("Viewstate on page!");
  var siteBody = document.getElementsByTagName('body')[0];
  var addedElement = document.createElement('div');
  var exitBtn =  document.createElement('button');
  exitBtn.setAttribute("style", "all: unset; position: fixed;right: 4px; width: 15px;background-color: darkgray;font-size: small;top: 3px;");
  exitBtn.setAttribute("onclick", "document.body.removeChild(this.parentNode)");
  exitBtn.innerHTML = "X";
  addedElement.appendChild(document.createTextNode('VIEWSTATE'));
  addedElement.appendChild(exitBtn);
  addedElement.setAttribute("style", "position: fixed !important;top: 0px !important;z-index: 2147483647 !important;width:  100%;background-color: red !important;text-align: center;font-size: large;font-weight: bold;")
  siteBody.insertBefore(addedElement, siteBody.firstChild);
  //console.log(siteBody);


  if(encryptedFlag != null){
    //TODO: Add decryption/common keys?
    //TODO: Add support to change DIV notification to show encrypted viewstate
    //alert("Encrypted Viewstate!");
  }


}
