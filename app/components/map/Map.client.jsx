import classNames from "classnames";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import CurrentLocation from "~/Icons/CurrentLocation";

const DEFAULT_MAP_TILE_STYLE = "light-v11"

export const Map = ({ height, position }) => {

  const [mapStyle, setMapStyle] = useState(DEFAULT_MAP_TILE_STYLE);

  const handleMapStyleToggle = () => {
    if (mapStyle === DEFAULT_MAP_TILE_STYLE) return setMapStyle("satellite-streets-v12");

    return setMapStyle(DEFAULT_MAP_TILE_STYLE);
  };

  return (
    <div style={{ height }} className="map">
      <section className="map__actions">
        <button
          className={classNames("button map__actions-button", {
            "map__actions-button--active": mapStyle !== DEFAULT_MAP_TILE_STYLE,
          })}
          onClick={handleMapStyleToggle}
        >
          <CurrentLocation width={20} height={20} />
        </button>
      </section>
      <MapContainer
        style={{
          height: "100%",
        }}
        center={position}
        zoom={16}
        scrollWheelZoom={false} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJ0eW9tMmVmdyIsImEiOiJjanp2a215OGcwNWs3M21wZ3hpN3Bib2tuIn0.RyuwYpuTcGI81rHCHYf7Qw`}
        />
        <Marker position={position}>
          <Popup>
            Goran Group
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
