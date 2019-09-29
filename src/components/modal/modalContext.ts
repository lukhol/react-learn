import * as React from 'react';

export interface IModalContext {
    open: boolean;
    toggle: () => void;
}

const ModalContexst = React.createContext<IModalContext>({} as IModalContext);

export default ModalContexst;