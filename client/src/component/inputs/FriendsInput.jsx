import { useState } from 'react';

const FriendBox = ({ label, selected, onClick }) => {
    const [filled, setFilled] = useState(false);

    const handleToggleFill = () => {
        setFilled(!filled);
    };


    return (
        <div
            onClick={() => {
                onClick(label);
                handleToggleFill();
            }}
            className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-gray-700
        transition
        cursor-pointer
        ${selected ? 'border-gray-400' : 'border-neutral-200'}
      `}
        >
            {/* <Icon size={30} /> */}
            <div className="font-semibold flex flex-row gap-4 items-center">
                <div
                    className={`w-7 h-7 rounded-full border-[2px] border-gray-300 flex items-center justify-center cursor-pointer hover:opacity-80 transition
                    ${filled ? 'bg-button' : ''}`}
                ></div>
                {label}
            </div>
        </div>
    );
}

export default FriendBox;
