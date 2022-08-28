
const elem = document. getElementsByTagName("body");

​div1.innerHTML = `<span style="background-color: lime;">Last element</span>`;
document.body.appendChild(div1);

elem. addEventListener("keypress", (event)=> {
if (event. keyCode === 106) { // key code of the keybord key.
event. preventDefault();
const div1 = document.createElement('div');

div1.innerHTML = `<span style="background-color: lime;">Last element</span>`;
document.body.appendChild(div1);

}
});
