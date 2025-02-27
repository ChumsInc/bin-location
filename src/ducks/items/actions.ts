import {createAsyncThunk} from "@reduxjs/toolkit";
import {BinLocation} from "chums-types";
import {FetchBinLocationArg, fetchItem, fetchItems, postBinLocation} from "@/api/items";
import {RootState} from "@/app/configureStore";
import {selectFilterBinLocation, selectFilterItem, selectFilterWarehouse, selectItemsStatus} from "@/ducks/items/index";
import {selectStatusById} from "@/ducks/item-status";
import {itemKey, loadItemKey} from "@/utils/bin-location";
import {EditableBinLocation} from "@/types/bin-location";

export const loadItems = createAsyncThunk<BinLocation[], void, { state: RootState }>(
    'items/load',
    async (arg, {getState}) => {
        const state = getState();
        const warehouseCode = selectFilterWarehouse(state);
        const itemCode = selectFilterItem(state);
        const binLocation = selectFilterBinLocation(state);
        return fetchItems({warehouseCode, itemCode, binLocation});
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectItemsStatus(state) === 'idle';
        }
    }
)

export const loadItem = createAsyncThunk<BinLocation | null, FetchBinLocationArg, { state: RootState }>(
    'items/loadItem',
    async (arg) => {
        return await fetchItem(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectItemsStatus(state) === 'idle' && selectStatusById(state, loadItemKey(arg)) === 'idle';
        }
    }
)

export const saveBinLocation = createAsyncThunk<BinLocation | null, EditableBinLocation, { state: RootState }>(
    'items/save',
    async (arg) => {
        return await postBinLocation({...arg, BinLocation: arg.newBinLocation!});
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return arg.newBinLocation !== undefined
                && selectItemsStatus(state) === 'idle'
                && selectStatusById(state, itemKey(arg)) === 'idle';
        }
    }
)
