import {useAppDispatch} from "@/app/configureStore";
import {toggleSelected} from "./index";
import {ChangeEvent, useId} from "react";
import {EditableBinLocation} from "@/types/bin-location";
import {FormCheck} from "react-bootstrap";

export interface ItemToggleProps {
    item: EditableBinLocation;
}

const ItemToggle = ({item}: ItemToggleProps) => {
    const dispatch = useAppDispatch();
    const {WarehouseCode, ItemCode} = item;
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleSelected({WarehouseCode, ItemCode, selected: ev.target.checked}));
    }

    return (
        <FormCheck>
            {/*<FormCheck.Label htmlFor={id}>Selected</FormCheck.Label>*/}
            <FormCheck.Input type="checkbox" id={id}
                   aria-label={`Toggle ${WarehouseCode}/${ItemCode} selected`}
                   checked={item.selected ?? false} onChange={changeHandler}/>
        </FormCheck>
    )
}

export default ItemToggle;
