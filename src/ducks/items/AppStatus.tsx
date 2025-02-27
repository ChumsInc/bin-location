import React from 'react';
import {useAppSelector} from "@/app/configureStore";
import {selectItemsStatus} from "@/ducks/items/index";
import {ProgressBar} from "react-bootstrap";

export default function AppStatus() {
    const loading = useAppSelector(selectItemsStatus);

    if (loading === 'idle') {
        return null;
    }

    return (
        <ProgressBar now={100} animated striped className="mt-1" />
    )

}
