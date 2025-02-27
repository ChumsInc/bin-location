import React from 'react';
import {useSelector} from 'react-redux';
import BinLocationField from "./BinLocationField";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {
    selectFilteredItems,
    selectPage,
    selectRowsPerPage,
    selectSort,
    setPage,
    setRowsPerPage,
    setSort
} from "./index";
import ItemToggle from "./ItemToggle";
import BinLocationFindReplace from "./BinLocationFindReplace";
import SwipeContainer from "./SwipeContainer";
import SelectAll from "./SelectAll";
import ActionLabel from "./ActionLabel";
import {SortableTable, SortableTableField, SortProps, TablePagination} from "@chumsinc/sortable-tables";
import {EditableBinLocation} from "@/types/bin-location";
import {itemKey} from "@/utils/bin-location";
import SaveItemButton from "@/ducks/items/SaveItemButton";

const reBinLocation = /((\d{1,2})([AB])(\d{1,2}))/;

export const itemListFields: SortableTableField<EditableBinLocation>[] = [
    {
        field: 'WarehouseCode',
        title: <SelectAll />,
        sortable: false,

        render: (row: EditableBinLocation) => <ItemToggle item={row}/>,
    },
    {
        field: 'WarehouseCode',
        title: 'Whse',
        sortable: true,
        render: (row) => <SwipeContainer item={row}>{row.WarehouseCode}</SwipeContainer>
    },
    {
        field: 'ItemCode',
        title: 'Item',
        sortable: true,
        render: (row) => <SwipeContainer item={row}>{row.ItemCode}</SwipeContainer>
    },
    {
        field: 'ItemCodeDesc',
        title: 'Description',
        sortable: true,
        className: 'item-description',
        render: (row) => <SwipeContainer item={row}>{row.ItemCodeDesc || ''}</SwipeContainer>
    },
    {
        field: 'SalesUnitOfMeasure',
        title: 'U/M',
        sortable: true,
        className: 'item-description',
        render: (row) => <SwipeContainer item={row}>{row.SalesUnitOfMeasure || ''}</SwipeContainer>
    },
    {
        field: 'BinLocation',
        title: 'Bin',
        sortable: true,
        render: (row) => row.editing
            ? <BinLocationField item={row}/>
            : (
                <SwipeContainer item={row} allowTap={!row.editing} allowClick={!row.editing}><BinLocationField
                    item={row}/></SwipeContainer>
            )
    },
    {field: 'changed',
        title: <ActionLabel/>,
        sortable: true,
        render: (row) => (<SaveItemButton item={row}/>)
    }
];

const ItemList = () => {
    const dispatch = useAppDispatch();
    const rows = useSelector(selectFilteredItems);
    const page = useAppSelector(selectPage);
    const rowsPerPage = useAppSelector(selectRowsPerPage);
    const sort = useAppSelector(selectSort);


    const pageChangeHandler = (page: number) => {
        dispatch(setPage(page));
    }
    const rowsPerPageChangeHandler = (rpp: number) => {
        dispatch(setRowsPerPage(rpp));
    }


    const sortChangeHandler = (sort: SortProps<EditableBinLocation>) => {
        dispatch(setSort(sort));
    }

    return (
        <div className="mt-3">
            <SortableTable currentSort={sort} onChangeSort={sortChangeHandler}
                           fields={itemListFields}
                           data={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                           keyField={(row) => itemKey(row)}/>
            <TablePagination page={page} onChangePage={pageChangeHandler} size="sm"
                             rowsPerPage={rowsPerPage} rowsPerPageProps={{onChange: rowsPerPageChangeHandler}}
                             count={rows.length} showFirst showLast/>
        </div>
    )
}

export default ItemList;
