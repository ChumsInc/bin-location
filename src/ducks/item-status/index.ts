import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {itemKey, loadItemKey} from "@/utils/bin-location";
import {ItemStatus} from "@/types/bin-location";
import {loadItem, loadItems, saveBinLocation} from "@/ducks/items/actions";
import {RootState} from "@/app/configureStore";

const itemStatusAdapter = createEntityAdapter<ItemStatus, string>({
    selectId: (arg) => arg.key,
    sortComparer: (a, b) => a.key.localeCompare(b.key),
})

const {selectById} = itemStatusAdapter.getSelectors();

export const selectStatusById = (state: RootState, key: string) => selectById(state.itemStatus, key)?.status ?? 'idle';


export const itemStatusSlice = createSlice({
    name: "itemStatus",
    initialState: itemStatusAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveBinLocation.pending, (state, action) => {
                itemStatusAdapter.upsertOne(state, {key: itemKey(action.meta.arg), status: 'saving'});
            })
            .addCase(saveBinLocation.fulfilled, (state, action) => {
                if (action.payload) {
                    itemStatusAdapter.upsertOne(state, {key: itemKey(action.payload), status: 'idle'});
                    return;
                }
                itemStatusAdapter.upsertOne(state, {key: itemKey(action.meta.arg), status: 'idle'});
            })
            .addCase(saveBinLocation.rejected, (state, action) => {
                itemStatusAdapter.upsertOne(state, {key: itemKey(action.meta.arg), status: 'idle'});
            })
            .addCase(loadItem.pending, (state, action) => {
                itemStatusAdapter.upsertOne(state, {key: loadItemKey(action.meta.arg), status: 'loading'});
            })
            .addCase(loadItem.fulfilled, (state, action) => {
                if (action.payload) {
                    itemStatusAdapter.upsertOne(state, {key: itemKey(action.payload), status: 'idle'});
                    return;
                }
                itemStatusAdapter.removeOne(state, loadItemKey(action.meta.arg));
            })
            .addCase(loadItem.rejected, (state, action) => {
                itemStatusAdapter.upsertOne(state, {key: loadItemKey(action.meta.arg), status: 'idle'});
            })
            .addCase(loadItems.pending, (state) => {
                itemStatusAdapter.removeAll(state);
            })
            .addCase(loadItems.fulfilled, (state, action) => {
                const status: ItemStatus[] = action.payload.map(bl => ({key: itemKey(bl), status: 'idle'}));
                itemStatusAdapter.upsertMany(state, status);
            })
    }
});

export default itemStatusSlice;
