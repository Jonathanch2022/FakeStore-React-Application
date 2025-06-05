import rateStar from '../assets/RatingStar.png'
import { useEffect, useState } from 'react';
export default function RateStar(props) {
   let [stars, setStars] = useState();
   const generateStars = () => {

        let stars = [];
        for (let i = 0; i < Math.round(props.rating); i += 1) {

           
            stars.push(<img key={i} src={rateStar} className="rating-star" alt="RateStar" />)
            setStars(stars);
 
        }
    }
    useEffect(() => {

        generateStars();

    },[])
    return (


        stars
    )
}