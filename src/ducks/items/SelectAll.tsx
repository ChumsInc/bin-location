import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {useSelector} from "react-redux";
import {selectFilteredItems, selectPage, selectRowsPerPage, toggleManySelected} from "./index";
import {ChangeEvent, useEffect, useId, useRef, useState} from "react";
import {EditableBinLocation} from "@/types/bin-location";
import {FormCheck} from "react-bootstrap";

export default function SelectAll() {
    const dispatch = useAppDispatch();
    const rows = useSelector(selectFilteredItems);
    const page = useAppSelector(selectPage);
    const rowsPerPage = useAppSelector(selectRowsPerPage);
    const ref = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState<EditableBinLocation[]>([]);
    const [checked, setChecked] = useState<number>(0);
    const [allChecked, setAllChecked] = useState<boolean | null>(true);
    const id = useId();

    useEffect(() => {
        const visible = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        const count = visible.filter(item => item.selected).length;
        setVisible(visible);
        setChecked(count);
        switch (count) {
            case 0:
                setAllChecked(false);
                return;
            case visible.length:
                setAllChecked(true);
                return;
            default:
                setAllChecked(null);
        }
    }, [rows, page, rowsPerPage]);

    useEffect(() => {
        if (ref.current) {
            ref.current.checked = allChecked === true;
            ref.current.indeterminate = allChecked === null;
        }
    }, [allChecked]);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        ev.stopPropagation();
        ev.preventDefault();
        const changes = visible.map(bl => ({...bl, selected: ev.target.checked}));
        dispatch(toggleManySelected(changes));
    }

    return (
        <FormCheck>
            <FormCheck.Input ref={ref} id={id} type="checkbox" onChange={changeHandler}/>
            <FormCheck.Label htmlFor={id} aria-label="Select All">
                ({checked})
            </FormCheck.Label>
        </FormCheck>
    )
}
