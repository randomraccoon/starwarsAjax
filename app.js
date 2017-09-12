let infoTitle;

function showPeople(movie) {
  $('#info-box').text("");
  $(infoTitle).text('People of ' + movie.title);
  let firstThree = movie.characters.slice(0,3);
  for (let url of firstThree) {
    $.get(url,(person)=> {
      let p = $('<p></p>');
      $(p).text(person.name);
      $('#info-box').append(p);
    });
  }
}
function showPlanets(movie) {
  $('#info-box').text("");
  $(infoTitle).text('Planets of ' + movie.title);
  let firstThree = movie.planets.slice(0,3);
  for (let url of firstThree) {
    $.get(url,(planet)=> {
      let p = $('<p></p>');
      $(p).text(planet.name);
      $('#info-box').append(p);
    });
  }
}

$(document).ready(()=> {
  infoTitle = $('#info-title')[0];
  $(infoTitle).text("");
  for (let i = 0; i < 6; i++) {
    $.get('https://swapi.co/api/films/' + (i+1), (data)=>{
      // console.log(data);
      let container = $('.movie')[i];
      let header = $('<h3></h3>')[0];
      $(header).text(data.title);
      container.append(header);
      $(header).addClass('title');

      let p = $('<p></p>')[0];
      $(p).text(data.opening_crawl);
      container.append(p);

      let btnContainer = $('<div></div>')[0];
      $(btnContainer).append(createButton('People',data));
      $(btnContainer).append(createButton('Planets',data));
      container.append(btnContainer);
    });
  }
});

function createButton(query, data) {
  let btn = $('<div></div>')[0];
  $(btn).addClass('button');
  $(btn).text('show ' + query);
  let funcName = 'show'+query;
  let callback = window[funcName];
  $(btn).click(()=>{
    callback(data);
  });
  return btn;
}
