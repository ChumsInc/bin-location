import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectFilterItem, setItemFilter} from "@/ducks/items/index";
import {FormControl, InputGroup} from "react-bootstrap";

export default function ItemLoadFilter() {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectFilterItem);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setItemFilter(ev.target.value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Item Code</InputGroup.Text>
            <FormControl type="search" size="sm" id={id} value={value} onChange={changeHandler}/>
        </InputGroup>
    )
}
