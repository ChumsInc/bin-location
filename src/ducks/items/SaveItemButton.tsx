import React from 'react';
import {EditableBinLocation} from "@/types/bin-location";
import {selectStatusById} from "@/ducks/item-status";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {itemKey} from "@/utils/bin-location";
import {Button, ProgressBar} from "react-bootstrap";
import {saveBinLocation} from "@/ducks/items/actions";

export interface SaveItemButtonProps {
    item: EditableBinLocation;
}
export default function SaveItemButton({item}:SaveItemButtonProps) {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => selectStatusById(state, itemKey(item)));
    const clickHandler = () => {
        dispatch(saveBinLocation(item));
    }
    if (status === 'saving') {
        return (<ProgressBar variant="primary" now={100} striped animated />)
    }

    if (item.newBinLocation === undefined || item.newBinLocation === item.BinLocation) {
        return;
    }

    return (
        <Button type="button" variant="warning" size="sm" onClick={clickHandler} disabled={status !== 'idle'}>
            Save
        </Button>
    )
}
