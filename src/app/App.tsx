import React from 'react';
import FilterForm from "../ducks/items/FilterForm";
import ItemList from "../ducks/items/ItemList";
import AppAlertsList from "@/app/AppAlertsList";
import AppStatus from "@/ducks/items/AppStatus";
import BinLocationActions from "@/ducks/items/BinLocationActions";

const App = () => {
    return (
        <div className="container-lg">
            <AppAlertsList />
            <FilterForm />
            <AppStatus />
            <BinLocationActions />
            <ItemList />
        </div>
    )
}

export default App;
