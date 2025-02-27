import React, {FormEvent} from 'react';
import WarehouseSelect from "../warehouse/WarehouseSelect";
import {useAppDispatch} from "@/app/configureStore";
import BinLocationFilter from "./BinLocationFilter";
import LoadItemsButton from "./LoadItemsButton";
import {loadItems} from "@/ducks/items/actions";
import ItemLoadFilter from "@/ducks/items/ItemLoadFilter";

const FilterForm = () => {
    const dispatch = useAppDispatch();

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(loadItems());
    }

    return (
        <form className="row g-3" onSubmit={submitHandler}>
            <div className="col-auto">
                <WarehouseSelect/>
            </div>
            <div className="col-auto">
                <ItemLoadFilter/>
            </div>
            <div className="col-auto">
                <BinLocationFilter/>
            </div>
            <div className="col"/>
            <div className="col-auto">
                <LoadItemsButton/>
            </div>
        </form>
    )
}

export default FilterForm;
