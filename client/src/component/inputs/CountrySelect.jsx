import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import useCountries from '../../hooks/useCountries';

const CountrySelect = ({ value, onChange }) => {
    const { getAll } = useCountries();

    const handleCountryChange = (selectedValue) => {
        // Perform desired action with the selected country value
        console.log('Selected country:', selectedValue);
        onChange(selectedValue);
    };

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={handleCountryChange}
                formatOptionLabel={(option) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>{option.flag}</div>
                        <div>
                            {option.label},
                            <span className="text-gray-600 ml-1">{option.region}</span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: '#8ecaf1',
                        primary25: '#ddeffa ',
                    },
                })}
            />
        </div>
    );
};

CountrySelect.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

export default CountrySelect;
