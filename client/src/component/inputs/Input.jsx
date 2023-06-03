const Input = ({
    id,
    label,
    type = "text",
    disabled,
    defaultValue,
    formatPrice,
    required,
    errors,
}) => {
    return (
        <div className="w-full relative">
            {/* {locationTitle && (
                <div size={24}
                    className="
            text-gray-700
            absolute
            top-5
            left-2
          ">
            {locationTitle}
          </div>
            )} */}

            <input
                id={id}
                disabled={disabled}
                defaultValue={defaultValue}
                placeholder=" "
                type={type}
                className={`
          peer
          w-full
          pb-4
          pt-9
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          pl-4
          ${errors[id] ? 'border-button' : 'border-gray-300'}
          ${errors[id] ? 'focus:border-button' : 'focus:border-black'}
        `}
            />
            <label
                className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          left-4
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-button' : 'text-zinc-400'}
        `}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
