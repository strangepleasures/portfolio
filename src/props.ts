export type NavBarProps = {
    activeProject: number;
    setActiveProject: (index: number) => void;
};

export type DisplayAreaProps = {
    activeProject: number;
    navBarVisible: boolean;
    setNavBarVisible: (visible: boolean) => void;
};