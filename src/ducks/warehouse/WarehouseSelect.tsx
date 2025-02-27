import React, {ChangeEvent, useEffect, useId} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectFilterWarehouse, setWarehouseFilter} from "../items";
import {selectWarehouses, selectWarehouseStatus} from "@/ducks/warehouse/index";
import {loadWarehouses} from "@/ducks/warehouse/actions";
import {FormSelect, InputGroup} from "react-bootstrap";

const WarehouseSelect = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectWarehouseStatus);
    useEffect(() => {
        dispatch(loadWarehouses());
    }, []);
    const list = useAppSelector(selectWarehouses);
    const value = useSelector(selectFilterWarehouse);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setWarehouseFilter(ev.target.value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Warehouse</InputGroup.Text>
            <FormSelect id={id} size="sm"
                        value={value} onChange={changeHandler} disabled={status !== 'idle'}>
                <option value="">All Warehouses</option>
                {list
                    .map(warehouse => (
                        <option value={warehouse.WarehouseCode} key={warehouse.WarehouseCode}>
                            {warehouse.WarehouseCode} - {warehouse.WarehouseDesc}
                        </option>
                    ))}
            </FormSelect>
        </InputGroup>
    )
}

export default WarehouseSelect;
