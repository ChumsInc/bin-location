import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectPagedItemList, selectSelectedItemsLength, toggleItemSelectedAction} from "./index";
import {ChangeEvent, useEffect, useRef, useState} from "react";

interface SelectAllState {
    visible: number,
    visibleSelected: number,
    selected: number,
}
const defaultState:SelectAllState = {
    visible: 0,
    visibleSelected: 0,
    selected: 0,
}

const SelectAll = () => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLInputElement>(null);
    const visibleItems = useSelector(selectPagedItemList);
    const selectedCount = useSelector(selectSelectedItemsLength);

    const [state, setState] = useState<SelectAllState>(defaultState)
    useEffect(() => {
        const nextState = {
            visible: visibleItems.length,
            visibleSelected: visibleItems.filter(i => i.selected).length,
            selected: selectedCount
        };
        setState(nextState);
    }, [visibleItems, selectedCount]);

    useEffect(() => {
        const allChecked = (state.visibleSelected === state.visible || state.selected === state.visibleSelected) && state.visibleSelected > 0;
        const isIndeterminate = !allChecked && state.selected !== state.visibleSelected;
        if (ref.current) {
            ref.current.checked = allChecked;
            ref.current.indeterminate = isIndeterminate;
        }
    }, [state.visibleSelected, state.selected]);

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        ev.stopPropagation();
        ev.preventDefault();
        console.log('changeHandler()', ev.target.checked);
        visibleItems.forEach(item => {
            dispatch(toggleItemSelectedAction(item.key, ev.target.checked));
        })
    }
    return (
        <div className="form-check">
            <input ref={ref} className="form-check-input" id="bl--select-all" type="checkbox"
                   onChange={changeHandler}/>
                <label className="form-check-label" htmlFor="bl--select-all">
                    ({selectedCount})
                </label>
        </div>
    )
}

export default SelectAll;
