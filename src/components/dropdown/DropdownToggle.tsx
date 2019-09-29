import * as React from 'react';
import DropdownContext from './dropdownContext';

export interface DropdownToggleProps {

}

const DropdownToggle: React.FunctionComponent<DropdownToggleProps> = (props) => {

    const dropdownContext = React.useContext(DropdownContext);
    const { children } = props;

    return (
        <div>
            <button className="button" onClick={() => {dropdownContext.toggle(); }}>
                {children} <span>&#9660;</span>
            </button>
        </div>
    )
}

export default DropdownToggle;