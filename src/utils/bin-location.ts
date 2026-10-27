import type {BinLocation} from "chums-types";
import type {FetchBinLocationArg} from "@/api/items";


export const itemKey = (arg: Pick<BinLocation, 'WarehouseCode' | 'ItemCode'>) => {
    return `${arg.WarehouseCode}/${arg.ItemCode}`;
}

export const loadItemKey = (arg: FetchBinLocationArg) => itemKey({WarehouseCode: arg.warehouseCode, ItemCode: arg.itemCode});
