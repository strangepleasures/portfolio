import React from 'react';
import projectData from './projects.json';
import {NavBarProps} from "./props";
import './NavBar.css'


const NavBar: React.FC<NavBarProps> = ({ activeProject, setActiveProject }) => {
    return (
        <nav style={navBarStyle}  className="navBar">
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
    overflowX: 'clip',
    display: 'inline-block',
    width: 'max-content',
    paddingRight: '20px'
};

const listStyle: React.CSSProperties = {
    padding: 0,
};

const listItemStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: '20px 0',
    whiteSpace: 'nowrap'
};

const activeStyle: React.CSSProperties = {
    color: 'black',
    backgroundColor: 'white'
};
export default NavBar;