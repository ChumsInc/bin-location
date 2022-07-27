import {BinLocationList, EditableBinLocation} from "../types";
import {fetchJSON} from "chums-components";
import {BinLocation} from "chums-types";

export const itemKey = (item: BinLocation) => `${item.WarehouseCode}/${item.ItemCode}`.toUpperCase();

export const fetchItems = async (whse: string, item: string, binLocation: string): Promise<BinLocationList> => {
    try {
        const params = new URLSearchParams();
        if (binLocation) {
            params.set("binLocation", binLocation);
        }
        const url = `/api/operations/shipping/bin-location/chums/:warehouseCode/:itemCode`
                .replace(':warehouseCode', encodeURIComponent(whse || '%'))
                .replace(':itemCode', encodeURIComponent(item))
            + (binLocation ? `?${params.toString()}` : '')
        const list = await fetchJSON<BinLocation[]>(url, {cache: 'no-cache'});
        const items: BinLocationList = {};
        list.forEach(item => {
            const key = itemKey(item);
            items[key] = {key, ...item};
        });
        return items;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log("fetchItems()", err.message);
            return Promise.reject(err);
        }
        console.log("fetchItems()", err);
        return Promise.reject(new Error('Error in fetchItems()'));
    }
}

export const fetchItem = async (id: string): Promise<EditableBinLocation> => {
    try {
        const [WarehouseCode, ItemCode] = id.split('/');
        const url = `/api/operations/shipping/bin-location/chums/:warehouseCode/:itemCode`
            .replace(':warehouseCode', encodeURIComponent(WarehouseCode))
            .replace(':itemCode', encodeURIComponent(ItemCode))
        const [item] = await fetchJSON<BinLocation[]>(url, {cache: 'no-cache'});
        return {key: itemKey(item), ...item};
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log("fetchItems()", err.message);
            return Promise.reject(err);
        }
        console.log("fetchItems()", err);
        return Promise.reject(new Error('Error in fetchItems()'));
    }
}

export const postItem = async (_item: BinLocation): Promise<EditableBinLocation> => {
    try {
        const url = `/api/operations/shipping/bin-location/chums/:warehouseCode/:itemCode`
            .replace(':warehouseCode', encodeURIComponent(_item.WarehouseCode))
            .replace(':itemCode', encodeURIComponent(_item.ItemCode))

        const [item] = await fetchJSON<BinLocation[]>(url, {
            method: 'put',
            body: JSON.stringify(_item)
        });
        return {key: itemKey(item), ...item};
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("postItem()", err.message);
            return Promise.reject(err);
        }
        console.warn("postItem()", err);
        return Promise.reject(new Error('Error in postItem()'));
    }
}
