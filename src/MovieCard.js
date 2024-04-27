import React, { useState } from 'react'
import { Card, CardBody, Row, Col, Tooltip } from 'reactstrap';
const handleTextTruncate = (text) => {
    return text.length > 30 ? text.substring(0, 30) + "..." : text
}

const MovieCard = ({ item, index }) => {
    const [languageTooltipIsOpen, setLanguageTooltipIsOpen] = useState(0)
    const [countriesTooltipIsOpen, setCountriesTooltipIsOpen] = useState(0)
    return (<>

        <Col md="6" lg="4" className="mb-4">
            <Card>
                <CardBody>
                    <Row noGutters>
                        <Col xs="5" style={{ padding: "10px" }}>
                            <img src={item.moviemainphotos[0]} alt={item.movietitle} className="img-fluid" />
                        </Col>
                        <Col xs="7">
                            <div className="movie-details">
                                <h5>{item.movietitle}</h5>
                                <p><strong>Genres:</strong> {item.moviegenres.join(", ")}</p>
                                <p id={'Tooltip-lang-' + index + 1} className="tooltip-target">
                                    <strong>Languages:</strong> {handleTextTruncate(item.movielanguages.join(", "))}
                                </p>
                                <Tooltip
                                    placement="bottom"
                                    isOpen={languageTooltipIsOpen === index + 1}
                                    target={'Tooltip-lang-' + index + 1}
                                    toggle={() => setLanguageTooltipIsOpen(languageTooltipIsOpen === index + 1 ? null : index + 1)}
                                >
                                    {item.movielanguages.join(", ")}
                                </Tooltip>

                                <p id={'Tooltip-country-' + index + 1} className="tooltip-target">
                                    <strong>Countries:</strong> {handleTextTruncate(item.moviecountries.join(", "))}
                                </p>
                                <Tooltip
                                    placement="bottom"
                                    isOpen={countriesTooltipIsOpen === index + 1}
                                    target={'Tooltip-country-' + index + 1}
                                    toggle={() => setCountriesTooltipIsOpen(countriesTooltipIsOpen === index + 1 ? null : index + 1)}
                                >
                                    {item.moviecountries.join(", ")}
                                </Tooltip>

                                <p><strong>IMDB:</strong> {item.imdbmovieid}</p>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    </>)
}

export default MovieCard
