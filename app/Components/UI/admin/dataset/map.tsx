"use client";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// แก้ไขเพื่อใช้ icon (เป็น path string ไม่ใช่ src)
let DefaultIcon = new Icon({
    iconUrl: icon.src,  // ใช้ icon โดยตรง
    shadowUrl: iconShadow.src,
});

// กำหนด Default Icon ให้กับ Marker
L.Marker.prototype.options.icon = DefaultIcon;

interface Pos {
    latitude: number;
    longitude: number;
}

export default function MapDataSet() {
    const [Position, setPosition] = useState<Pos>({
        latitude: 19.778540408100902,
        longitude: 99.74351904574407
    });

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // console.log(position.coords);
                    localStorage.setItem('latitude', position.coords.latitude.toString());
                    localStorage.setItem('longitude', position.coords.longitude.toString());
                    setPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    // console.error("Geolocation error: ", error);
                    // หากเกิดข้อผิดพลาด เช่น ไม่สามารถดึงตำแหน่งได้
                }
            );
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        localStorage.setItem('latitude', Position.latitude.toString());
        localStorage.setItem('longitude', Position.longitude.toString());
    },[Position])
    return (
        <div className=" w-[500px] h-[500px]">
            <MapContainer center={[Position.latitude, Position.longitude]} zoom={9} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {/* ใช้ useMapEvents ภายใน MapContainer */}
                <MapEvents setPosition={setPosition} />
                {/* เพิ่ม Marker ลงแผนที่ */}
                <Marker position={[Position.latitude, Position.longitude]}>
                    <Popup>ข้อมูลของตำแหน่งนี้</Popup>
                </Marker>

            </MapContainer>
        </div>
    );
}

function MapEvents({ setPosition }: { setPosition: React.Dispatch<React.SetStateAction<Pos>> }) {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition({
                latitude: lat,
                longitude: lng,
            });

            // ทำให้แผนที่ flyTo ไปยังตำแหน่งที่พบ
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return null; // ไม่ต้องแสดงอะไร
}