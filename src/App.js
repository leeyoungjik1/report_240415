import './App.css';
import React, { Component } from 'react';
import Movie from './Movie';
import Banner from './Banner';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        loading: true,
        movies: [],
        selctedMovie: null,
        recommendMovies: []
    }
  }
selctMovie = () => {
    const tempSelctedMovie = this.state.movies[Math.floor(Math.random() * this.state.movies.length)]
    fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${tempSelctedMovie.id}`)
    .then( res => res.json())
    .then( result => {
        const {data: {movies}} = result
        this.setState({selctedMovie: tempSelctedMovie, recommendMovies: movies})
    })
}
componentDidUpdate(prevProps, prevState){
    if(this.state.selctedMovie !== null & this.state.selctedMovie !== undefined 
        & this.state.selctedMovie === prevState.selctedMovie){
            this.selctMovie()
    }
}
componentDidMount(){
    fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=title&order_by=asc&limit=30')
    .then( res => res.json())
    .then( result => {
        const {data: {movies}} = result
        this.setState({loading: false, movies})
        setTimeout(this.selctMovie, 10)
    })
    setInterval(this.selctMovie, 3000)
}
render(){
    const {loading, movies, selctedMovie, recommendMovies} = this.state
    const style = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '60%',
      margin: '100px auto',
      textAlign: 'center'
    }
    const loadingStyle = {
      position: 'absolute', 
      left: '50%', 
      top:'50%', 
      transform: 'translate(-50%, -50%)', 
      fontSize: '2rem'
    }
    if(loading){
      return (
        <div style={loadingStyle}>
          <h1>Loading ...</h1>
        </div>
      )
    }else{
      return (
        <>
            {selctedMovie && <Banner
                title={selctedMovie.title}
                genres={selctedMovie.genres}
                cover={selctedMovie.large_cover_image}
                summary={selctedMovie.summary}
                rating={selctedMovie.rating}
                runtime={selctedMovie.runtime}
                recommendMovies={recommendMovies}
            ></Banner>}
            <div style={style}>
                {movies.map(movie => {
                    return (
                    <Movie 
                        key={movie.id}
                        title={movie.title}
                        genres={movie.genres}
                        cover={movie.medium_cover_image}
                        summary={movie.summary}
                        rating={movie.rating}
                    ></Movie>
                    )
                })}
            </div>
        </>
      )
    }
  }
}

export default App;