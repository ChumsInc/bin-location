import React, {FormEvent} from 'react';
import WarehouseSelect from "../warehouse/WarehouseSelect";
import {useAppDispatch} from "../../app/configureStore";
import ItemFilter from "./ItemFilter";
import BinLocationFilter from "./BinLocationFilter";
import LoadItemsButton from "./LoadItemsButton";
import {loadItemsListAction} from "./index";

const FilterForm = () => {
    const dispatch = useAppDispatch();

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(loadItemsListAction());
    }

    return (
        <form className="row g-3" onSubmit={submitHandler}>
            <div className="col-auto">
                <WarehouseSelect/>
            </div>
            <div className="col-auto">
                <ItemFilter/>
            </div>
            <div className="col-auto">
                <BinLocationFilter/>
            </div>
            <div className="col-auto">
                <LoadItemsButton/>
            </div>
        </form>
    )
}

export default FilterForm;
