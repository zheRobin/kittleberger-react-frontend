const OverlaySide = ({ productInfo }) => {
    return (
        <>
            <div className="typography-400-regular" style={{ minWidth: "220px", maxWidth: "20px", color: "white", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                {productInfo.name}({productInfo.article_number})</div>
        </>
    )
}

export default OverlaySide