import { Fragment } from 'react';
import classes from './Modal.module.css'
import  ReactDOM  from 'react-dom';

const Backdrop = props => {

    return <div className={classes.backdrop} onClick={props.hideCartHandler}></div>
};

const ModalOverlay = props => {
   
   return <div className={classes.modal}>
        <div >{props.children}</div>
    </div> 
}

const portalElement = document.getElementById("overlays");

// protal is used to render the DOM node that exist outside the DOM hierarchy of the parent component
// which makes the DOM more structured
const Modal = props => {

    return <Fragment>
        {ReactDOM.createPortal(<Backdrop hideCartHandler={props.hideCartHandler} />,portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        
        
        {/* <Backdrop />
        <ModalOverlay>{props.children}</ModalOverlay> */}
    </Fragment>
};

export default Modal;