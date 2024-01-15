export function calcPosition(template, params) {
    switch (params.alignment) {
        case "top-left":
            return [template.position_x, template.position_y];
        case "top-center":
            return [(template.position_x + template.width * (1 - params.scaling) / 2), template.position_y];
        case "top-right":
            return [(template.position_x + template.width * (1 - params.scaling)), template.position_y];
        case "middle-left":
            return [template.position_x, (template.position_y + template.height * (1 - params.scaling) / 2)];
        case "middle-center":
            return [(template.position_x + template.width * (1 - params.scaling) / 2), (template.position_y + template.height * (1 - params.scaling) / 2)];
        case "middle-right":
            return [(template.position_x + template.width * (1 - params.scaling)), (template.position_y + template.height * (1 - params.scaling) / 2)];
        case "bottom-left":
            return [template.position_x, (template.position_y + template.height * (1 - params.scaling))];
        case "bottom-center":
            return [(template.position_x + template.width * (1 - params.scaling) / 2), (template.position_y + template.height * (1 - params.scaling))];
        case "bottom-right":
            return [(template.position_x + template.width * (1 - params.scaling)), (template.position_y + template.height * (1 - params.scaling))];
        default:
            return [template.position_x, template.position_y];
    }
}
export function convArticle(item, template, params) {
    const position = calcPosition(template, params)
    const article = {
        name: item.name,
        article_number: item.article_number,
        mediaobject_id: item.mediaobject_id,
        render_url: item.render_url,
        tiff_url: item.tiff_url,
        scaling: params.scaling,
        is_transparent: params.is_transparent,
        alignment:params.alignment,
        z_index: template.z_index,
        width: template.width * params.scaling,
        height: template.height * params.scaling,
        left: position[0],
        top: position[1],
        pos_index: template.pos_index
    }
    return article
}

export function getIndex(usedArticle, template) {
    let usedIndices = usedArticle.map(item => item.pos_index);
    let available_index = template.article_placements.find(i => !usedIndices.includes(i.pos_index))
    if (available_index) {
        return available_index.pos_index;
    } else {
        return -1;
    }
}