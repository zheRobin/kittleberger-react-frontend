import "./style/layoutCompoStyle.scss"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import OverlayGroup from "../Product-View/OverlayGroup"
import OverlaySide from "../Product-View/OverlaySide"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updateProducts } from "../../store"

const SideNav = () => {
    const [items, setItems] = useState([])
    const location = useLocation()
    const path = location.pathname
    const navigate = useNavigate()
    const selectedProducts = useSelector(state => state.products.selectedProducts)
    const [draggedItem, setDraggedItem] = useState({})
    const dispatch = useDispatch()
    const [posIndexGroup, setPosIndexGroup] = useState([])
    const handleSelect = () => {
        navigate('/product/product-select')
    }
    const handleSummary = () => {
        navigate('/product/summary')
    }
    useEffect(
        () => {
            const posIndexGroup = [];
            for (const product of selectedProducts ? selectedProducts : []) {
                posIndexGroup.push(product.pos_index);
            }
            setPosIndexGroup(posIndexGroup);
            setItems(selectedProducts)
        }, [selectedProducts]
    )
    const onDragStart = (e, index) => {
        const draggedItems = items[index];
        setDraggedItem(draggedItems)
        setDraggedItem(state => { return state })
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    function onDragOver(e, index) {
        e.preventDefault();
        document.querySelector(`.nav-items--active`).classList.add("nav-items--inactive");
        e.dataTransfer.effectAllowed = "copyMove";
        const draggedOverItem = items[index];
        if (draggedItem === draggedOverItem) {
            return;
        }
        let itemGroups = items.filter(item => item !== draggedItem);

        itemGroups.splice(index, 0, draggedItem);
        setItems(itemGroups)
    };

    const onDragEnd = () => {
        const posIndexGroups = [...posIndexGroup];
        const updatedItems = items.map((item, index) => {
            return {
                ...item,
                pos_index: posIndexGroups[index],
            };
        });
        dispatch(updateProducts(updatedItems));
    };

    return (
        <>
            <div className="nav-items">
                <div className={path === "/product/product-select" ? "nav-items--active pointer" : "nav-items--inactive pointer"} onClick={() => { handleSelect() }}>Produkte auswählen</div>
                {items?.map((productItem, index) => {
                    return (
                        <div key={index} onDragOver={(e) => onDragOver(e, index)} draggable
                            onDragStart={e => onDragStart(e, index)} onDragEnd={e => onDragEnd()} className={path === "/product/product-select" ? "nav-items--active pointer" : "nav-items--inactive pointer "} >{path === "/product/product-select" ? (<OverlayGroup productInfo={productItem} index={index} />) : <OverlaySide productInfo={productItem} />}</div>
                    )
                })}

                <div className={path === "/product/summary" ? "nav-items--active pointer" : "nav-items--inactive pointer"} onClick={() => { handleSummary() }}>Zusammenfassung</div>
            </div>
        </>
    )
}

export default SideNav