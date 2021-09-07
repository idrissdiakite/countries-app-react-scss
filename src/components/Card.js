import React from 'react';

const Card = (props) => {
    const { country } = props // ça s'appel du destructuring - permet d'éviter de devoir faire à chaque fois "props.country.blablabla"
    
    const numberFormat = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return (
        <li className="card">
            <img src={country.flag} alt="flag" />
            <div className="data-container">
                <ul>
                    <li>{country.name}</li>
                    <li>{country.capital}</li>
                    <li>Pop. {numberFormat(country.population)}</li>
                </ul>
            </div>
        </li>
    );
};

export default Card;