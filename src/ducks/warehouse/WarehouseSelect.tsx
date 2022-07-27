import React, {ChangeEvent, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from "../../app/configureStore";
import {
    loadWarehouseListAction,
    selectWarehouseList,
    selectWarehousesLoaded,
    selectWarehousesLoading,
} from "./index";
import {selectCurrentWarehouse, setWarehouseFilterAction} from "../items";

const WarehouseSelect = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectWarehousesLoading);
    const loaded = useSelector(selectWarehousesLoaded);
    useEffect(() => {
        if (loading || loaded) {
            return;
        }
        dispatch(loadWarehouseListAction());
    }, []);
    const list = useSelector(selectWarehouseList);
    const value = useSelector(selectCurrentWarehouse);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setWarehouseFilterAction(ev.target.value));
    }

    return (
        <div className="input-group input-group-sm">
            <span className="input-group-text">Whse</span>
            <select className="form-select form-select-sm" value={value} onChange={changeHandler} disabled={loading}>
                <option value="">All Warehouses</option>
                {list
                    .filter(whse => whse.WarehouseStatus === 'A')
                    .map(whse => (
                        <option value={whse.WarehouseCode} key={whse.WarehouseCode}>
                            {whse.WarehouseCode} - {whse.WarehouseDesc}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default WarehouseSelect;
