var startofname = document.getElementById('startofname');
var generate = document.querySelector('.generate');
var create = document.querySelector('.getmodel');
var sidunafn = document.querySelector('.generatednafn');
var siduN = document.getElementById("N")
var sidulang = document.getElementById("language")
var sidumodel = document.getElementById("modeltype")

create.addEventListener('click', get_model);
generate.addEventListener('click', generate_nafn);

var generated_names=[];

function get_model(){
  var lang = sidulang.value;
  var N = siduN.value;
  var modeltype = sidumodel.value;
  
  var model_url = "https://raw.githubusercontent.com/davidsteinar/nynefni/master/models/" + lang + "_" + modeltype + "_" + N +"gram.json";

  var names_url = "https://raw.githubusercontent.com/davidsteinar/nynefni/master/data/names/" + lang + "_" + modeltype + ".json";

  fetch(model_url)
  .then(response => response.json())
  .then(data => sessionStorage.setItem('model',JSON.stringify(data)));

  fetch(names_url)
  .then(response => response.json())
  .then(data => sessionStorage.setItem('existingnames',JSON.stringify(data)));
}

var generated_names = [];

function generate_nafn(){
  var model = JSON.parse(sessionStorage.getItem('model'));
  var existing_names = JSON.parse(sessionStorage.getItem('existingnames'));
  var startkey = startofname.value;
  var N = Number(siduN.value);
  var start = " ".repeat(N) + startkey;
  var initkey = start.slice(start.length-N,start.length)
  var iteration = 0;
  const max_iterations=100000;
  const maxlength = 20;

  while(true){
    var nafn = start;
    var key = initkey;
    for(var i=0; i<maxlength; i++){
      var probability = Math.random();
      for(var letter in model[key]) {
        probability -= model[key][letter];
        if(probability < 0){
          break;
        }
      }
      nafn = nafn + letter;
      key = nafn.slice(nafn.length-N,nafn.length);
      if(letter == " "){
        nafn = nafn.trim();
        break;
      }
      if(i === maxlength-2){
        nafn=nafn.trim();
        break;
      }
    }
    
    if(existing_names.includes(nafn) === false && generated_names.includes(nafn) === false){
      generated_names.push(nafn);
      console.log(generated_names)
      sidunafn.textContent = nafn;
      sidunafn.style.visibility = 'visible';
      break;
    }
      
    iteration += 1;
    if(iteration>max_iterations){
      
      sidunafn.textContent = "Ekkert nafn fannst";
      sidunafn.style.visibility = 'visible';
      break;
    }
  }
}