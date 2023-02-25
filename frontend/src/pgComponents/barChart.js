import { useEffect, useState } from "react";
import { getNumTombsByValue } from "../api/commonAPI";
import ChartII from './chartII';


const BarChart = (props) => {

    const version = props.props;
    const search = props.search;
    const [data, setData] = useState(null);

    console.log(version, 'v', search, 's')

    // impiment axios req to get barchart data based on props
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getNumTombsByValue(search, version);
                console.log(response, 'data')
                setData(null)
                setData(response)

            } catch (err) {
                console.log('err', err)
            }
        }
        fetchData();
    }, [version, search])


    return (
        <div>
            <p>barchar {version}, {search}</p>
            {data ? <ChartII data = {data}></ChartII> : <p>awaiting chartII props</p>}
        </div>
    )
}
export default BarChart;