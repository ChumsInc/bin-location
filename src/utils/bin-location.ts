import {BinLocation} from "chums-types";
import {FetchBinLocationArg} from "@/src/api/items";


export const itemKey = (arg: Pick<BinLocation, 'WarehouseCode' | 'ItemCode'>) => {
    return `${arg.WarehouseCode}/${arg.ItemCode}`;
}

export const loadItemKey = (arg: FetchBinLocationArg) => itemKey({WarehouseCode: arg.warehouseCode, ItemCode: arg.itemCode});
