import {createAction, createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/app/configureStore";
import {itemKey} from "@/api/items";
import {binLocationSorter} from "./utils";
import {loadItem, loadItems, saveBinLocation} from "@/ducks/items/actions";
import {EditableBinLocation, SetSelectedBinLocationArg} from "@/types/bin-location";
import {SortProps} from "@chumsinc/sortable-tables";
import {dismissAlert} from "@chumsinc/alert-list";


const itemsAdapter = createEntityAdapter<EditableBinLocation, string>({
    selectId: (arg) => itemKey(arg),
    sortComparer: (a, b) => itemKey(a).localeCompare(itemKey(b)),
})

const itemSelectors = itemsAdapter.getSelectors<RootState>(
    (state) => state.items
)


export interface ItemFilter {
    warehouseCode: string;
    itemCode: string;
    binLocation: string;
}

interface ExtraItemState {
    status: 'idle' | 'loading' | 'saving' | 'rejected';
    sort: SortProps<EditableBinLocation>;
    page: number;
    rowsPerPage: number;
    search: string;
    filter: ItemFilter
}

const extraState: ExtraItemState = {
    status: 'idle',
    sort: {field: 'WarehouseCode', ascending: true},
    search: '',
    page: 0,
    rowsPerPage: 10,
    filter: {
        warehouseCode: '',
        itemCode: '',
        binLocation: '',
    }
}

const itemsSlice = createSlice({
    name: 'items',
    initialState: itemsAdapter.getInitialState(extraState),
    reducers: {
        setWarehouseFilter: (state, action: PayloadAction<string>) => {
            state.filter.warehouseCode = action.payload;
        },
        setItemFilter: (state, action: PayloadAction<string>) => {
            state.filter.itemCode = action.payload;
        },
        setBinLocationFilter: (state, action: PayloadAction<string>) => {
            state.filter.binLocation = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
            state.page = 0;
        },
        setSort: (state, action: PayloadAction<SortProps<EditableBinLocation>>) => {
            state.sort = action.payload;
            state.page = 0;
        },
        toggleSelected: (state, action: PayloadAction<SetSelectedBinLocationArg>) => {
            itemsAdapter.updateOne(state, {id: itemKey(action.payload), changes: {selected: action.payload.selected}})
        },
        toggleManySelected: (state, action: PayloadAction<SetSelectedBinLocationArg[]>) => {
            const changes = action.payload.map(bl => ({id: itemKey(bl), changes: {selected: bl.selected}}));
            itemsAdapter.updateMany(state, changes);
        },
        updateItem: (state, action: PayloadAction<EditableBinLocation>) => {
            itemsAdapter.updateOne(state, {
                id: itemKey(action.payload),
                changes: {
                    newBinLocation: action.payload.newBinLocation,
                    editing: action.payload.editing ?? (action.payload.newBinLocation !== action.payload.BinLocation)
                }
            });
        },
        setItemEditing: (state, action: PayloadAction<EditableBinLocation>) => {
            itemsAdapter.updateOne(state, {
                id: itemKey(action.payload),
                changes: {
                    editing: action.payload.editing ?? true
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadItems.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loadItems.fulfilled, (state, action) => {
                state.status = 'idle';
                itemsAdapter.setAll(state, action.payload)
                state.page = 0;
            })
            .addCase(loadItems.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(saveBinLocation.fulfilled, (state, action) => {
                if (action.payload) {
                    itemsAdapter.setOne(state, action.payload);
                }
            })
            .addCase(loadItem.fulfilled, (state, action) => {
                if (action.payload) {
                    itemsAdapter.setOne(state, action.payload);
                }
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context === loadItems.typePrefix) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectItemsStatus: (state) => state.status,
        selectFilterItem: (state) => state.filter.itemCode,
        selectFilterWarehouse: (state) => state.filter.warehouseCode,
        selectFilterBinLocation: (state) => state.filter.binLocation,
        selectSearch: (state) => state.search,
        selectPage: (state) => state.page,
        selectRowsPerPage: (state) => state.rowsPerPage,
        selectSort: (state) => state.sort,
    }
})

export const {
    selectItemsStatus,
    selectFilterItem,
    selectFilterWarehouse,
    selectFilterBinLocation,
    selectPage,
    selectRowsPerPage,
    selectSort,
    selectSearch,
} = itemsSlice.selectors;
export const {
    setItemFilter,
    setWarehouseFilter,
    setBinLocationFilter,
    setSearch,
    toggleSelected,
    toggleManySelected,
    setPage,
    setRowsPerPage,
    setSort,
    updateItem,
    setItemEditing,
} = itemsSlice.actions;

export default itemsSlice;


export const setExecFindReplaceAction = createAction('items/execFindReplace');


export const selectChangedItemCount = createSelector(
    [itemSelectors.selectAll],
    (list) => {
        return list.filter(item => item.BinLocation !== (item.newBinLocation ?? item.BinLocation))
            .length;
    });

export const selectFilteredItems = createSelector(
    [itemSelectors.selectAll, selectSearch, selectSort],
    (items, search, sort) => {
        return items
            .filter(item => !search || item.ItemCode.toLowerCase().includes(search.toLowerCase())
                || (item.ItemCodeDesc ?? '').toLowerCase().includes(search.toLowerCase())
                || (item.BinLocation ?? '').toLowerCase().includes(search.toLowerCase())
            )
            .sort(binLocationSorter(sort));
    }
)

export const selectToggledItems = createSelector(
    [itemSelectors.selectAll],
    (list) => {
        return list.filter(item => item.selected);
    }
)
