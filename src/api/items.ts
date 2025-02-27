import {fetchJSON} from "@chumsinc/ui-utils";
import {BinLocation} from "chums-types";

export const itemKey = (item: Pick<BinLocation, 'WarehouseCode'|'ItemCode'>) => `${item.WarehouseCode}/${item.ItemCode}`.toUpperCase();

interface BinLocationItemResponse {
    warehouseCode: string;
    itemCode: string;
    item:BinLocation|null;
}

export interface FetchBinLocationArg {
    warehouseCode: string;
    itemCode: string;
}
export async function fetchItem(arg:FetchBinLocationArg): Promise<BinLocation|null> {
    try {
        const url = `/api/operations/shipping/bin-location/:warehouseCode/:itemCode.json`
            .replace(':warehouseCode', encodeURIComponent(arg.warehouseCode))
            .replace(':itemCode', encodeURIComponent(arg.itemCode));
        const res = await fetchJSON<BinLocationItemResponse>(url, {cache: 'no-cache'});
        return res?.item ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchItem()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchItem()", err);
        return Promise.reject(new Error('Error in fetchItem()'));
    }
}

export interface FetchBinLocationItemsArg {
    warehouseCode?: string;
    itemCode?: string;
    binLocation?: string;
}
export async function fetchItems(arg:FetchBinLocationItemsArg): Promise<BinLocation[]> {
    try {
        const params = new URLSearchParams();
        if (arg.warehouseCode) {
            params.set('warehouseCode', arg.warehouseCode);
        }
        if (arg.itemCode) {
            params.set('itemCode', arg.itemCode);
        }
        if (arg.binLocation) {
            params.set('binLocation', arg.binLocation);
        }
        const url = `/api/operations/shipping/bin-location/list.json?${params.toString()}`;
        const res = await fetchJSON<BinLocation[]>(url, {cache: 'no-cache'});
        return res ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log("fetchItems()", err.message);
            return Promise.reject(err);
        }
        console.log("fetchItems()", err);
        return Promise.reject(new Error('Error in fetchItems()'));
    }
}


export const postBinLocation = async (arg: BinLocation): Promise<BinLocation|null> => {
    try {
        const url = `/api/operations/shipping/bin-location/:warehouseCode/:itemCode.json`
            .replace(':warehouseCode', encodeURIComponent(arg.WarehouseCode))
            .replace(':itemCode', encodeURIComponent(arg.ItemCode))

        const res = await fetchJSON<BinLocationItemResponse>(url, {
            method: 'put',
            body: JSON.stringify(arg)
        });
        return res?.item ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("postBinLocation()", err.message);
            return Promise.reject(err);
        }
        console.warn("postBinLocation()", err);
        return Promise.reject(new Error('Error in postBinLocation()'));
    }
}
