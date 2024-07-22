import React from 'react';
import {FaInstagram, FaFlickr, FaEnvelope, FaTumblr, FaBars} from "react-icons/fa";

interface HeaderProps {
    navBarVisible: boolean,
    setNavBarVisible: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const Header = ({navBarVisible, setNavBarVisible}: HeaderProps) => {
    return (
        <header style={headerStyle}>
            <div style={menuIconStyle} onClick={() => setNavBarVisible(!navBarVisible)}><FaBars/></div>
            <h1>Photography by Pavel Mikhailovskii</h1>
            <div style={iconsStyle}>
                <a href="https://www.instagram.com/pavel.mikhailovskii" target="_blank" rel="noreferrer noopener">
                    <FaInstagram style={iconStyle}/>
                </a>
                <a href="https://www.flickr.com/photos/pavel-mikhailovskii" target="_blank" rel="noreferrer noopener">
                    <FaFlickr style={iconStyle}/>
                </a>
                <a href="https://pavelmikhailovskii.tumblr.com/">
                    <FaTumblr style={iconStyle}/>
                </a>
                <a href="mailto:pavel.mikhailovskii@gmail.com">
                    <FaEnvelope style={iconStyle}/>
                </a>
            </div>
        </header>
    )
}

const headerStyle: React.CSSProperties = {
    backgroundColor: 'black',
    color: 'white',
    height: '60px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0 1em',
    fontFamily: "JetBrains Mono",
};

const menuIconStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '24px',
    marginRight: '15px'
};

const iconsStyle: React.CSSProperties = {
    display: 'flex',
    marginLeft: 'auto'
};

const iconStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '24px',
    marginLeft: '15px',
};

export default Header;