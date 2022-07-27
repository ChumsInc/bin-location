import React, {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {saveItemAction, selectItemByKey, selectItemsLoading, undoItemChange, updateItemAction} from "./index";
import {Badge} from "chums-components";
import {useSwipeable} from "react-swipeable";
import {binLocations, SwipeableBinLocation} from "./utils";
import {useAppDispatch} from "../../app/configureStore";
import classNames from "classnames";
import {BinLocation} from "chums-types";
import {EditableBinLocation} from "../../types";


export interface BinLocationFieldProps {
    item: EditableBinLocation,
}

const BinLocationField = ({item}: BinLocationFieldProps) => {
    const dispatch = useAppDispatch();
    const locations = binLocations((item.changed || item.editing) ? item.newBinLocation || '' : item.BinLocation) || [];
    const bgColor = 'dark';

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateItemAction(item.key, ev.target.value.toUpperCase()));
    }

    const undoHandler = () => {
        dispatch(undoItemChange(item.key));
    }

    const saveHandler = () => {
        dispatch(saveItemAction(item));
    }
    return (
        <div className="d-flex flex-row">
            <div className={classNames({'d-none':item.editing})}>
                {locations.map((loc, index) => (
                    <Badge key={index} color={bgColor}>{loc}</Badge>
                ))}
            </div>
            <div className={classNames("input-group inout-group-sm", {'d-none': !item.editing})}>
                <input type="text" className="form-control form-control-sm"
                       maxLength={10}
                       value={item.newBinLocation} onChange={changeHandler}/>
                <button className="btn btn-sm btn-outline-warning" onClick={undoHandler}>
                    <span className="bi-arrow-counterclockwise" />
                </button>
            </div>
            {!item.editing && !item.BinLocation && <button className="btn btn-xs btn-outline-info">New</button> }
        </div>
    )
}

export default BinLocationField;
