import React, {useEffect, useState} from 'react';
import Header from './Header';
import DisplayArea from './DisplayArea';
import NavBar from './NavBar';
import './JetBrains-Mono.css';
import Footer from "./Footer";
import projectData from "./projects.json";

function App() {
    const [activeProject, setActiveProject] = useState(0);
    const [navBarVisible, setNavBarVisible] = useState(window.screen.width > window.screen.height);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if(event.code === 'Space') {
                setNavBarVisible(!navBarVisible)
            }
            if (event.code === 'ArrowDown'){
                if (activeProject < projectData.length - 1) {
                    setActiveProject(activeProject + 1);
                }
            } else if(event.code === 'ArrowUp'){
                if (activeProject > 0) {
                    setActiveProject(activeProject - 1);
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navBarVisible, setNavBarVisible, activeProject, setActiveProject]);

    return (
        <div className="App" style={appStyle}>
            <Header navBarVisible={navBarVisible} setNavBarVisible={setNavBarVisible} />
            <div style={contentStyle}>
                {navBarVisible && <NavBar activeProject={activeProject} setActiveProject={setActiveProject}/>}
                <DisplayArea activeProject={activeProject}/>
            </div>
            <Footer/>
        </div>

    );
}

const appStyle: React.CSSProperties = {
    fontFamily: "JetBrains Mono",
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
};

const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
};

export default App;