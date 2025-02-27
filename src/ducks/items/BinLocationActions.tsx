import React from 'react';
import {Col, Row} from "react-bootstrap";
import ItemSearch from "@/ducks/items/ItemSearch";
import BinLocationFindReplace from "@/ducks/items/BinLocationFindReplace";

export default function BinLocationActions() {
    return (
        <Row className="g-3 justify-content-between mt-1">
            <Col xs={12} lg={3}>
                <ItemSearch/>
            </Col>
            <Col xs={12} lg="auto">
                <BinLocationFindReplace/>
            </Col>
        </Row>
    )
}
