function processViewstate(viewstate){
  console.log("Viewstate: " + viewstate);
  var viewstateDIV = document.getElementById("decoded_viewstate");
  if(viewstate == "NOT FOUND"){
    viewstateDIV.value = "Viewstate not found"
  } else {
    viewstateDIV.value = viewstate;
  }
}

function copyRawToClipboard(){
  var ta = document.getElementById("decoded_viewstate");
  ta.focus();
  ta.select();
  document.execCommand('copy');

  //navigator.clipboard.writeText(document.getElementById("decoded_viewstate").value);
}

function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    try {
      chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        chrome.tabs.sendMessage(activeTab.id, {text: 'get_viewstate'}, processViewstate);
      });
    } catch (error) {
      //Error sending message. Tab may be special.
      console.log("Unable to send message to current tab.")
    }
   });
}

function decodeViewstateBtn() {

  var viewStateText = document.getElementById("decoded_viewstate");

  var buildTree = function(data) {
    var div = document.getElementById("resultTree"),
        item = null,
        spaces = '...........................................................................';

    data.forEach(function(d) {
      item = spaces.substring(0, d.depth()) + ' ' + d.str();
      var p = document.createElement("p");
      p.innerText = item;
      div.append(p);
    });
    console.log(tree);

    return tree;
  }


  var text = viewStateText.value;
  if(text.length) {
    var vs = new ViewState(text);
    if(vs.isValid) {
      vs.consume();
      var c = vs.components(),
          tree = buildTree(c);
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  popup();
  clipElement = document.getElementById("rawClipboard");
  clipElement.addEventListener('click', function() {
    copyRawToClipboard();
  });
  decodeBtn = document.getElementById("decode");

  decodeBtn.addEventListener('click', function() {
    decodeViewstateBtn();
  });



});
