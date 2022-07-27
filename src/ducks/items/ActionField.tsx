import {EditableBinLocation} from "../../types";
import {useAppDispatch} from "../../app/configureStore";
import {saveItemAction} from "./index";
import React from "react";
import {SpinnerButton} from "chums-components";

export interface ActionFieldProps {
    item:EditableBinLocation,
}

const ActionField = ({item}:ActionFieldProps) => {
    const dispatch = useAppDispatch();
    const saveHandler = () => {
        dispatch(saveItemAction(item));
    }
    if (!item.changed) {
        return null;
    }

    return (
        <SpinnerButton color="warning" size="sm" spinning={item.saving} disabled={!item.changed || item.saving} onClick={saveHandler}>Save</SpinnerButton>
    )

}
export default ActionField;
