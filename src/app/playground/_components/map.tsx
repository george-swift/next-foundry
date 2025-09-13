'use client'

import L from 'leaflet'
import {
  MapContainer as LeafletMapContainer,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

export default function MapContainer({
  lat,
  lng
}: {
  lat: number
  lng: number
}) {
  return (
    <LeafletMapContainer
      center={[lat, lng]}
      zoom={10}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <div className="text-center">
            <p className="text-sm font-medium">Right here! 📍</p>
          </div>
        </Popup>
      </Marker>
    </LeafletMapContainer>
  )
}
