import React from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemCard from "components/Product-View/ProductCard";
const DataTable = (items)=> {
    return(
        <div className='template-tab-1'>
            <div id="scrollableDiv" className='product-container' style={{
                overflow: 'scroll',
                overflowX: 'hidden'
            }}>
                {/* <InfiniteScroll
                    dataLength={items.length}
                    next={(e) => fetchMoreData("template")}
                    hasMore={true}
                    loader={loadingTemplateStatus === true ? <div className="loading">Loading&#8230;</div> : null}
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
                    {items?.map((e, key) => {
                        return (
                            < ItemCard key={key} cardInfo={e} />
                        )
                    }
                    )}
                </InfiniteScroll> */}
            </div>
        </div>
    );
}

export default DataTable;