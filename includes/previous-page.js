function gotoPreviousPage() {
  history.go(-1);
}

document.getElementById("backbutton").addEventListener("click", gotoPreviousPage);
