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
            <h3 style={h2Style}>Photography by Pavel Mikhailovskii</h3>
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
    paddingTop: '12px',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    verticalAlign: 'top',
    paddingLeft: '20px',
    paddingRight: '20px',
    fontFamily: "JetBrains Mono",
    lineHeight: '1em',
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

const h2Style: React.CSSProperties = {
    margin: '0',
    alignSelf: 'center',
};

export default Header;