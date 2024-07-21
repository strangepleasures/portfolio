import React, {useEffect} from 'react';
import projectData from './projects.json';
import {NavBarProps} from "./props";

const NavBar: React.FC<NavBarProps> = ({ activeProject, setActiveProject }) => {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if(event.code === 'ArrowDown'){
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
    }, [activeProject, setActiveProject]);

    return (
        <nav style={navBarStyle}>
            <ul style={listStyle}>
                {projectData.map((project, index) => (
                    <li
                        key={index}
                        onClick={() => setActiveProject(index)}
                        style={index === activeProject ? {...listItemStyle, ...activeStyle} : listItemStyle}
                    >
                        {project.title}
                        <img hidden={true} src={project.images[0]} alt=""/>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const navBarStyle: React.CSSProperties = {
    backgroundColor: 'black',
    color: 'white',
    height: '100vh',
    width: '15%',
    overflowY: 'auto',
    paddingLeft: '20px', // Add padding on the left
};

const listStyle: React.CSSProperties = {
    padding: 0
};

const listItemStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: '10px 0'
};

const activeStyle: React.CSSProperties = {
    color: 'black',
    backgroundColor: 'white'
};
export default NavBar;