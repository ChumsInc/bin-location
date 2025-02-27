import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Warehouse} from "chums-types";
import {RootState} from "@/app/configureStore";
import {loadWarehouses} from "@/ducks/warehouse/actions";

const warehouseAdapter = createEntityAdapter<Warehouse, string>({
    selectId: (whse) => whse.WarehouseCode,
    sortComparer: (a, b) => a.WarehouseCode.localeCompare(b.WarehouseCode),
})

interface WarehouseExtraState {
    status: 'idle' | 'loading' | 'rejected';
    current: string | null;
}

const extraState: WarehouseExtraState = {
    status: 'idle',
    current: null
};

const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: warehouseAdapter.getInitialState(extraState),
    reducers: {
        setCurrentWarehouse: (state, action: PayloadAction<string | null>) => {
            state.current = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWarehouses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadWarehouses.fulfilled, (state, action) => {
                state.status = 'idle';
                warehouseAdapter.setAll(state, action.payload);
            })
            .addCase(loadWarehouses.rejected, (state) => {
                state.status = 'rejected';
            })
    },
    selectors: {
        selectWarehouseStatus: (state) => state.status,
        selectCurrentWarehouse: (state) => state.current,
    }
})
export const {selectWarehouseStatus, selectCurrentWarehouse} = warehouseSlice.selectors
const warehouseSelectors = warehouseAdapter.getSelectors<RootState>((state) => state.warehouse);

export const selectWarehouses = createSelector(
    [warehouseSelectors.selectAll],
    (list) => {
        return list
            .filter(warehouse => warehouse.WarehouseStatus === 'A')
            .sort((a, b) => a.WarehouseCode.localeCompare(b.WarehouseCode));
    })

export default warehouseSlice;
