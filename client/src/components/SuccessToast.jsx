import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function SuccessToast({ show, message, onClose }) {
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast
                show={show}
                onClose={onClose}
                delay={3000}
                autohide
                bg="success"
            >
                <Toast.Body className="text-white">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default SuccessToast;