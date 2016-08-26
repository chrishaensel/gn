/* MODAL FUNC */
function openModal(){
  if (document.getElementById('overlay')) {
    document.getElementById('overlay').style.visibility = "visible";
    document.getElementById('modal').style.visibility = "visible";
  }
}
// close modal
function closeModal() {
  document.getElementById('overlay').style.visibility = "hidden";
  document.getElementById('modal').style.visibility = "hidden";
  document.getElementById('modalContent').innerHTML = '';
  document.getElementById('modelTitle').innerHTML = '';
}

// close modal by pressing esc
document.onkeyup =Esc;
function Esc(){
  var KeyID =event.keyCode;
  if(KeyID==27){
    closeModal();
  }
}
