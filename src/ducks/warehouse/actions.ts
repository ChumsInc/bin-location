import {createAsyncThunk} from "@reduxjs/toolkit";
import {Warehouse} from "chums-types";
import {RootState} from "@/app/configureStore";
import {fetchWarehouseList} from "@/api/warehouse";
import {selectWarehouseStatus} from "@/ducks/warehouse/index";

export const loadWarehouses = createAsyncThunk<Warehouse[], void, { state: RootState }>(
    'warehouse/load',
    async () => {
        return await fetchWarehouseList();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectWarehouseStatus(state) === 'idle';
        }
    }
)
