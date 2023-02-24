import React, { useEffect, useState } from 'react';
import { getNumTombsByValue } from '../api/commonAPI';

const BarChart = () => {

    // state
    const [data, setData] = useState(null);


    // get data on props-clicked
    function onClickProps(props) {
        setData(props);
    }

    return (
        <div>
            <h1>hello from barchart</h1>
            <p>check this data for: {data}</p>
            <div>
                <button label = 'date' onClick={() => onClickProps('date')}>show date</button>
                <button label = 'type' onClick={() => onClickProps('type')}>show type</button>
            </div>
            <div className={data ? data : 'invisible'}>
                <p>hidden div</p>
            </div>
        </div>
    );
};

export default BarChart;