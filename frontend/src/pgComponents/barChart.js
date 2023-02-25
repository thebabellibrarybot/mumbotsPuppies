import { useEffect, useState } from "react";
import { getNumTombsByValue } from "../api/commonAPI";

const BarChart = (props) => {

    const version = props.props;
    const search = props.search;
    const [data, setData] = useState();

    console.log(version, 'v', search, 's')

    // impiment axios req
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getNumTombsByValue(search, version);
                console.log(response, 'data')
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
        </div>
    )
}
export default BarChart;