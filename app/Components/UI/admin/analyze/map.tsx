'use client'

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry, MultiPolygon, Polygon } from 'geojson';
import thailand from '@/app/Assets/thailand.json'
import { useEffect, useRef, useState } from 'react';
import { getAuth } from '@/app/Services/api.service';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point as turfPoint } from '@turf/helpers';
import L from 'leaflet';

interface Props { 
    dataSetId: number | null 
}
interface LatLng { 
    lat: number; 
    lng: number 
}

export default function Map({ dataSetId }: Props) {
    const [position, setPosition] = useState<LatLng[]>([]);
    const geoRef = useRef<L.GeoJSON>(null);

    useEffect(() => {
        (async () => {
            const res = await getAuth('/admin/analyze/position/' + dataSetId);
            const newPosition: LatLng[] = (res?.position ?? []).map((v: any) => ({
                lat: Number(v?.latitude), lng: Number(v?.longitude)
            }));
            const cleaned = newPosition.filter(p =>
                Number.isFinite(p.lat) && Number.isFinite(p.lng) &&
                p.lat >= 5 && p.lat <= 21.5 && p.lng >= 97 && p.lng <= 106
            );
            setPosition(cleaned);
        })();
    }, [dataSetId]);

    const style = {
        color: 'red', weight: 2, opacity: 0.5, fillColor: 'red', fillOpacity: 0.1,
    };

    // อัปเดต tooltip ทุกครั้งที่ position เปลี่ยน
    useEffect(() => {
        if (!geoRef.current) return;

        geoRef.current.eachLayer((layer: any) => {
            const feature = layer.feature as Feature<Polygon | MultiPolygon, GeoJsonProperties>;
            if (!feature?.geometry) return;

            const props = feature.properties as any;
            const name = props?.NL_NAME_1 || props?.name || props?.PROV_NAMT || 'ไม่ทราบชื่อจังหวัด';

            const count = position.reduce((acc, pt) => {
                const inside = booleanPointInPolygon(turfPoint([pt.lng, pt.lat]), feature);
                return acc + (inside ? 1 : 0);
            }, 0);

            if (count > 0) {
                layer.bindTooltip(`${name} ${count} ท่าน`, {
                    direction: 'top', sticky: true, permanent: true
                });
            } else {
                layer.unbindTooltip();
            }
        });
    }, [position]);



    return (
        <div className="w-full">
            <MapContainer center={[17.873902, 101.226944]} zoom={8} style={{ height: '1000px', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <GeoJSON
                    ref={geoRef}                 // 👈 ถือ ref
                    data={thailand as FeatureCollection}
                    style={style}
                />
            </MapContainer>
        </div>
    );
}
