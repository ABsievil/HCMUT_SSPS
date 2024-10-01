import React, { useEffect, useState } from 'react';


const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true); 
            setTimeout(() => {
                setLoading(false); 
            }, 500); // Thời gian fade out
        }, 1000); // Thời gian tải

        return () => clearTimeout(timer); // Dọn dẹp timer khi component bị hủy
    }, []);

    if (!loading) return null; // Không render nếu không còn loading

    return (
        <div className={`fixed top-0 left-0 z-[999999999] w-full h-full bg-white overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="preloader-icon relative w-24 h-24">
                    <span className="absolute inline-block w-full h-full rounded-full bg-cyan-600 animate-preloader-fx"></span>
                    <span className="absolute inline-block w-full h-full rounded-full bg-cyan-600 animate-preloader-fx delay-200"></span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
