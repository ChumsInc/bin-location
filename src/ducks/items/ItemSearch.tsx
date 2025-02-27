import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {ChangeEvent, useId} from "react";
import {selectSearch, setSearch} from "./index";
import {FormControl, InputGroup} from "react-bootstrap";

export default function ItemSearch() {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectSearch);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(ev.target.value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Item Code</InputGroup.Text>
            <FormControl type="search" size="sm" id={id} value={value} onChange={changeHandler}/>
        </InputGroup>
    )
}

