import "./style/layoutCompoStyle.scss"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import OverlayGroup from "../Product-View/OverlayGroup"
import OverlaySide from "../Product-View/OverlaySide"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { composingActions } from "store/reducer"
import { useTranslation } from "react-i18next"

const SideNav = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const selectedProducts = useSelector(state => state.composing.composingElements)
    const [items, setItems] = useState([])
    const location = useLocation()
    const path = location.pathname
    const saveStatus = useSelector(state => state.products.saveStatus)
    const [draggedItem, setDraggedItem] = useState({})
    const [posIndexGroup, setPosIndexGroup] = useState([])
    const handleSelect = () => {
        navigate(`/composing/edit/${id}`);
    }
    const handleSummary = () => {
        navigate('/composing/view')
    }
    console.log("posIndexGroup",posIndexGroup)
    useEffect(
        () => {
            const posIndexGroup = [];
            console.log("selectedProducts",selectedProducts)
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
        dispatch(composingActions.setComposingArticle(updatedItems));
    };
    return (
        <>
        {path === "/composing/view" ?
        <div className="nav-items">
            <div className="nav-items--inactive pointer" onClick={() => { handleSelect() }}>{t("Produkte auswählen")}</div>
            {saveStatus === false && items
                ?.slice()
                .sort((a, b) => a.pos_index - b.pos_index)
                .map((productItem, index) => {
                    return (
                        <div
                            key={index}
                            className="nav-items--inactive"
                        >
                            <OverlaySide productInfo={productItem} />
                        </div>
                    );
                })}
            <div className="nav-items--active pointer" onClick={() => { handleSummary() }}>{t("Zusammenfassung")}</div>
        </div>:
        <div className="nav-items">
            <div className="nav-items--active pointer" onClick={() => { handleSelect() }}>{t("Produkte auswählen")}</div>
            {saveStatus === false && items
                ?.slice()
                .sort((a, b) => a.pos_index - b.pos_index)
                .map((productItem, index) => {
                    return (
                        <div
                            key={index}
                            onDragOver={(e) => onDragOver(e, index)}
                            draggable
                            onDragStart={(e) => onDragStart(e, index)}
                            onDragEnd={(e) => onDragEnd()}
                            className="nav-items--active"
                        >
                            <OverlayGroup article={productItem} id={id} />
                        </div>
                    );
                })}

            <div className="nav-items--inactive pointer" onClick={() => { handleSummary() }}>{t("Zusammenfassung")}</div>
        </div>}
        </>
    )
}

export default SideNav