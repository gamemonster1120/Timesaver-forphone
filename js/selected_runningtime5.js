// TMDB API 키
const apiKey = "819c5ddc63e5a26fee42ba51760c998c";

// 러닝타임 범위 지정 (분 단위)
const minRuntime = 240;
const maxRuntime = 300;

// API 요청 URL
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_runtime.gte=${minRuntime}&with_runtime.lte=${maxRuntime}`;

// API 요청 보내기
axios.get(url)
  .then(response => {
    const movies = response.data.results;
    const container = document.getElementById("movie-container");

    movies.forEach(movie => {
      const title = movie.title;
      const runtimeArray = movie.runtime;
      const runtime = runtimeArray && runtimeArray.length > 0 ? runtimeArray[0] : undefined;
      const posterPath = movie.poster_path;

      // div 요소 생성
      const div = document.createElement("div");
      div.className = "movie-poster";
      div.style.background = "white";
      div.style.boxShadow = '10px -10px 5px black';

      

      // 포스터 이미지 추가
      if (posterPath) {
        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500/${posterPath}`;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.marginTop = '0px';
        img.style.marginLeft = '0px';
        img.style.paddingTop = '0px';
        img.style.border = '1px solid white';
        div.appendChild(img);
        // div 요소 클릭 이벤트 추가
      div.addEventListener('click', () => {
        // 포스터 id 값을 selected_movie.html로 전달하는 코드
        const posterId = movie.id;
        window.location.href = `selected_movie.html?posterId=${posterId}`;
      });
      } else {
        const placeholder = document.createElement("p");
        placeholder.textContent = "No poster available";
        div.appendChild(placeholder);
      }

      // div 요소를 container에 추가
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.log("영화를 찾을 수 없습니다.", error);
  });
