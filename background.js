let color = '#3aa757';
let obj1,data1;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

var selectedTxt = "";

let div1=null;

function executeDisplayingMeaningScript(data, obj1) {
  
  console.log(data);
  const meanings = data[0].meanings;

  const defn = meanings[0].definitions[0].definition;
  const part_of_speech = meanings[0].partOfSpeech;
  const sourceUrl = data[0].sourceUrls[0];
  console.log(sourceUrl);

  var div1 = document.getElementById("meaning_Div");

  if(div1 == null){
    console.log('inside div = null');
    div1 = document.createElement('div');
    div1.setAttribute("id","meaning_Div");
 document.body.appendChild(div1);
}
  
  let tp = window.pageYOffset;
  let left=0;
  if(obj1.top< 120){
    tp=tp+obj1.top+  "px";
  
  }
  else{
    tp=(tp+obj1.top-119) +"px";
  }
  left=obj1.left -56 +"px";


  div1.innerHTML = `<span style =
  "background-color: #ffbcb5; 
   padding: 5px;
   border-radius: 10px;
  height:100px; width:180px;
  position: absolute;
  top: ${tp}; 
  left:${left}; 
  font-size: 11px;
  box-shadow: 3px 3px 8px #4a4e4e;"
  >
  <strong>
   <u>
  Meaning</u>: 
  
  </strong>
  ${defn} <br>
  <strong>
   <u>
  Part of Speech</u>:  
  </strong>
  ${part_of_speech}<br><br>


  <a href = ${sourceUrl} target = "_blank" style = "
   border-radius: 36px;
  background: #fa7268;
  padding: 5px;
  text-align: center;
  color: white;
  text-decoration: none;
  font-family: 'Heebo', sans-serif;
  font-size: 11px;
  font-weight: 400;
}" >
  Click for More
  </a>


  </span>`;


}



const setData = (data,obj) => {


  obj1 = obj;
  
  
  console.log(data,obj1);

  chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(d){
    tabId =  (d[0].id);
  
    chrome.scripting.executeScript(
      {
        target: {tabId: tabId},
        function: executeDisplayingMeaningScript,
        args: [data , obj1]
      },
      () => {});
  })
 
}

const removeDiv = ()=>{
  var div1 = document.getElementById("meaning_Div");
  console.log(div1);
  div1.remove();
}

const removeData = () => {

  chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(d){
    tabId =  (d[0].id);
  console.log("in remove data");
    chrome.scripting.executeScript(
      {
        target: {tabId: tabId},
        function: removeDiv
      },
      () => {});
  })
  
}



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    if (request.method === "hello"){
    console.log(request.text);
      selectedTxt = request.text;
      const obj = request.obj;
      const word = request.text;
      if(word)
      {fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(response => response.json())
  .then(data => setData(data,obj));
     }



      sendResponse({farewell: "goodbye"});}

    if (request.method === "clickEvent"){
         removeData();
  
        sendResponse({farewell: "goodbye"});
      }
  }
);


