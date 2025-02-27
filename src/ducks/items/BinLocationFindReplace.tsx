import {useSelector} from "react-redux";
import {useAppDispatch} from "@/app/configureStore";
import {selectToggledItems, setExecFindReplaceAction} from "./index";
import React, {ChangeEvent, useEffect, useId} from "react";
import {EditableBinLocation} from "@/types/bin-location";
import classNames from "classnames";
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import {saveBinLocation} from "@/ducks/items/actions";

const BinLocationFindReplace = () => {
    const dispatch = useAppDispatch();
    const rows = useSelector(selectToggledItems);
    const [find, setFind] = React.useState("");
    const [replace, setReplace] = React.useState("");
    const [pendingChanges, setPendingChanges] = React.useState<EditableBinLocation[]>([]);
    const [show, setShow] = React.useState(rows.length > 0);
    const findId = useId();
    const replaceId = useId();

    useEffect(() => {
        setShow(rows.length > 0);
    }, [rows]);

    useEffect(() => {
        const pending = rows.filter(row => row.BinLocation.toUpperCase().includes(find.toUpperCase()))
            .map(row => ({...row, newBinLocation: row.BinLocation.replace(find.toUpperCase(), replace.toUpperCase())}));
        setPendingChanges(pending);
    }, [rows, find, replace]);

    const execClickHandler = async () => {
        for await (const item of pendingChanges) {
            await dispatch(saveBinLocation(item));
        }
        console.log('todo', pendingChanges)
        dispatch(setExecFindReplaceAction());
    }

    const findChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setFind(ev.target.value.toUpperCase());
    }

    const replaceChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setReplace(ev.target.value.toUpperCase());
    }

    return (
        <div className={classNames("collapse", {show})}>
            <Row className="g-3 align-items-baseline">
                <Col xs="auto">
                    <InputGroup size="sm">
                        <InputGroup.Text as="label" htmlFor={findId}>Find</InputGroup.Text>
                        <FormControl type="search" size="sm" id={findId}
                                     value={find} onChange={findChangeHandler} disabled={!show}/>
                    </InputGroup>
                </Col>
                <Col xs="auto">
                    <InputGroup size="sm">
                        <InputGroup.Text as="label" htmlFor={replaceId}>Replace</InputGroup.Text>
                        <FormControl type="search" size="sm" id={replaceId}
                                     value={replace} onChange={replaceChangeHandler} disabled={!show}/>
                    </InputGroup>
                </Col>
                <Col xs="auto">
                    <Button type="button" variant="outline-secondary" size="sm"
                            onClick={execClickHandler}
                            disabled={pendingChanges.length === 0}>
                        Save Changes ({pendingChanges.length})
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
export default BinLocationFindReplace;
