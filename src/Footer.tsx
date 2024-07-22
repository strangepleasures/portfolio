import React from 'react';

const Footer = () => {
    return (
        <div style={footerStyle}>
            <div>Use SPACE to toggle the menu, ↑ ↓ to navigate between projects and ← → to navigate between images.</div><div>Content, design, coding &copy; Pavel Mikhailovskii</div>
        </div>
    )
}

const footerStyle: React.CSSProperties = {
    backgroundColor: 'black',
    color: 'white',
    height: '20px',
    display: 'flex',
    gap: '10px',
 //   justifyContent: 'space-between',
    alignItems: 'left',
    padding: '0 1em',
    fontFamily: "JetBrains Mono",
    justifyContent: 'space-between',
};


export default Footer;