import * as React from 'react';
import DropdownContext from './dropdownContext';

export interface DropdownMenuProps {

}

function useOutsideAlerter(handleClickOutside: any) {
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    });
}

const DropdownMenu: React.FunctionComponent<DropdownMenuProps> = (props) => {

    const dropdownContext = React.useContext(DropdownContext);
    const wrapperRef = React.useRef(null);
    const { children } = props;
    const { isOpen, toggle } = dropdownContext;

    function handleClickOutside(event: any) {
        if (wrapperRef.current && !(wrapperRef as any).current.contains(event.target)) {
            toggle();
        }
    }
    useOutsideAlerter(handleClickOutside);

    if(!isOpen || !children) {
        return null;
    }

    return (
        <div className="dropdown-menu" ref={wrapperRef}>
           <ul>
               {React.Children.map(children, (child: any, index) => {
                    const separator = child.props.separator;
                    if(React.isValidElement(child)) {
                        if(separator) {
                            return <div className="separator"> </div>;
                        } else {
                            return child;
                        }
                    }

                   return null;
               })}
            </ul>
        </div>
    )
}

export default DropdownMenu;