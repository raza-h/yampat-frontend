import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-gray-100 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    );
};

export default LoadingScreen;
