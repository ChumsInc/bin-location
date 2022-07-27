import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {Warehouse} from "chums-types";
import {fetchWarehouseList} from "../../api/warehouse";
import {RootState} from "../../app/configureStore";

export const loadWarehouseList = 'warehouse/list/load';
export const loadWarehouseListAction = createAsyncThunk<{ list: Warehouse[], clearContext?: string }>(
    loadWarehouseList,
    async (asd, thunkAPI) => {
        const list = await fetchWarehouseList();
        return {list, clearContext: loadWarehouseList};
    }
);

export const selectWarehouseList = (state: RootState): Warehouse[] => state.warehouse.list;
export const selectWarehousesLoading = (state: RootState): boolean => state.warehouse.loading;
export const selectWarehousesLoaded = (state: RootState): boolean => state.warehouse.loaded;


export interface FiltersState {
    list: Warehouse[],
    loading: boolean,
    loaded: boolean,
}

export const defaultFiltersState: FiltersState = {
    list: [],
    loading: false,
    loaded: false,
}
const filtersReducer = createReducer(defaultFiltersState, (builder) => {
    builder
        .addCase(loadWarehouseListAction.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loadWarehouseListAction.fulfilled, (state, action) => {
            state.list = action.payload.list || [];
            state.loading = false;
            state.loaded = true;
        })
        .addCase(loadWarehouseListAction.rejected, (state, action) => {
            state.loading = false;
        });
})

export default filtersReducer;
