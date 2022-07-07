import React from 'react';
import {Link} from 'react-router-dom';
import "../css_modules/NavBar.css"

const imagen = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png";

export default function NavBar(props) {
    return (
        <div className='main'>
            <img src={`${imagen}`} alt="logo oficial Pokemon" className='logo' />
            <div>
                <Link to="/home">
                    <button className='btnNav'>Home</button>
                </Link>
                <Link to="/create">
                    <button className='btnNav'>Create Pokemon</button>
                </Link>
            </div>
        </div>
    )
}