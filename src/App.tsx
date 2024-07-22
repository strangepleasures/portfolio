import React, {useState} from 'react';
import Header from './Header';
import DisplayArea from './DisplayArea';
import NavBar from './NavBar';
import './JetBrains-Mono.css';
import Footer from "./Footer";

function App() {
    const [activeProject, setActiveProject] = useState(0);
    const [navBarVisible, setNavBarVisible] = useState(window.screen.width > window.screen.height);

    return (
        <div className="App">
            <Header navBarVisible={navBarVisible} setNavBarVisible={setNavBarVisible} />
            <div style={contentStyle}>
                {navBarVisible && <NavBar activeProject={activeProject} setActiveProject={setActiveProject}/>}
                <DisplayArea activeProject={activeProject}/>
            </div>
            <Footer/>
        </div>

    );
}

const contentStyle: React.CSSProperties = {
    fontFamily: "JetBrains Mono",
    display: 'flex',
    flexDirection: 'row',
    overflowY: 'clip',
    height: 'calc(100vh - 80px)',
    width: '100%'
};

export default App;