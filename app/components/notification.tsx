import { Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface NotificationProps {
    message: string;
    onclose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onclose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fadeOutTimer = setTimeout(() => {
            setIsVisible(false); 
        }, 4000); 

        const closeTimer = setTimeout(() => {
            onclose(); 
        }, 5000); 

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(closeTimer);
        };
    }, [onclose]);

    return (
        <div
            className={`toast toast-top toast-left transition-opacity duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div className="alert text-accent font-bold p-4 text-sm shadow-lg">
                <span className="flex items-center">
                    <Info className="l-4 mr-2 font-bold text-accent" />
                    {message}
                </span>
            </div>
        </div>
    );
};

export default Notification;