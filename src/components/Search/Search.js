import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../../api';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(
                `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
                geoApiOptions
            );
            const data = await response.json();
            console.log(data)
            const options = data?.data.map(item => ({
                value: `${item.latitude} ${item.longitude}`, // Replace 'value' with the appropriate property name for your data
                label: `${item.name},${item.countryCode}`, // Replace 'label' with the appropriate property name for your data
            }));
            return { options }; // Return the options in the expected format
        } catch (error) {
            console.error(error);
            return { options: [] }; // Return an empty array if there's an error or no data
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for a city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
