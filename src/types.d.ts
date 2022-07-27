import {BinLocation, Editable} from "chums-types";
import {SortableTableField, SortProps} from "chums-components";
import {ReactNode} from "react";

export interface EditableBinLocation extends BinLocation, Editable {
    key: string,
    newBinLocation?:string,
    selected?: boolean,
    saving?: boolean,
    editing?: boolean,
}

export interface BinLocationList {
    [key:string]: EditableBinLocation
}

export interface SortableBinLocationField extends SortableTableField {
    field: keyof EditableBinLocation,
    render?: (row:EditableBinLocation) => ReactNode|string|number,
}

export interface BinLocationSortProps extends SortProps {
    field: keyof EditableBinLocation
}

