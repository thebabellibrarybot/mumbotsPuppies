import React, { /*useEffect,*/ useState } from 'react';
import BarChart from './barChart';

const BarChartOptions = () => {

    // state
    const [type, setType] = useState(null);
    const [location, setLocation] = useState(null)
    const [searchValue, setSearchValue] = useState('nada');
    const yearArray = [1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100]

    // get data on props-clicked
    function onClickProps(props) {
        if (props === 'type') {
            setType(true)
            setLocation(false)
        }
        if (props === 'location') {
            setLocation(true)
            setType(false)
        }
    }
    function handleChange (event) {
        console.log(event.target.value, 'eventtaargetvalue')
        setSearchValue(event.target.value)
    }

    return (
        <div> 
            <h1>hello from barchart</h1>
            <div>
                <button label = 'type' onClick={() => onClickProps('type')}>show type</button>
                <button label = 'location' onClick={() => onClickProps('location')}>show location</button>
                <form>
                    <select value = {searchValue} onChange={handleChange}>
                        <option value="">Select an option</option>
                            {yearArray.map((year) => {
                                return (
                                    <option value = {year} onChange={handleChange}>{year}</option>
                                )
                            })}
                    </select>
                </form>
            </div>
            <div className='date'>
                {type ? <BarChart props = 'type' search = {searchValue} /> : null}
                {location ? <BarChart props = 'location' search = {searchValue} /> : null}
            </div>
        </div>
    );
};

export default BarChartOptions;