import React from 'react';

export const Modal: React.FC<{isOpen: any, setOpen: any, children: any}> = ({ isOpen, setOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex
                        items-center justify-center">
            <div className="bg-black border rounded-lg
                            shadow-lg p-6 max-w-md
                            w-full relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-100"
                    onClick={() => setOpen(false)}>
                    &#x2715; {/* Close button */}
                </button>
                {children}
            </div>
        </div>
    );
};