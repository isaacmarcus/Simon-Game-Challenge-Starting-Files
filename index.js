$("#button").click(function() {
  alert("clicked");
});

function nextSequence() {
  var randNum = Math.floor(Math.random()*3);
  return randNum;
}

console.log(nextSequence());
