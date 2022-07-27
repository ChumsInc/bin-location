import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "../../app/configureStore";
import {
    selectItemFind,
    selectItemReplace, selectItemSearch,
    selectSelectedItemsLength,
    setExecFindReplaceAction,
    setFindAction,
    setReplaceAction, setSearch
} from "./index";
import React, {ChangeEvent} from "react";

const BinLocationFindReplace = () => {
    const dispatch = useAppDispatch();
    const search = useSelector(selectItemSearch);
    const find = useSelector(selectItemFind);
    const replace = useSelector(selectItemReplace);
    const selectedCount = useSelector(selectSelectedItemsLength);


    const searchChangeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(ev.target.value));
    }
    const findChangeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setFindAction(ev.target.value));
    }
    const replaceChangeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setReplaceAction(ev.target.value));
    }

    const execClickHandler = () => {
        dispatch(setExecFindReplaceAction());
    }


    return (
        <div className="d-none d-md-block">
            <div className="row g-3 mb-1 align-items-baseline">
                <div className="col-auto">Filter</div>
                <div className="col-3">
                    <div className="input-group input-group-sm">
                        <div className="input-group-text"><span className="bi-search" /></div>
                        <input type="text" className="form-control form-control-sm" value={search} onChange={searchChangeHandler} />
                    </div>
                </div>
                {!!selectedCount && (
                    <>
                        <div className="col-3">
                            <div className="input-group input-group-sm">
                                <div className="input-group-text">Find</div>
                                <input type="text" className="form-control form-control-sm" value={find} onChange={findChangeHandler} />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="input-group input-group-sm">
                                <div className="input-group-text">Replace</div>
                                <input type="text" className="form-control form-control-sm" value={replace} onChange={replaceChangeHandler} />
                            </div>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-sm btn-warning" onClick={execClickHandler} disabled={!selectedCount || !find}>
                                Replace ({selectedCount})
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default BinLocationFindReplace;
