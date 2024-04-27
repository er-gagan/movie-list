import React from 'react'
import MovieCard from './MovieCard'
import { Card, CardBody, Row, Col, Tooltip } from 'reactstrap';
const MovieList = ({ movieData }) => (
    <Row>
        {movieData.map((item, index) => (
            <MovieCard
                key={index}
                item={item}
                index={index}
            />
        ))}
    </Row>
);

export default MovieList
