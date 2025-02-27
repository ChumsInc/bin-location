import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {ChangeEvent} from "react";
import {selectFilterBinLocation, setBinLocationFilter} from "./index";

const BinLocationFilter = () => {
    const dispatch = useAppDispatch();
    const value = useSelector(selectFilterBinLocation);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setBinLocationFilter(ev.target.value));
    }

    return (
        <div className="input-group input-group-sm">
            <span className="input-group-text">Bin</span>
            <input type="search" className="form-control form-control-sm" value={value} onChange={changeHandler}/>
        </div>
    )
}

export default BinLocationFilter;
