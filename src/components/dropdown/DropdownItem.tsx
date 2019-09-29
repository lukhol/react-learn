import * as React from 'react';

export interface DropdownItemProps {
    onClick?: () => void;
}

const DropdownItem: React.FunctionComponent<DropdownItemProps> = (props) => {

    const { children, onClick } = props;

    return (
        <li
            onClick={onClick}
        >
            {children}
        </li>
    )
}

export default DropdownItem;