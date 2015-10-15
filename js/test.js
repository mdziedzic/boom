  var tempArray = [];

tempArray.length = 20;
for (var i = 0; i < tempArray.length; i++) {
  tempArray[i] = new Array(8);
}

console.log(tempArray);

var tileArray = new Array(5);

for (i = 0; i < 5; i++) {
  for (j = 0; j < 5; j++) {
    tileArray[i][j] = String(i) + "/" + String(j);
  }
}

