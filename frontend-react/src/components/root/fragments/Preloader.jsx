import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true); 
            setTimeout(() => {
                setLoading(false);
                setModalIsOpen(true); // Mở popup khi loading hoàn tất
            }, 500); 
        }, 1000); 

        return () => clearTimeout(timer); 
    }, []);

    if (!loading) return null; 

    return (
        <div className={`fixed top-0 left-0 z-[999999999] w-full h-full bg-white overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="preloader-icon relative w-24 h-24">
                    <span className="absolute inline-block w-full h-full rounded-full bg-orange-500 animate-preloader-fx"></span>
                    <span className="absolute inline-block w-full h-full rounded-full bg-orange-500 animate-preloader-fx delay-200"></span>
                </div>
            </div>

            {/* Modal */}
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)} 
                contentLabel="Loading Complete"
                className="Modal" 
                overlayClassName="Overlay"
            >
                <h2>Chào mừng đến với ứng dụng!</h2>
                <button onClick={() => setModalIsOpen(false)}>Đóng</button>
            </Modal>
        </div>
    );
};

export default Preloader;
