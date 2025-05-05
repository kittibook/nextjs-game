'use client'

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FeatureCollection } from 'geojson';

interface Props {
    geoData01: FeatureCollection;
    geoData02: FeatureCollection;
    geoData03: FeatureCollection;
    geoData04: FeatureCollection;
    geoData05: FeatureCollection;
    geoData06: FeatureCollection;
    geoData07: FeatureCollection;
    geoData08: FeatureCollection;
}

export default function Map({ geoData01, geoData02, geoData03, geoData04, geoData05, geoData06, geoData07, geoData08 }: Props) {
    const style = {
        color: 'red',        // Border color
        weight: 2,           // Border width
        opacity: 1,          // Border opacity
        fillColor: 'red',    // Fill color
        fillOpacity: 0.5,    // Fill opacity
    };
    
    const styleb = {
        color: 'blue',       // Border color
        weight: 2,           // Border width
        opacity: 1,          // Border opacity
        fillColor: 'blue',   // Fill color
        fillOpacity: 0.5,    // Fill opacity
    };

    const style03 = {
        color: '#6082d6',       // Border color
        weight: 2,           // Border width
        opacity: 1,          // Border opacity
        fillColor: '#6082d6',   // Fill color
        fillOpacity: 0.5,    // Fill opacity
    };

    return (
        <>
            <div className="flex justify-between items-center mb-10 ">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-700">ข้อมูลเชิงพื้นที่</h2>
                    <h3 className="text-sm text-slate-500">
                        วันที่ 1 ธันวาคม 2567 - 25 มกราคม 2568
                    </h3>
                </div>
            </div>
            <div className="flex justify-between items-center w-full ">
                <MapContainer center={[19.273902, 100.226944]} zoom={9} style={{ height: '600px', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />

                    <GeoJSON data={geoData01} style={style} />
                    <GeoJSON data={geoData02} style={styleb} />
                    <GeoJSON data={geoData03} style={style03} />
                    <GeoJSON data={geoData04} style={style03} />
                </MapContainer>
            </div>
        </>
    );
}
