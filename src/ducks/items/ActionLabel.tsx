import {useSelector} from "react-redux";
import {selectChangedItems} from "./index";

const ActionLabel = () => {
    const changed = useSelector(selectChangedItems);
    return (
        <span>
            Action
            {changed.length > 0 && (<span>({changed.length})</span>)}
        </span>
    )
}

export default ActionLabel;
