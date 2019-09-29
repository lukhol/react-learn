import * as React from 'react';
import DropdownContext from './dropdownContext';

export interface DropdownProps {
    isOpen: boolean;
    toggle: () => void;
}

const Dropdown: React.FunctionComponent<DropdownProps> = (props) => {

    const { children, isOpen, toggle } = props;

    return (
        <DropdownContext.Provider
            value={{
                isOpen, 
                toggle
            }}
        >
            <div className="dropdown">
                {children}
            </div>  
        </DropdownContext.Provider>
    )
}

export default Dropdown;