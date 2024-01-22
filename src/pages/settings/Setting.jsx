import TypeList from "./TypeList"
const Setting = () => {
    return (
        <>
            <div className="setting-form">
                <TypeList type={"Marke"} label={"brand"} />
                <TypeList type={"Anwendung"} label={"application"} />
                <TypeList type={"Land"} label={"country"} />
            </div>
        </>
    )
}

export default Setting