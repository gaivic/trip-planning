const Heading = ({ title, subtitle, center }) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-3xl font-bold">
                {title}
            </div>
            {subtitle && (
                <div className="font-light text-neutral-500 mt-2">
                    {subtitle}
                </div>
            )}
        </div>
    );
};

export default Heading;
