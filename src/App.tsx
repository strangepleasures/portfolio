import React, {useEffect, useState} from 'react';
import Header from './Header';
import DisplayArea from './DisplayArea';
import NavBar from './NavBar';
import './JetBrains-Mono.css';
import Footer from "./Footer";
import projectData from "./projects.json";
import { useSwipeable } from 'react-swipeable';

function App() {
    const [activeProject, setActiveProject] = useState(0);
    const [navBarVisible, setNavBarVisible] = useState( document.documentElement.clientWidth > document.documentElement.clientHeight);

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

    const handlers = useSwipeable({
        onSwipedUp: () =>
            activeProject < projectData.length - 1 && setActiveProject(prev => prev + 1),
        onSwipedDown: () =>
            activeProject > 0 && setActiveProject(prev => prev - 1),
    })

    const useTouchScreen = window.matchMedia("only screen and (max-width: 768px)").matches && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    return (
        <div className="App" style={appStyle}  {...handlers}>
            <Header navBarVisible={navBarVisible} setNavBarVisible={setNavBarVisible} />
            {(!navBarVisible) && <h3 style={projectTitleStyle}>{projectData[activeProject].title}</h3>}
            <div style={contentStyle}>
                {navBarVisible && <NavBar activeProject={activeProject} setActiveProject={setActiveProject}/>}
                <DisplayArea activeProject={activeProject}/>
            </div>
            {!useTouchScreen && <Footer/>}
        </div>

    );
}

const appStyle: React.CSSProperties = {
    backgroundColor: 'black',
    color: 'white',
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

const projectTitleStyle: React.CSSProperties = {
    // display: 'flex',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingLeft: '20px',
    // paddingRight: '20px',
    // fontFamily: "JetBrains Mono",
    // lineHeight: '1em',
};

export default App;