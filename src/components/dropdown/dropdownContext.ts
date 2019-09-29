import * as React from 'react';

interface IDropdownContext {
    isOpen: boolean;
    toggle: () => void;
    disabled?: boolean;
}

const dropdownContext = React.createContext<IDropdownContext>({} as IDropdownContext);

export default dropdownContext;