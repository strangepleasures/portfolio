import React from 'react';

const Footer = () => {
    return (
        <div style={footerStyle}>
            <div>Content, design, coding &copy; Pavel Mikhailovskii</div>
            {!useTouchScreen && <div>Use SPACE to toggle the menu, ↑ ↓ to navigate between projects and ← → to navigate between images.</div>}
        </div>
    )
}

const useTouchScreen = ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const footerStyle: React.CSSProperties = {
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    alignItems: 'left',
    fontFamily: "JetBrains Mono",
    justifyContent: 'space-between',
};


export default Footer;