import React, {Component} from "react";
import './Banner.css'

class Banner extends Component{
    render(){
        const {title, genres, cover, summary, rating, runtime, recommendMovies} = this.props
        const limitWordLength = 500
        let setSummary = ''
        if(summary.length > limitWordLength){
            setSummary = summary.slice(0, limitWordLength) + '...'
        }else{
            setSummary = summary
        }
        return(
            <div className="banner-container">
                <div className="main-img">
                    <img src={cover}></img>
                </div>
                <div className="sub-container">
                    <h1>{title}</h1>
                    <p>평점: {rating}</p>
                    <p>상영시간: {runtime}</p>
                    <p>장르: {genres.join(' ')}</p>
                    <br/>
                    <p>{setSummary}</p>
                    <div>
                        {recommendMovies.map(movie => <img src={movie.medium_cover_image} key={movie.id}></img>)}
                    </div>
                </div>
            </div>
        )
    }
}
export default Banner