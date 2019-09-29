import * as React from 'react';
import DropdownContext from './dropdownContext';

export interface DropdownMenuProps {

}

const DropdownMenu: React.FunctionComponent<DropdownMenuProps> = (props) => {

    const dropdownContext = React.useContext(DropdownContext);
    const { children } = props;
    const { isOpen, toggle } = dropdownContext;

    if(!isOpen || !children) {
        return null;
    }

    return (
        <div className="dropdown-menu">
           <ul>
               {React.Children.map(children, (child, index) => {
                    if(React.isValidElement(child)) {
                        return child;
                    }

                   return null;
               })}
            </ul>
        </div>
    )
}

export default DropdownMenu;