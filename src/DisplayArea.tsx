import React, {useState, useEffect, useCallback} from 'react';
import projectData from './projects.json';
import { DisplayAreaProps } from "./props";
import { BounceLoader } from 'react-spinners';

const DisplayArea: React.FC<DisplayAreaProps> = ({ activeProject }) => {
    const descriptionExists = !!projectData[activeProject].description;
    const [activeImageIndex, setActiveImageIndex] = useState(descriptionExists ? -1 : 0);
    const [isLoading, setIsLoading] = useState(false);
    const images = projectData[activeProject].images;

    useEffect(() => {
        setActiveImageIndex(descriptionExists ? -1 : 0);
    }, [activeProject, descriptionExists]);

    const decreaseActiveIndex = useCallback(() => {
        if ((activeImageIndex === 0 && !descriptionExists) || activeImageIndex < 0) return;
        setIsLoading(activeImageIndex > 0);
        setActiveImageIndex(activeImageIndex - 1);
    }, [activeImageIndex, descriptionExists]);

    const increaseActiveIndex = useCallback(() => {
        if (activeImageIndex >= images.length - 1) return;
        setIsLoading(true);
        setActiveImageIndex(activeImageIndex + 1);
    }, [activeImageIndex, images.length]);

    const onImageLoad = () => {
        setIsLoading(false);
    }

    useEffect(() => {
        // Define a function to handle keydown events
        function handleKeyDown(event: KeyboardEvent) {
            switch (event.code) {
                case 'ArrowLeft':
                    decreaseActiveIndex();
                    break;
                case 'ArrowRight':
                    increaseActiveIndex();
                    break;
                default:
                    break;
            }
        }

        // Add the event listener
        window.addEventListener('keydown', handleKeyDown);

        // Remove event listener on cleanup
        return () => window.removeEventListener('keydown', handleKeyDown);

        // Include dependencies in array for useEffect
    }, [activeImageIndex, descriptionExists, increaseActiveIndex, decreaseActiveIndex]);



    return (
        <div style={displayAreaStyle as React.CSSProperties}>
            {(activeImageIndex > 0 || (activeImageIndex === 0 && descriptionExists)) && (
                <button
                    style={{ ...arrowStyle, left: '10px' } as React.CSSProperties}
                    onClick={decreaseActiveIndex}
                >
                    &laquo;
                </button>
            )}
            {isLoading && <div style={spinnerStyle}><BounceLoader color={"#FFFFFF"} /></div>}
            {activeImageIndex === -1
                ? <pre style={descriptionStyle as React.CSSProperties}>{projectData[activeProject].description}</pre>
                : <img style={imageStyle as React.CSSProperties} src={images[activeImageIndex]} alt="Current project" onLoad={onImageLoad} />
            }
            {(activeImageIndex < images.length - 1) && (<img hidden={true} src={images[activeImageIndex + 1]} alt="" />)}
            {!isLoading && activeImageIndex < images.length - 1 && (
                <button
                    style={{ ...arrowStyle, right: '10px' } as React.CSSProperties}
                    onClick={increaseActiveIndex}
                >
                    &raquo;
                </button>
            )}
        </div>
    );
};

const displayAreaStyle = {
    position: 'relative',
    backgroundColor: 'black',
    color: 'white',
    height: '100vh',
    width: 'calc(100vw - 200px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'clip',
};

const arrowStyle = {
    color: 'white',
    fontSize: '6em',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
};

const imageStyle = {
    maxHeight: '80vh',
    maxWidth: '80vw',
};

const descriptionStyle = {
    color: 'white',
    maxHeight: '80vh',
    maxWidth: '80vw',
    overflowY: 'auto' as 'auto',
    overflowX: 'wrap' as 'hidden',
    textAlign: 'left',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    fontSize: '1.2em',
    paddingRight: '80px',
};

const spinnerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
};


export default DisplayArea;