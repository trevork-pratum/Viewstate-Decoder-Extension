//REGEX for common secrets
var secrets = ["BEGIN DSA PRIVATE KEY",
"BEGIN EC PRIVATE KEY",
"BEGIN OPENSSH PRIVATE KEY",
"BEGIN PGP PRIVATE KEY BLOCK",
"BEGIN PRIVATE KEY",
"BEGIN RSA PRIVATE KEY",
"BEGIN SSH2 ENCRYPTED PRIVATE KEY",
"PuTTY-User-Key-File-2",
"password",
"MSSQL",
"MySQL",
"MariaDB",
"database",
"root",
"administrator",
"secret",
"^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$",
"(?<=:\/\/)[a-zA-Z0-9]+:[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+",
"bearer [a-zA-Z0-9_\\-\\.=]+",
"basic [a-zA-Z0-9_\\-:\\.=]+",
"[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)",
"\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\b"];



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

  //Search for common secrets using regex
  var viewstateRAW = atob(element.value);
  for (s in secrets) {
    var re = new RegExp(secrets[s]);
    var regexTest = re.test(viewstateRAW);
    if(regexTest == true){
      //alert("Found secret in Viewstate!");
      console.log("Found secret in viewstate matching: " + secrets[s]);
    }
  }


  if(encryptedFlag != null){
    //TODO: Add decryption/common keys?
    //TODO: Add support to change DIV notification to show encrypted viewstate
    //alert("Encrypted Viewstate!");
  }


}
