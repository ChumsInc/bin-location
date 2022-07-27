import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectItemByKey, toggleItemSelectedAction} from "./index";
import {ChangeEvent} from "react";

export interface ItemToggleProps {
    itemKey:string,
}

const ItemToggle = ({itemKey}:ItemToggleProps) => {
    const dispatch = useAppDispatch();
    const item = useSelector(selectItemByKey(itemKey));
    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleItemSelectedAction(itemKey, ev.target.checked));
    }
    return (
        <input type="checkbox" checked={item.selected || false} onChange={changeHandler} className="form-check-input" />
    )
}

export default ItemToggle;
