import React from 'react';
import {useSelector} from 'react-redux';
import BinLocationField from "./BinLocationField";
import {EditableBinLocation, SortableBinLocationField} from "../../types";
import {useAppDispatch} from "../../app/configureStore";
import {itemListTableKey, selectFilteredDataLength, selectPagedItemList} from "./index";
import {ConnectedPager, ConnectedTable, setPageAction, SorterProps} from "chums-connected-components";
import ItemToggle from "./ItemToggle";
import BinLocationFindReplace from "./BinLocationFindReplace";
import SwipeContainer from "./SwipeContainer";
import ActionField from "./ActionField";
import SelectAll from "./SelectAll";
import ActionLabel from "./ActionLabel";

const reBinLocation = /((\d{1,2})([AB])(\d{1,2}))/;

export const itemListFields: SortableBinLocationField[] = [
    {
        field: 'selected',
        title: <SelectAll />,
        sortable: false,
        render: (row: EditableBinLocation) => <ItemToggle itemKey={row.key}/>
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
    {field: 'changed', title: <ActionLabel />, sortable: true, render: (row) => (<ActionField item={row}/>)}
];

const defaultSort: SorterProps = {
    field: 'key',
    ascending: true,
}

const ItemList = () => {
    const dispatch = useAppDispatch();
    const rows = useSelector(selectPagedItemList);
    const filteredLength = useSelector(selectFilteredDataLength);


    const sortChangeHandler = () => {
        dispatch(setPageAction({key: itemListTableKey, page: 1}));
    }

    return (
        <div className="mt-3">
            <BinLocationFindReplace/>
            <ConnectedTable tableKey={itemListTableKey} defaultSort={defaultSort}
                            fields={itemListFields} data={rows} keyField={'key'}
                            onChangeSort={sortChangeHandler} className="table-sticky"/>
            <ConnectedPager pageSetKey={itemListTableKey} dataLength={filteredLength} defaultRowsPerPage={10}/>
        </div>
    )
}

export default ItemList;
