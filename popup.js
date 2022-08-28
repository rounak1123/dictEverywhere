let changeColor = document.getElementById("changeColor");
let wordToFind = document.getElementById("wordToFind");
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// changeColor.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: setPageBackgroundColor,
//     });
//   });
  
  // The body of this function will be executed as a content script inside the
  // current page
  // function setPageBackgroundColor() {
  //   chrome.storage.sync.get("color", ({ color }) => {
  //     document.body.style.backgroundColor = color;
  //   });
  // }


const setData =(data)=>{
const meanings = data[0].meanings;

wordToFind.innerText = meanings[0].definitions[0].definition;

}

  changeColor.addEventListener("click", async () => {
  
    chrome.runtime.sendMessage({'method':'getInfo'},function(response){
      //response is now the info collected by the content script.
      console.log(response.data);
      const word = response.data;
      if(word)
      {fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(response => response.json())
  .then(data => setData(data));
     }
      // chrome.scripting.executeScript({
      //   target: { tabId: tab.id },
      //   function: setPageBackgroundColor,
      // });
    });

  
  });


 