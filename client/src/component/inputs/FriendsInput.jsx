
const FriendBox = ({
    label,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={() => onClick(label)}
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
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
        >
            {/* <Icon size={30} /> */}
            <div className="font-semibold flex flex-row gap-4 items-center">
                <div
                    onClick={() => { }}
                    className="w-7 h-7 rounded-full border-[2px] border-gray-300 flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                ></div>
                {label}
            </div>
        </div>
    );
}

export default FriendBox;
