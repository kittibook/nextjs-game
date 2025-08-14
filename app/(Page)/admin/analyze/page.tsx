"use client"

import LayoutAdmin from "@/app/Components/Layout/admin/admin";
import RiskChart from "@/app/Components/UI/admin/analyze/riskChart";
import ScoreChart from "@/app/Components/UI/admin/analyze/scoreChart";
import UserChart from "@/app/Components/UI/admin/analyze/userChart";
import UserLatest from "@/app/Components/UI/admin/analyze/userLatest";
import dynamic from 'next/dynamic';
import data from '@/app/Assets/Geo.json';
import phayao01 from '@/app/Assets/phayao01.json';
import phayao02 from '@/app/Assets/phayao02.json';
import phayao03 from '@/app/Assets/phayao03.json';
import phayao04 from '@/app/Assets/phayao04.json';
import type { Feature, FeatureCollection } from 'geojson';
import AnalyzeMap from "@/app/Components/UI/admin/analyze/analyzeMap";
import { useEffect, useState } from "react";
import { getAuth } from "@/app/Services/api.service";
const Map = dynamic(() => import('@/app/Components/UI/admin/analyze/map'), { ssr: false });

const geoData: FeatureCollection = {
  type: 'FeatureCollection',
  features: [data as Feature], // ✅ OK
};

const geoDataphayao01: FeatureCollection = {
  type: 'FeatureCollection',
  features: phayao01.features as Feature[], //  ภูซาง
};

const geoDataphayao02: FeatureCollection = {
  type: 'FeatureCollection',
  features: phayao02.features as Feature[], // เชียงคำ
};
const geoDataphayao03: FeatureCollection = {
  type: 'FeatureCollection',
  features: phayao03.features as Feature[], //  ปง
};

const geoDataphayao04: FeatureCollection = {
  type: 'FeatureCollection',
  features: phayao04.features as Feature[], //  ปง
};

interface DataSet {
  Dataset_id: number,
  Name: string
}
export default function AdminAnalyze() {

  const [dataSet, setDataSet] = useState<DataSet[] | []>([])
  const [dataSetSelect, setDataSetSelect] = useState<number | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await getAuth('/admin/analyze/namedataset')
      if (res.success) {
        setDataSet(res.dataSet)
        console.log(res.dataSet)
      }
    } catch (error) {

    }
  }

  return (
    <LayoutAdmin>
      <div className="min-h-screen min-w-[100%] flex flex-col pt-15 pl-5">
        <div className="flex justify-between items-center  ">
          <h1 className="text-lg font-medium text-[#1F384C]">วิเคราะห์ข้อมูล</h1>
        </div>
        <select
          // disabled
          id="countries_disabled"
          value={dataSetSelect ?? 0}
          onChange={ e => setDataSetSelect(Number(e.target.value))}
          className=" w-[30%] bg-btn-dashboard border border-main-2 text-main  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5"
          // defaultValue={0} // ใช้ defaultValue แทน selected
        >
          <option value={0}>เลือกชุดข้อมูล</option>
          {dataSet.length > 0 ? <>
            {dataSet.map((v, i) => (
              <option key={v.Dataset_id} value={v.Dataset_id}>{v.Name}</option>

            ))}
          </> : ''}

        </select>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          <div className="col-span-1  transition-all duration-300 p-9 lg:border-r border-[#C8CBD9] w-full  min-h-72 ">
            <UserChart dataSetId={dataSetSelect} />
          </div>
          <div className="col-span-1 lg:col-span-2 lg:row-span-2 transition-all duration-300 p-9  w-full  min-h-72">
            <Map
              geoData01={geoDataphayao01}
              geoData02={geoDataphayao02}
              geoData03={geoDataphayao03}
              geoData04={geoDataphayao04}
              geoData05={geoDataphayao01}
              geoData06={geoDataphayao01}
              geoData07={geoDataphayao01}
              geoData08={geoDataphayao01}
            />

          </div>
          <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
            <ScoreChart dataSetId={dataSetSelect}  />
          </div>
          <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
            <RiskChart />
          </div>
          <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
            <UserLatest />
          </div>
          <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
            <AnalyzeMap />
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}