import {fetchJSON} from "@chumsinc/ui-utils";
import {Warehouse} from "chums-types";

export const fetchWarehouseList = async ():Promise<Warehouse[]> => {
    try {
        const url = '/api/search/whse/chums';
        const res = await fetchJSON<{result: Warehouse[]}>(url);
        return res?.result ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.log("fetchWarehouseList()", err.message);
            return Promise.reject(err);
        }
        console.log("fetchWarehouseList()", err);
        return Promise.reject(new Error('Error in fetchWarehouseList()'));
    }
}
