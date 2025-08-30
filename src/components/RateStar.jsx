import rateStar from '../assets/RatingStar.png'
import { useEffect, useState } from 'react';
export default function RateStar(props) {
    let [stars, setStars] = useState(0);
    let [ratingCount, setRatingCount] = useState(props.ratingCount || 0)
    let rateInfo = (ratingCount > 0) ? "Ratings (" + ratingCount + ")" : "Rating: ";
   const generateStars = () => {

        let stars = [];
        for (let i = 0; i < Math.round(props.rating); i += 1) {


            stars.push(<img key={i} src={rateStar} className="rating-star" alt="RateStar"/>)
            
 
       }
       setStars(stars);
    }
    useEffect(() => {

        generateStars();

    }, [props.rating])

    return (

        <div className="rating-stars-container">
            <label className="rating-stars-label">{rateInfo}</label>
            <div id="star-container">{ stars } </div>
        </div>
      
    )
}