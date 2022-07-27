import {createAction, createAsyncThunk, createReducer, createSelector} from "@reduxjs/toolkit";
import {BinLocationList, BinLocationSortProps, EditableBinLocation} from "../../types";
import {RootState} from "../../app/configureStore";
import {fetchItems, postItem} from "../../api/items";
import {selectCurrentPage, selectRowsPerPage, selectTableSort} from "chums-connected-components";
import {binLocationSorter} from "./utils";
import {pageFilter} from "chums-components";


export const itemListTableKey = 'item-list';

export const loadItemList = 'items/list/load';
export const saveItem = 'items/list/saveItem';

export const setWarehouseFilterAction = createAction<string>('items/filters/setWarehouse');
export const setItemFilterAction = createAction<string>('items/filters/setItem');
export const setBinLocationFilter = createAction<string | undefined>('items/filters/setBinLocation');
export const setSearch = createAction<string|undefined>('items/setSearch');
export const setFindAction = createAction<string>('items/setFind');
export const setReplaceAction = createAction<string>('items/setReplace');
export const setExecFindReplaceAction = createAction('items/execFindReplace');
export const setItemAction = createAction<EditableBinLocation>('items/setItem');
export const undoItemChange = createAction<string>('items/undoEdit');
export const setItemEditing = createAction<string>('items/setEditing');
export const updateItemAction = createAction('items/updateItem', (key: string, bin: string) => {
    return {
        payload: {
            key,
            bin,
        }
    }
})
export const toggleItemSelectedAction = createAction('items/toggleItemSelected', (key: string, force?: boolean) => {
    return {
        payload: {
            key: key,
            force: force
        }
    }
});
export const loadItemsListAction = createAsyncThunk<{ list: BinLocationList, clearContext?: string }>(
    loadItemList,
    async (_asd, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const warehouseCode = selectCurrentWarehouse(state);
            const item = selectItemFilter(state);
            const binLocation = selectBinLocationFilter(state);
            const list = await fetchItems(warehouseCode, item, binLocation);
            return {list, clearContext: loadItemList};
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log("loadItemsListAction()", err.message);
                thunkAPI.rejectWithValue({error: err, context: loadItemList});
            }
            console.log("loadItemsListAction()", err);
            return {list: {}};
        }
    }
);

export const saveItemAction = createAsyncThunk<{ item: EditableBinLocation, clearContext?: string }, EditableBinLocation>(
    saveItem,
    async (_item: EditableBinLocation, thunkAPI) => {
        try {
            if (_item.newBinLocation === undefined) {
                return thunkAPI.rejectWithValue({error: new Error('new bin location is undefined'), context: saveItem});
            }
            const item = await postItem({..._item, BinLocation: _item.newBinLocation});
            return {item, clearContext: saveItem};
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log("saveItemAction()", err.message);
                return thunkAPI.rejectWithValue({error: err, context: saveItem});
            }
            console.log("saveItemAction()", err);
            return {item: _item};

        }
    }
)

export const selectItemList = (state: RootState) => state.items.list;
export const selectItemsLoading = (state: RootState) => state.items.loading;
export const selectItemListLength = (state: RootState) => Object.keys(state.items.list).length;
export const selectSelectedItemsLength = (state: RootState) => Object.values(state.items.list)
    .filter(item => item.selected).length;
export const selectCurrentWarehouse = (state: RootState): string => state.items.filters.warehouseCode;
export const selectItemFilter = (state: RootState): string => state.items.filters.item;
export const selectBinLocationFilter = (state: RootState): string => state.items.filters.binLocation;
export const selectItemSearch = (state: RootState) => state.items.search;
export const selectItemFind = (state: RootState) => state.items.find;
export const selectItemReplace = (state: RootState) => state.items.replace;
export const selectItemByKey = (key: string) => (state: RootState) => state.items.list[key];
export const selectChangedItems = createSelector([selectItemList], (list) => {
    return Object.values(list).filter(item => item.changed);
});

export const selectFilteredData = createSelector(
    [selectItemList, selectItemSearch],
    (items, search) => {
        let regex = /\\b/;
        try {
            const _itemFilter = search.replace(/^/, '\\b')
                .replace('%', '');
            regex = new RegExp(_itemFilter, 'i');
        } catch (err: unknown) {
        }
        return Object.values(items)
            .filter(item => !search || regex.test(item.ItemCode) || regex.test(item.ItemCodeDesc || '') || regex.test(item.BinLocation || ''));
    }
)

export const selectFilteredDataLength = createSelector([selectFilteredData], (data) => data.length);

export const selectPagedItemList = createSelector(
    [selectFilteredData, selectTableSort(itemListTableKey), selectCurrentPage(itemListTableKey), selectRowsPerPage(itemListTableKey)],
    (items, sort, page, rowsPerPage) => {
        return items
            .sort(binLocationSorter(sort as BinLocationSortProps))
            .filter(pageFilter(page, rowsPerPage));
    }
)

export interface ItemsState {
    list: BinLocationList,
    loading: boolean,
    loaded: boolean,
    search: string,
    find: string,
    replace: string,
    filters: {
        warehouseCode: string,
        item: string,
        binLocation: string,
    }
}

const defaultState: ItemsState = {
    list: {},
    loading: false,
    loaded: false,
    search: '',
    find: '',
    replace: '',
    filters: {
        warehouseCode: '000',
        item: '',
        binLocation: '',
    }
}

const reducer = createReducer(defaultState, (builder) => {
    builder
        .addCase(loadItemsListAction.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loadItemsListAction.rejected, (state) => {
            state.loading = false;
        })
        .addCase(loadItemsListAction.fulfilled, (state, action) => {
            state.loading = false;
            state.loaded = true;
            state.list = action.payload.list;
        })
        .addCase(toggleItemSelectedAction, (state, action) => {
            state.list[action.payload.key].selected = action.payload.force ?? !state.list[action.payload.key].selected;
        })
        .addCase(setItemEditing, (state, action) => {
            const key = action.payload;
            state.list[key].editing = true;
            state.list[key].newBinLocation = state.list[key].BinLocation;
        })
        .addCase(setItemAction, (state, action) => {
            const {key} = action.payload
            state.list[key] = {...action.payload, changed: false};
        })
        .addCase(updateItemAction, (state, action) => {
            state.list[action.payload.key].newBinLocation = action.payload.bin;
            state.list[action.payload.key].changed = true;
        })
        .addCase(undoItemChange, (state, action) => {
            const key = action.payload;
            state.list[key].newBinLocation = undefined;
            state.list[key].editing = false;
            state.list[key].changed = false;
        })
        .addCase(setSearch, (state, action) => {
            state.search = action.payload || '';
        })
        .addCase(setFindAction, (state, action) => {
            state.find = action.payload || '';
        })
        .addCase(setReplaceAction, (state, action) => {
            state.replace = action.payload || '';
        })
        .addCase(setExecFindReplaceAction, (state, action) => {
            const values = Object.values(state.list);
            values
                .filter(item => item.selected)
                .filter(item => item.BinLocation?.includes(state.find))
                .forEach(item => {
                    state.list[item.key].newBinLocation = item.BinLocation?.replace(state.find, state.replace) || '';
                    state.list[item.key].changed = true;
                    state.list[item.key].editing = true;
                });
            state.replace = '';
        })
        .addCase(saveItemAction.pending, (state, action) => {
            const {key} = action.meta.arg
            state.list[key].saving = true;
        })
        .addCase(saveItemAction.rejected, (state, action) => {
            const {key} = action.meta.arg
            state.list[key].saving = false;
        })
        .addCase(saveItemAction.fulfilled, (state, action) => {
            const {key} = action.payload.item;
            state.list[key] = action.payload.item;
        })
        .addCase(setWarehouseFilterAction, (state, action) => {
            state.filters.warehouseCode = action.payload || '';
        })
        .addCase(setItemFilterAction, (state, action) => {
            state.filters.item = action.payload || '';
        })
        .addCase(setBinLocationFilter, (state, action) => {
            state.filters.binLocation = action.payload || '';
        })

})


export default reducer;
