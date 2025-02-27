import {ReactNode} from "react";
import {useAppDispatch} from "@/app/configureStore";
import {setItemEditing, updateItem} from "./index";
import {parseBinLocations, SwipeableBinLocation} from "./utils";
import {useSwipeable} from "react-swipeable";
import {EditableBinLocation} from "@/types/bin-location";

export interface SwipeContainerProps {
    item: EditableBinLocation;
    allowClick?: boolean;
    allowTap?: boolean;
    children: ReactNode;
}

const SwipeContainer = ({item, allowClick, allowTap, children}: SwipeContainerProps) => {
    const dispatch = useAppDispatch();
    const locations = parseBinLocations(item.newBinLocation ?? item.BinLocation);

    const onSwipedLeft = () => {
        const [_bin, ...rest] = locations;
        const bin = SwipeableBinLocation.parse(_bin ?? '');
        if (bin) {
            bin.onSwipeLeft();
            const location = [bin.toString(), ...rest].join(' ');
            dispatch(updateItem({...item, newBinLocation: location, editing: false}));
        }
    }

    const onSwipedRight = () => {
        const [_bin, ...rest] = locations;
        const bin = SwipeableBinLocation.parse(_bin ?? '');
        if (bin) {
            bin.onSwipeRight();
            const location = [bin.toString(), ...rest].join(' ');
            dispatch(updateItem({...item, newBinLocation: location, editing: false}));
        }
    }

    const onTap = allowTap ? () => dispatch(setItemEditing({...item, editing: true})) : undefined;
    const onClick = allowClick ? () => dispatch(setItemEditing({...item, editing: true})) : undefined;

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
