import { useEffect, useState } from 'react';
import axios from 'axios';
import InfoBox from './InfoBox';
import Table from './Table';
import Map from './Map';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css'
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapPosition, setMapPosition] = useState({ lat: 30, lng: 70 })
  const [mapZoom, setMapZoom] = useState(3)

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    const url = countryCode === 'Worldwide'
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    const { data } = await axios.get(url)
    setCountryInfo(data)
    setMapPosition({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
    setMapZoom(4);
  }

  const sortData = (data) => {
    const sortedData = [...data]
    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1)
  }

  useEffect(() => {
    const overAllRecord = async () => {
      const { data } = await axios.get("https://disease.sh/v3/covid-19/all")
      setCountryInfo(data)
    }

    overAllRecord()
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      const { data } = await axios.get("https://disease.sh/v3/covid-19/countries")
      const countries = data.map(country => (
        {
          name: country.country,
          value: country.countryInfo.iso2
        }))

      const sortedData = sortData(data)
      setTableData(sortedData)
      setCountries(countries)
    }

    getCountriesData()
  }, [])

  return (
    <div className="App">
      <div className="app-left">
        <div className="app-header">
          <h1>COVID-19 TRACKER netlifyyy</h1>
          <Form.Select onChange={onCountryChange}>
            <option value="Worldwide">Worldwide</option>
            {countries.map(country => (
              <option key={country.name} value={country.value}>{country.name}</option>
            ))}
          </Form.Select>
        </div>

        <div className="app-stats">
          <InfoBox
            title='Coronavirus Cases'
            cases={countryInfo.todayCases}
            total={countryInfo.cases}>
          </InfoBox>

          <InfoBox
            title='Recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}>
          </InfoBox>

          <InfoBox
            title='Deaths'
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}>
          </InfoBox>
        </div>

        <Map
          position={mapPosition}
          zoom={mapZoom}
        />
      </div>

      <Card className="app-right">
        <Card.Title>
          <h3>Live Cases by Country</h3>
        </Card.Title>
        <Table countries={tableData} />
      </Card>
    </div>
  );
}

export default App;
