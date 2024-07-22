import React, {useEffect, useState} from 'react';
import Header from './Header';
import DisplayArea from './DisplayArea';
import NavBar from './NavBar';
import './JetBrains-Mono.css';
import Footer from "./Footer";
import projectData from "./projects.json";

function App() {
    const [activeProject, setActiveProject] = useState(0);
    const [navBarVisible, setNavBarVisible] = useState(isLandscape());

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            switch (event.code) {
                case 'Space':
                    setNavBarVisible(!navBarVisible);
                    break;
                case 'ArrowDown':
                    if (activeProject < projectData.length - 1) {
                        setActiveProject(activeProject + 1);
                    }
                    break;
                case 'ArrowUp':
                    if (activeProject > 0) {
                        setActiveProject(activeProject - 1);
                    }
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navBarVisible, setNavBarVisible, activeProject, setActiveProject]);

    const useTouchScreen = ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    function navBarSetActiveProjectIn(index: number) {
        setActiveProject(index);
        setNavBarVisible(isLandscape());
    }

    return (
        <div className="App" style={appStyle}>
            <Header navBarVisible={navBarVisible} setNavBarVisible={setNavBarVisible}/>

            {(!navBarVisible) && <h4>{projectData[activeProject].title}</h4>}
            <div style={contentStyle}>
                {navBarVisible && <NavBar activeProject={activeProject} setActiveProject={navBarSetActiveProjectIn}/>}
                {(isLandscape() || !navBarVisible) && <DisplayArea activeProject={activeProject}/>}
            </div>
           {!useTouchScreen && <Footer/>}
        </div>
    );
}

const isLandscape = () => document.documentElement.clientWidth > document.documentElement.clientHeight;

const appStyle: React.CSSProperties = {
    paddingTop: '12px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '8px',
    backgroundColor: 'black',
    color: 'white',
    fontFamily: "JetBrains Mono",
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 20px)',
};

const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
};

export default App;