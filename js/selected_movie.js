function translateText(text, targetLang) {
  const apiKey = '819c5ddc63e5a26fee42ba51760c998c'; // Translation API 키를 입력해주세요.
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const data = {
    q: text,
    target: targetLang
  };

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => data.data.translations[0].translatedText)
    .catch(error => {
      console.error('Failed to translate text:', error);
      return text;
    });
}

function getMoviePoster() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const posterId = urlParams.get('posterId');

  const apiKey = '819c5ddc63e5a26fee42ba51760c998c'; // MoviesDB API 키를 입력해주세요.
  const movieUrl = `https://api.themoviedb.org/3/movie/${posterId}?api_key=${apiKey}`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${posterId}/credits?api_key=${apiKey}`;

  Promise.all([fetch(movieUrl), fetch(creditsUrl)])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(async data => {
      const movieData = data[0];
      const creditsData = data[1];

      const posterDiv = document.querySelector('.poster');
      const produceDiv = document.getElementById('produce');
      const detailsDiv = document.querySelector('.details');

      const poster = document.createElement('img');
      poster.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
      poster.style.filter = 'blur(4px)';
      posterDiv.appendChild(poster);

      // 배경 이미지 설정
      document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`;

      // 포스터 blur 효과 제거
      poster.style.filter = 'none';
      poster.alt = movieData.title;
      
      poster.style.width = '720px';
      poster.style.height = 'auto';
      posterDiv.appendChild(poster);
      poster.style.border ='1px solid white'
      poster.style.boxShadow = '15px -15px 3px black';

      const title = document.createElement('h3');
      title.textContent = `TITLE: ${movieData.title}`;
      produceDiv.appendChild(title);

      const runtime = document.createElement('h3');
      runtime.textContent = `RUNNINGTIME: ${movieData.runtime} m`;
      produceDiv.appendChild(runtime);

      const directorData = creditsData.crew.find(person => person.job === 'Director');
      const director = document.createElement('h3');
      director.textContent = `DIRECTOR: ${directorData.name}`;
      produceDiv.appendChild(director);

      const translatedOverview = await translateText(movieData.overview, 'ko');
      const overview = document.createElement('h3');
      overview.textContent = `SUMMARY: ${translatedOverview}`;
      produceDiv.appendChild(overview);
    })
    .catch(error => {
      console.error('Failed to fetch movie poster:', error);
    });
}

getMoviePoster();
window.onload = function() {
  var currentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var currentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  var newWidth = currentWidth * 0.5;
  var newHeight = currentHeight * 0.5;

  document.body.style.width = newWidth + 'px';
  document.body.style.height = newHeight + 'px';
};
