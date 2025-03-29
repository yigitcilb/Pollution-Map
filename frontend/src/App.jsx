import MapView from './mapView.jsx';
import InputData from './inputData.jsx';
import "./styles/appStyles.css"
import { PollutionDataProvider } from './pollContext.jsx';


function App() {

  return (
    <div className="container">
      <h1 style={{color: "white"}}>Pollution Map</h1>
      <div className="map-input-wrapper">
      <PollutionDataProvider>
          <MapView />
          <InputData />
        </PollutionDataProvider>
      </div>
    </div>
  )
}

export default App
