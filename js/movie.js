if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
  window.location.href = "https://time-saver.netlify.app";
}
function handleKeyPress(event) {
  if (event.key === "Enter") {
      searchMovies();
  }
}

async function searchMovies() {
  var searchInput = document.getElementById("searchInput");
  var searchTerm = searchInput.value;

  try {
      // movieDB API 호출을 위한 요청 URL 및 인증 정보 등 설정
      var apiKey = "819c5ddc63e5a26fee42ba51760c998c";
      var apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;

      // movieDB API 호출 및 검색 결과 처리
      var response = await axios.get(apiUrl);
      var movies = response.data.results;

      // 영화 목록에서 각 영화의 id 값을 추출하여 배열로 만듦
      var movieIds = movies.map(movie => movie.id);

      // 추출한 영화 id 배열을 search.html 페이지로 전달
      window.location.href = "/html/search.html?movieIds=" + encodeURIComponent(JSON.stringify(movieIds));
  } catch (error) {
      console.error("An error occurred during movie search:", error);
  }
}


async function getRecentMovies() {
  const apiKey = '819c5ddc63e5a26fee42ba51760c998c'; // MoviesDB API 키를 입력해주세요.
  const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
  const data = await response.json();

  if (response.ok) {
    const recentMovies = data.results;

    // 최근에 개봉한 영화 4개 출력
    const sortedMovies = recentMovies.sort((a, b) => b.release_date.localeCompare(a.release_date)).slice(0, 12);
    for (let i = 0; i < sortedMovies.length; i++) {
      const movie = sortedMovies[i];
      const div = document.querySelector(`.div-${i + 1}`);
      const backgroundImage = document.createElement('img');
      backgroundImage.src =`https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      const poster = document.createElement('img');
      poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      
      poster.alt = movie.title;
      poster.style.width = '100%';
      poster.style.height = '15vh';
      poster.style.border = '1px solid white';
      poster.style.boxShadow = '10px -10px 5px black';
      div.appendChild(poster);

      // div 요소 클릭 이벤트 추가
      div.addEventListener('click', () => {
        // 포스터 id 값을 selected_movie.html로 전달하는 코드
        const posterId = movie.id;
        window.location.href = `/html/selected_movie.html?posterId=${posterId}`;
      });
    }
  } else {
    console.error('Failed to fetch recent movies:', data.status_message);
  }
}

getRecentMovies();
