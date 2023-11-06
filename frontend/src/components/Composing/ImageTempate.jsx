const ImageTemplate = ({ top, left, width, height, zIndex, title = "Image1" }) => {
    return (
        <>
            <div className="image-outline" style={{ padding: "10px 10px 10px 10px", border: "solid 1px #9747FF" }}>
                <div style={{ padding: "4px 10px 4px 10px", backgroundColor: "#9747FF" }}>
                    {title}
                </div>
            </div>
        </>
    )
}

export default ImageTemplate