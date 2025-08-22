"use client"

import LayoutAdmin from "@/app/Components/Layout/admin/admin";
import RiskChart from "@/app/Components/UI/admin/analyze/riskChart";
import ScoreChart from "@/app/Components/UI/admin/analyze/scoreChart";
import UserChart from "@/app/Components/UI/admin/analyze/userChart";
import UserLatest from "@/app/Components/UI/admin/analyze/userLatest";
import dynamic from 'next/dynamic';
import type { Feature, FeatureCollection } from 'geojson';
// import Map from "@/app/Components/UI/admin/analyze/map";
import { useEffect, useState } from "react";
import { getAuth } from "@/app/Services/api.service";
import KhonKaenJson from '@/app/Assets/KhonKaen.json'
import PhayaoJson from '@/app/Assets/Phayao.json'
const Map = dynamic(() => import('@/app/Components/UI/admin/analyze/map'), { ssr: false });



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
          <h1 className="text-2xl font-medium text-[#1F384C]">วิเคราะห์ข้อมูล</h1>
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
          <div className="col-span-1 lg:col-span-2 lg:row-span-3 transition-all duration-300 p-9  w-full  min-h-72">
            <Map
              dataSetId={dataSetSelect}
            />

          </div>
          <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
            <ScoreChart dataSetId={dataSetSelect}  />
          </div>
          {/* <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
            <RiskChart />
          </div> */}
          <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
            <UserLatest dataSetId={dataSetSelect}  />
          </div>
          {/* <div className="col-span-1 transition-all duration-300 p-9  w-full  min-h-72 lg:border-r border-main-2">
            <AnalyzeMap />
          </div> */}
        </div>
      </div>
    </LayoutAdmin>
  )
}