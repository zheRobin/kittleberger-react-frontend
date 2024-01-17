import React from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Item from "./Item";
import { Loading } from "libs/icons"
const DataTable = ({items, index, page, next})=> {
    return(
        <div className='template-tab-1'>
            <div id={`scrollableDiv-${index}`} className='product-container' style={{
                overflow: 'scroll',
                overflowX: 'hidden'
            }}> 
                <InfiniteScroll
                    dataLength={items.length}
                    next={next}
                    hasMore={true}
                    loader={items.length < (15*page) ? null : <Loading />}
                    className='infinite-scroll-component'
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    style={{ overflowX: "hidden" }}
                    scrollableTarget={`scrollableDiv-${index}`}
                    id='scrollable'
                >               
                    {items?.map((el, key) => (index === "template"?<TemplateItem key={key} item={el} />:<ProductItem key={key} item={el} />))}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export const ProductItem = ({item}) => {
    const CardInfo = {
        i: item.id,
        n: item.name,
        x: item.template.resolution_width,
        y: item.template.resolution_height,
        d: item.template.resolution_dpi,
        f: item.template.file_type,
        u: item.png_result !== '' ? item.png_result : item.cdn_url,
        l: `composing/view/${item.id}`,
        m: "composing"
    }
    return <Item cardInfo={CardInfo} />
}

export const TemplateItem = ({item}) => {
    const CardInfo = {
        i: item.id,
        n: item.name,
        x: item.resolution_width,
        y: item.resolution_height,
        d: item.resolution_dpi,
        f: item.file_type,
        u: item.preview_image_cdn_url !== '' ? item.preview_image_cdn_url : item.bg_image_cdn_url,
        l: `composing/edit/${item.id}`,
        m: "template"
    }
    return <Item cardInfo={CardInfo} />
}

export default DataTable;