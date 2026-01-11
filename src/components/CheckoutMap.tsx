"use client";

import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

/* ✅ Marker icon (client-only safe) */
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/10740/10740589.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -32],
});

type CheckoutMapProps = {
  position: [number, number];
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
};

/* ✅ Draggable marker */
function DraggableMarker({ position, setPosition }: CheckoutMapProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(position as LatLngExpression, 13, { animate: true });
  }, [position, map]);

  return (
    <Marker
      position={position as LatLngExpression}
      draggable
      icon={markerIcon}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target as L.Marker;
          const { lat, lng } = marker.getLatLng();
          setPosition([lat, lng]);
        },
      }}
    />
  );
}

/* ✅ Main Map component */
export default function CheckoutMap({
  position,
  setPosition,
}: CheckoutMapProps) {
  if (!position) return null;

  return (
    <MapContainer
      center={position as LatLngExpression}
      zoom={13}
      scrollWheelZoom
      className="w-full h-[300px] rounded-lg"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker position={position} setPosition={setPosition} />
    </MapContainer>
  );
}
