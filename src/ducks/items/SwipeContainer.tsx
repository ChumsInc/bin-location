import {ReactNode} from "react";
import {useAppDispatch} from "../../app/configureStore";
import {setItemEditing, updateItemAction} from "./index";
import {binLocations, SwipeableBinLocation} from "./utils";
import {useSwipeable} from "react-swipeable";
import {EditableBinLocation} from "../../types";

export interface SwipeContainerProps {
    item: EditableBinLocation;
    allowClick?: boolean;
    allowTap?: boolean;
    children: ReactNode;
}

const SwipeContainer = ({item, allowClick, allowTap, children}: SwipeContainerProps) => {
    const dispatch = useAppDispatch();
    const locations = binLocations(item.BinLocation) || [];

    const onSwipedLeft = () => {
        const [_bin, ...rest] = locations;
        const bin = SwipeableBinLocation.parse(_bin || '');
        if (bin) {
            bin.onSwipeLeft();
            const location = [bin.toString(), ...rest].join(' ');
            dispatch(updateItemAction(item.key, location))
        }
    }

    const onSwipedRight = () => {
        const [_bin, ...rest] = locations;
        const bin = SwipeableBinLocation.parse(_bin || '');
        if (bin) {
            bin.onSwipeRight();
            const location = [bin.toString(), ...rest].join(' ');
            dispatch(updateItemAction(item.key, location))
        }
    }

    const onTap = allowTap ? () => dispatch(setItemEditing(item.key)) : undefined;
    const onClick = allowClick ? () => dispatch(setItemEditing(item.key)) : undefined;

    const swipeHandlers = useSwipeable({
        onSwipedLeft,
        onSwipedRight,
        onTap
    });

    return (
        <div {...swipeHandlers} onClick={onClick}>
            {children}
        </div>
    )
}

export default SwipeContainer;
