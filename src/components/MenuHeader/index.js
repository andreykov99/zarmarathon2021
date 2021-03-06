import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';
import Modal from '../Modal';
import LoginForm from '../LoginForm';

import { userSignUp } from '../../services/firebase';
import { NotificationManager } from 'react-notifications';


const MenuHeader = ({ bgActive }) => {
    const [isActive, setActive] = useState(null);
    const [isModalOpen, setModalOpen] = useState(null);
    const handleMenuButtonChange = () => {
        setActive(prevState => !prevState);
    }

    const handleClickLogin = () => {
        setModalOpen(prevState => !prevState);
    }

    const handleLoginFormSubmit = ({ email, password }) => {

        const result = userSignUp(email, password);
        if (result.hasOwnProperty('error')) {
            NotificationManager.error(result.error.message, 'Wrong')
        } else {
            NotificationManager.success('Success');
            localStorage.setItem('idToken', result.idToken);
        };
        handleClickLogin();
    }


    useEffect(() => {
        document.querySelector('body').style.overflow = isModalOpen ? 'hidden' : null;
    }, [isModalOpen])

    return (
        <>
            <Navbar
                onMenuButtonChange={handleMenuButtonChange}
                onClickLogin={handleClickLogin}
                isActive={isActive}
                bgActive={bgActive}
            />
            <Menu
                isActive={isActive}
                closeMenu={handleMenuButtonChange}
            />
            <Modal
                isOpen={isModalOpen}
                title="Please login to start game"
                onCloseModal={handleClickLogin}
            >
                <LoginForm
                    onSubmit={handleLoginFormSubmit}
                    onClose={isModalOpen}
                />
            </Modal>
        </>
    )
}

export default MenuHeader;