import {BinLocation, Editable} from "chums-types";

export interface EditableBinLocation extends BinLocation, Editable {
    newBinLocation?: string;
    selected?: boolean;
    editing?: boolean;
}

export type ItemActionStatus = 'idle'|'loading'|'saving'|'rejected';

export interface ItemStatus {
    key: string;
    status: ItemActionStatus;
}

export interface SetSelectedBinLocationArg extends Pick<EditableBinLocation, 'WarehouseCode'|'ItemCode'> {
    selected: boolean;
}

export interface UpdateBinLocationArg extends Pick<EditableBinLocation, 'WarehouseCode'|'ItemCode'> {
    newBinLocation: string;
    editing: boolean;
}
