import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {ChangeEvent} from "react";
import {selectItemFilter, setItemFilterAction} from "./index";

const ItemFilter = () => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectItemFilter);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setItemFilterAction(ev.target.value));
    }

    return (
        <div className="input-group input-group-sm">
            <span className="input-group-text">Item Code</span>
            <input type="search" className="form-control form-control-sm" value={value} onChange={changeHandler}/>
        </div>
    )
}

export default ItemFilter;
