import './App.css';
import movieList from "./movie-list.json"
import { Card, CardBody, Col, Input, Row, Tooltip } from 'reactstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import SearchComponent from './SearchComponent';
import MovieList from './MovieList';

function App() {

  const [countryDropdown, setCountryDropdown] = useState([])
  const [languageDropdown, setLanguageDropdown] = useState([])
  const [genresDropdown, setGenresDropdown] = useState([])

  const [countryData, setCountryData] = useState([])
  const [languageData, setLanguageData] = useState([])
  const [genresData, setGenresData] = useState([])
  const [search, setSearch] = useState("")
  const [movieData, setMovieData] = useState(JSON.parse(JSON.stringify(movieList)))

  const extractAttribute = (attributeKey) => {
    const allItems = movieList.flatMap(item => item[attributeKey]).filter(Boolean);
    const uniqueItems = [...new Set(allItems)].sort();
    return uniqueItems.map(item => ({ value: item, label: item }));
  }

  const initializeDropdowns = () => {
    setCountryDropdown(extractAttribute('moviecountries'));
    setLanguageDropdown(extractAttribute('movielanguages'));
    setGenresDropdown(extractAttribute('moviegenres'));
  }

  useEffect(() => {
    initializeDropdowns();
  }, []);


  useEffect(() => {
    const countrySearchString = countryData.map(item => item.value.toLowerCase()).join(" ");
    const languageSearchString = languageData.map(item => item.value.toLowerCase()).join(" ");
    const genresSearchString = genresData.map(item => item.value.toLowerCase()).join(" ");
    const lowerCaseSearch = search.toLowerCase();

    const filteredMovies = movieList.filter(item => {
      // Check for matches against country, language, and genres data
      const countryMatch = countryData.length === 0 || item.moviecountries.join(" ").toLowerCase().includes(countrySearchString);
      const languageMatch = languageData.length === 0 || item.movielanguages.join(" ").toLowerCase().includes(languageSearchString);
      const genresMatch = genresData.length === 0 || item.moviegenres.join(" ").toLowerCase().includes(genresSearchString);

      // Check for matches against search criteria
      const searchMatch = !search || item.movietitle.toLowerCase().includes(lowerCaseSearch) ||
        item.moviecountries.join(" ").toLowerCase().includes(lowerCaseSearch) ||
        item.movielanguages.join(" ").toLowerCase().includes(lowerCaseSearch) ||
        item.moviegenres.join(" ").toLowerCase().includes(lowerCaseSearch) ||
        item.imdbmovieid.toLowerCase().includes(lowerCaseSearch);

      return (countryMatch && languageMatch && genresMatch) && searchMatch;
    });

    setMovieData(filteredMovies);
  }, [countryData, languageData, genresData, search, movieList]);

  return (<>
    <div style={{ margin: "30px" }}>

      <Card style={{ marginBottom: "20px" }}>
        <CardBody>
          <Row form>
            <SearchComponent
              label="Universal Search"
              id="search-input"
              component={
                <Input
                  type="text"
                  placeholder="Universal Search"
                  value={search}
                  id="search-input"
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
            />

            <SearchComponent
              label="Country"
              id="country-select"
              component={
                <Select
                  options={countryDropdown}
                  onChange={(e) => setCountryData(e || [])}
                  value={countryData}
                  isMulti
                  isSearchable
                  isClearable
                  classNamePrefix="select"
                />
              }
            />

            <SearchComponent
              label="Language"
              id="language-select"
              component={
                <Select
                  options={languageDropdown}
                  onChange={(e) => setLanguageData(e || [])}
                  value={languageData}
                  isMulti
                  isSearchable
                  isClearable
                  classNamePrefix="select"
                />
              }
            />

            <SearchComponent
              label="Genres"
              id="genres-select"
              component={
                <Select
                  options={genresDropdown}
                  onChange={(e) => setGenresData(e || [])}
                  value={genresData}
                  isMulti
                  isSearchable
                  isClearable
                  classNamePrefix="select"
                />
              }
            />
          </Row>
        </CardBody>
      </Card>

      <MovieList
        movieData={movieData}
      />
    </div>
  </>);
}

export default App;
