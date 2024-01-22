import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import OverlayGroup from "../Product-View/OverlayGroup"
import { composingActions } from "store/reducer"
import "./style/layoutCompoStyle.scss"

const EditSidebar = () => {
    const { id } = useParams();
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [items, setItems] = useState([])
    const [draggedItem, setDraggedItem] = useState({})
    const [posIndexGroup, setPosIndexGroup] = useState([])
    const selectedProducts = useSelector(state => state.composing.composingElements)
    const savedComposing = useSelector(state => state.composing.savedComposing)
    const saveStatus = useSelector(state => state.composing.saveStatus)
    const handleSummary = () => {
        savedComposing && saveStatus?navigate(`/composing/view/${savedComposing.id}`):navigate(`/composing/view`)
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
        dispatch(composingActions.resetComposingArticle(updatedItems));
    };
    return (
        <div className="nav-items">
            <div className="nav-items--active pointer">{t("Produkte auswählen")}</div>
            {items
                ?.slice()
                .sort((a, b) => a.pos_index - b.pos_index)
                .map((item, index) => {
                    return (
                        <div
                            key={index}
                            onDragOver={(e) => onDragOver(e, index)}
                            draggable
                            onDragStart={(e) => onDragStart(e, index)}
                            onDragEnd={(e) => onDragEnd()}
                            className="nav-items--active"
                        >
                            <OverlayGroup article={item} id={id} />
                        </div>
                    );
                })}
            <div className="nav-items--inactive pointer" onClick={() => { handleSummary() }}>{t("Zusammenfassung")}</div>
        </div>
    )
}

export default EditSidebar