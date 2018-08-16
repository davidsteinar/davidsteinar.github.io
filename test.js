var model_url = "https://github.com/davidsteinar/nynefni/blob/master/models/IS_male_3gram.json";

fetch(model_url)
  .then(response => response.json())
  .then(data => sessionStorage.setItem('fetched_data',JSON.stringify(data)));


var model = JSON.parse(sessionStorage.getItem('fetched_data'));

console.log(model["   "])