import React from 'react'
import { Col } from 'reactstrap';

const SearchComponent = ({ label, component, id }) => (
    <Col md="3" className="mb-3">
        <label htmlFor={id}>{label}</label>
        {component}
    </Col>
);

export default SearchComponent
