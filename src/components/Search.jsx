import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";

const SEARCH_QUERY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      capital
      emoji
      code
      currency
    }
  }
`;

function Search() {
  const [countrySearch, setCountrySearch] = useState('');
  const [searchCountry, { data, loading, error }] = useLazyQuery(SEARCH_QUERY);
  return (
    <div className="search">
      <div className="inputs">
        <input
          type="text"
          placeholder="Type a code (Ex: BR)"
          onChange={(e) => {setCountrySearch(e.target.value)}}  
        />
        <button
          type="button"
          onClick={() => {searchCountry({
            variables: {
              code: countrySearch.toUpperCase() },
          });
        }}
        >
            Search country
        </button>
      </div>
      <div className="searchCountry">
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error.message}</h2>}
        {data && (
          <div className="countryDisplay">
            <h1>{data.country.name} {data.country.emoji}</h1>
            <h1>Capital: {data.country.capital}</h1>
            <h1>Currency: {data.country.currency}</h1>
            <h1>Code: {data.country.code}</h1>
          </div>
        )}
      </div>
      <div>
        <button className="return"><Link to="/" className="returnLink">Home</Link></button>
      </div>
    </div>
  )
}

export default Search;