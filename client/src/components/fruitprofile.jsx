import { useState, useEffect } from "react";
import FruitCard from "./fruitcard";


const FruitProfile = () => {

    const [fruits, setFruits] = useState([]);

    const loadData = () => {
        fetch('http://localhost:3003/api/fruit/')
            .then((response) => response.json())
            .then(data => {
                setFruits(data);
            })
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div className="Container">
            <div className='fruit-container'>
                <span>What's your fav fruit?</span>/{fruits.length}
            </div>
            {fruits.map((fruits, index) => {
                return <FruitCard key={index} fruits={fruits} />
            })}
        </div>
    )

}

export default FruitProfile;