import React from 'react';
import projectData from './projects.json';
import {NavBarProps} from "./props";

const NavBar: React.FC<NavBarProps> = ({ activeProject, setActiveProject }) => {
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
    overflowY: 'auto',
    paddingLeft: '20px',
    display: 'inline-block',
    width: 'max-content',
};

const listStyle: React.CSSProperties = {
    padding: 0,
};

const listItemStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: '10px 0',
    whiteSpace: 'nowrap'
};

const activeStyle: React.CSSProperties = {
    color: 'black',
    backgroundColor: 'white'
};
export default NavBar;