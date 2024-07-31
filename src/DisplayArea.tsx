import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSwipeable} from 'react-swipeable';
import projectData from './projects.json';
import {DisplayAreaProps} from "./props";
import {BounceLoader} from 'react-spinners';

const DisplayArea: React.FC<DisplayAreaProps> = ({activeProject, navBarVisible}) => {
    const descriptionExists = !!projectData[activeProject].description;
    const [activeImageIndex, setActiveImageIndex] = useState(descriptionExists ? -1 : 0);
    const [isLoading, setIsLoading] = useState(false);
    const images = projectData[activeProject].images;

    const navRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        if (!navRef.current) return;
        const navWidth = navRef.current.clientWidth;
        const mousePosition = event.clientX - navRef.current.offsetLeft;
        if (mousePosition < navWidth / 2) {
            navRef.current.style.cursor = 'w-resize';
        } else {
            navRef.current.style.cursor = 'e-resize';
        }
    };

    useEffect(() => {
        setActiveImageIndex(descriptionExists ? -1 : 0);
    }, [activeProject, descriptionExists]);

    const decreaseActiveIndex = useCallback(() => {
        if ((activeImageIndex === 0 && !descriptionExists) || activeImageIndex < 0) return;
        setIsLoading(activeImageIndex > 0);
        setActiveImageIndex(index => index - 1);
    }, [activeImageIndex, descriptionExists]);

    const increaseActiveIndex = useCallback(() => {
        if (activeImageIndex >= images.length - 1) return;
        setIsLoading(true);
        setActiveImageIndex(index => index + 1);
    }, [activeImageIndex, images.length]);

    const onImageLoad = () => {
        setIsLoading(false);
    }

    const onAreaClick = (event: React.MouseEvent<HTMLElement>) => {
        if (event.button !== 0) return;
        const areaWidth = event.currentTarget.clientWidth;
        const clickX = event.clientX - event.currentTarget.offsetLeft;

        if (clickX < areaWidth / 2) {
            decreaseActiveIndex();
        } else {
            increaseActiveIndex();
        }

        event.preventDefault();
    };

    useEffect(() => {
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

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [increaseActiveIndex, decreaseActiveIndex, activeImageIndex]);

    const handlers = useSwipeable({
        onSwipedLeft: () => increaseActiveIndex(),
        onSwipedRight: () => decreaseActiveIndex(),
        trackMouse: true
    });

    return (
        <div {...handlers} style={{...displayAreaStyle as React.CSSProperties, paddingLeft: navBarVisible ? "20px" : '0'}} onClick={onAreaClick} onMouseMove={handleMouseMove} ref={navRef}>
            {isLoading && <div style={spinnerStyle}><BounceLoader color={"#FFFFFF"}/></div>}
            {activeImageIndex === -1
                ? <div style={preWrapperStyle}><pre style={descriptionStyle as React.CSSProperties}>{projectData[activeProject].description}</pre></div>
                : <img style={imageStyle as React.CSSProperties} src={images[activeImageIndex]} alt=""
                       onLoad={onImageLoad}/>
            }
            {(activeImageIndex < images.length - 1) && (<img hidden={true} src={images[activeImageIndex + 1]} alt=""/>)}
            <div style={{height: '24px'}}>{`${activeImageIndex + 1 + (descriptionExists ? 1 : 0)} / ${images.length  + (descriptionExists ? 1 : 0)}`}</div>
        </div>
    );
};

const displayAreaStyle = {
    position: 'relative',
    backgroundColor: 'black',
    color: 'white',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
};

const imageStyle = {
    maxHeight: 'calc(90% - 32px)',
    maxWidth: '100%',
    paddingBottom: '8px'
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
    flexGrow: '1',
    pointerEvents: 'none' as 'none',
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

const preWrapperStyle= {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 'calc(90% - 44px)',
    paddingBottom: '20px'
}


export default DisplayArea;