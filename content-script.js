console.log('hellooo');
let obj;
const getSelectedText =()=>{
    var selectedText = '';
  
    // window.getSelection
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    }
    // document.getSelection
    else if (document.getSelection) {
        selectedText = document.getSelection().toString;
    }
    // document.selection
    else if (document.selection) {
        selectedText = 
        document.selection.createRange().text;
    } 
    // console.log(selectedText,"hmmmmmm");
    console.log(window.getSelection());
    console.log(document.getSelection());
    console.log(document.selection);
    obj = window.getSelection().getRangeAt(0).getBoundingClientRect();
    return selectedText;

}



window.addEventListener('keypress',(key)=>{
    const txt = getSelectedText();
    // console.log(txt);
    // const val = key.target.offset().left;
    console.log(key);
    console.log(window.getSelection());
    
    if(txt && key.code == 'Enter'){
        chrome.runtime.sendMessage({method: "hello",text: txt,obj : obj}, function(response) {
            console.log(response.farewell);
          });
        
        
    }
});

window.addEventListener('click',()=>{
    const txt = getSelectedText();
     if(!txt)   {
    console.log('Inside Click' , txt);

        chrome.runtime.sendMessage({method: "clickEvent",text: txt});
        }
    
});

