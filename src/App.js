import { useState } from 'react';
import './App.css'
import { generos } from './generos';

function App() {

  const apiKey = 'a11b2c0cd5fb0efb5878106808068b4f'
  const [movie, setMovie] = useState()

  let page = 1

  const handleGenreClick = async (genreId, total_pages) => {
    if (total_pages > 500) total_pages = 500

    page = Math.floor(Math.random() * total_pages)
    if (page === 0) page = 1

    const requestUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}&language=pt-BRvote_count.gte=1000sort_by=vote_average.desc&vote_average.gte=${1}&vote_average.lte=10&include_adult=false&certification_country=US&certification=R`;

    await fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * 20);
        const movie = data.results[randomIndex];
        console.log(data.total_pages)
        console.log(movie)
        setMovie(movie);
      })
      .catch(error => alert('Não existe filmes com esses filtros'));
  }

  return (
    <>
      <div className="genre-container">
        {/* <div> */}
        {generos.map(genero => {
          return <button key={genero.id} onClick={() => { handleGenreClick(genero.id, genero.total_pages) }}>{genero.name}</button>
        })}
        {/* </div> */}
      </div>
      <div className="App">
        {movie ?
          <>
            <div className='filme_data'>
              <p> {movie?.original_title}</p>
            </div>
            <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="Poster do filme não disponível!" />
            <div className='filme_data'>
              <p> {movie?.overview ? movie?.overview : 'Sinopse não disponível'}</p>
            </div>
          </>
          :
          <h1>Selecione o genero para gerar uma recomendação de filme</h1>
        }
      </div>
    </>
  );
}

export default App;
