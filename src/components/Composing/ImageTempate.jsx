import React, { useEffect, useState } from 'react';

const ImageTemplate = ({
    position_x = 0,
    position_y = 0,
    width = 200,
    height = 70,
    z_index = 1,
    bg_width,
    bg_height,
    setTempImages,
    backgroundHeight,
    backgroundWidth,
    title,
}) => {
    const [article, setArticle] = useState({});
    const [style, setStyle] = useState({});
    useEffect(() => {
        setArticle({ position_x, position_y, width, height, z_index });
    }, [position_x, position_y, bg_width, bg_height, width, height, z_index, setTempImages])
    useEffect(() => {

        let scale = 0;
        const tempRef = Number(bg_width) >= Number(bg_height) ? Number(bg_width) : Number(bg_height)
        // const tempSmallRef = Number(bg_width) >= Number(bg_height) ? Number(bg_height) : Number(bg_width)
        if (Number(bg_width) !== 0 || Number(bg_height) !== 0) {
            scale = (500) / (tempRef);
        }
        const img_width = ((Number(article.width) + Number(article.position_x)) >= Number(bg_width) ? scale * (Number(bg_width) - Number(article.position_x)) : scale * Number(article.width));
        const img_height = ((Number(article.height) + Number(article.position_y)) >= Number(bg_height) ? scale * (Number(bg_height) - Number(article.position_y)) : scale * Number(article.height));

        const left = Number(article.position_x) > Number(bg_width) ? scale * Number(bg_width) : scale * Number(article.position_x);
        const top = Number(article.position_y) > Number(bg_height) ? scale * Number(bg_height) : scale * Number(article.position_y);

        setStyle({
            position: "absolute",
            boxSizing: "border-box",
            border: "solid 1px #9747FF",
            width: `${img_width < 0 ? 0 : img_width}px`,
            height: `${img_height < 0 ? 0 : img_height}px`,
            top: `${top}px`,
            left: `${left}px`,
            zIndex: article.z_index,
        });
        setTempImages && setTempImages({ width: bg_width, height: bg_height });

    }, [bg_height, bg_width, backgroundWidth, backgroundHeight, article, setTempImages]);

    return (
        <div style={style}>
            <div style={{ padding: "4px 10px", backgroundColor: "#9747FF", boxSizing: "border-box", display: "inline-block" }}>
                {title}
            </div>
        </div>
    );
};

export default ImageTemplate;