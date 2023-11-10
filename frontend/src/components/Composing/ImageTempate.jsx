import React, { useEffect, useState } from 'react';

const ImageTemplate = ({ position_x, position_y, width, height, z_index, bg_width, bg_height, title }) => {
    const [article, setArticle] = useState({
        position_x: position_x || 0,
        position_y: position_y || 0,
        width: width || 200,
        height: height || 70,
        z_index: z_index || 1,
    });
    const [style, setStyle] = useState({});

    useEffect(() => {
        setArticle({ position_x, position_y, width, height, z_index });
    }, [position_x, position_y, width, height, z_index])

    useEffect(() => {
        const scale = 600 / bg_width;
        const img_width = scale * article.width;
        const img_height = scale * article.height;
        const left = scale * article.position_x;
        const top = scale * article.position_y;

        setStyle({
            position: "absolute",
            boxingSize: "border-box",
            border: "solid 1px #9747FF",
            width: `${img_width}px`,
            height: `${img_height}px`,
            top: `${top}px`,
            left: `${left}px`,
            zIndex: article.z_index
        });
    }, [bg_height, bg_width, article]);
    return (
        <>
            <div style={style}>
                <div style={{ padding: "4px 10px", backgroundColor: "#9747FF", boxingSize: "border-box" }}>
                    {title}
                </div>
            </div>
        </>
    );
};

export default ImageTemplate;