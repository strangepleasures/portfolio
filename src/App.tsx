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
    const [navBarVisible, setNavBarVisible] = useState(window.screen.width > window.screen.height);

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

    return (
        <div className="App" style={appStyle}  {...handlers}>
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