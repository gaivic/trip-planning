import React from "react";

const Button = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-button'}
        ${outline ? 'border-black' : 'border-button'}
        ${outline ? 'text-black' : 'text-black'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
            absolute
            left-4
            top-3
          "
                />
            )}
            {label}
        </button>
    );
};

export default Button;
