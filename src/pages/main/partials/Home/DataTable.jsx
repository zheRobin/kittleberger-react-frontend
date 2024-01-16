import React from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Item from "./Item";
const DataTable = ({items, index, page, next})=> {
    console.log(items)
    return(
        <div className='template-tab-1'>
            {items?.map((el, key) => (index === "template"?<TemplateItem key={key} item={el} />:<ProductItem key={key} item={el} />))}
            {/* <div id="scrollableDiv" className='product-container' style={{
                overflow: 'scroll',
                overflowX: 'hidden'
            }}>
                <InfiniteScroll
                    dataLength={items.length}
                    next={(e) => next(page+1)}
                    hasMore={true}
                    loader={items.length < 15*page ? null : <div className="loading">Loading&#8230;</div>}
                    className='infinite-scroll-component'
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    style={{ overflowX: "hidden" }}
                    scrollableTarget="scrollableDiv"
                    id='scrollable'
                >                  
                    {items?.map((el, key) => < Item key={key} cardInfo={el} />)}
                </InfiniteScroll>
            </div> */}
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
        l: `composing/view/${item.id}`
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
        l: `composing/edit/${item.id}`
    }
    return <Item cardInfo={CardInfo} />
}

export default DataTable;