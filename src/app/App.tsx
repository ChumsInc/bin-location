import React from 'react';
import {AlertList} from "chums-connected-components";
import FilterForm from "../ducks/items/FilterForm";
import ItemList from "../ducks/items/ItemList";

const App = () => {
    return (
        <div className="container-lg">
            <AlertList />
            <FilterForm />
            <ItemList />
        </div>
    )
}

export default App;
