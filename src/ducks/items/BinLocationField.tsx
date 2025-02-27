import React, {ChangeEvent, useEffect, useState} from 'react';
import {setItemEditing, updateItem} from "./index";
import Badge from "react-bootstrap/Badge";
import {useAppDispatch} from "@/app/configureStore";
import {EditableBinLocation} from "@/types/bin-location";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {parseBinLocations} from "@/ducks/items/utils";


export interface BinLocationFieldProps {
    item: EditableBinLocation,
}

const BinLocationField = ({item}: BinLocationFieldProps) => {
    const dispatch = useAppDispatch();
    const [locations, setLocations] = useState<string[]>(parseBinLocations(item.newBinLocation ?? item.BinLocation));

    useEffect(() => {
        setLocations(parseBinLocations(item.newBinLocation ?? item.BinLocation));
    }, [item])

    const bgColor = 'dark';

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateItem({...item, newBinLocation: ev.target.value}));
    }

    const undoHandler = () => {
        dispatch(updateItem({...item, newBinLocation: item.BinLocation, editing: false}));
    }

    const onClickNew = () => {
        dispatch(setItemEditing({...item, editing: true}));
    }

    return (
        <div className="d-flex flex-row g-1">
            {!item.editing && (
                locations.map((loc, index) => (
                    <Badge key={index} bg={bgColor}>{loc}</Badge>)
                )
            )}
            {item.editing && (
                <InputGroup size="sm">
                    <FormControl type="text" size="sm"
                                 value={item.newBinLocation ?? item.BinLocation}
                                 onChange={changeHandler}/>
                    <Button variant="outline-secondary" size="sm" onClick={undoHandler}>
                        <span className="bi-arrow-counterclockwise" aria-label="Undo changes"/>
                    </Button>
                </InputGroup>
            )}
            {!item.editing && !item.BinLocation && (
                <Button variant="outline-info" size="sm" onClick={onClickNew}>New</Button>
            )}
        </div>
    )
}

export default BinLocationField;
