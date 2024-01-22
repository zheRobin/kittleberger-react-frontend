import TypeList from "./TypeList"
import { useSelector } from "react-redux"
const Setting = () => {
    const data = useSelector(state => state.info.pageData)
    return (
        <>
            <div className="setting-form">
                <TypeList label={"Brand"} type={"brand"} items = {data?.brands}/>
                <TypeList label={"Application"} type={"application"} items = {data?.applications}/>
                <TypeList label={"Country"} type={"country"} items = {data?.country_list}/>
            </div>
        </>
    )
}

export default Setting