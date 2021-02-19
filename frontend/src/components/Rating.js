
const Rating = ({value, text, color}) => {
        const stars = [];
        for (let i=0; i<5; i++) {
                stars.push(
                        <i key={i} style={{color}} className={
                                value-i>0.5 ? 'fas fa-star' : (value-i===0.5 ? 'fas fa-star-half-alt' : 'far fa-star')
                        }>

                        </i>
                );
        }
        return (
                <div className="rating">
                        <span>
                             {stars}
                        </span>
                        <span>{text}</span>
                </div>
        )
}



export default Rating;
