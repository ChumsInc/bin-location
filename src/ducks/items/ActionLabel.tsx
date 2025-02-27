import {useSelector} from "react-redux";
import {selectChangedItemCount} from "./index";

const ActionLabel = () => {
    const changed = useSelector(selectChangedItemCount);
    return (
        <span>
            Action
            {changed > 0 && (<span className="ms-1">({changed})</span>)}
        </span>
    )
}

export default ActionLabel;
