'use client';
import { Button, IconButton, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, Menu, MenuItem, TableFooter, TablePagination, useTheme, Box } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import LayoutAdmin from "@/app/Components/Layout/admin/admin";
import { useEffect, useMemo, useState } from 'react';
import TablePaginationActions from '@/app/Components/UI/admin/table/TablePaginationActions';
import { useRouter } from 'next/navigation';
import { getAuth, putAuth } from '@/app/Services/api.service';
import { Feature, FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import thailand from '@/app/Assets/thailand.json';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point as turfPoint } from '@turf/helpers';
import ConfirmDeleteModal from '@/app/Components/UI/admin/dataset/Modal';

interface DataSet {
    Dataset_id: number
    Name: string
    Position: {
        latitude: string
        longitude: string
    }
    dateEnd: string
    dateStart: string
    details: string
    status: string
}

export default function AdminDataSet() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null)
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dataSet, setDataSet] = useState<DataSet[] | []>([])
    const [search, setSearch] = useState<string>('')
    const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);
    const [dataSetSelect, setDataSetSelect] = useState<DataSet | null>(null)
    const [openDelete, setOpenDelete] = useState(false);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await getAuth('/admin/dataset/')
            // console.log(res)
            setDataSet(res.dataSet)
        } catch (error) {

        }
    }

    const formatDateThai = (dateString: string): string => {
        const date = new Date(dateString);

        const months = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear() + 543; // แปลง ค.ศ. → พ.ศ.

        return `${day} ${month} ${year}`;
    }

    const getProvinceName = (lat: number, lng: number): string | null => {
        const fc = thailand as FeatureCollection;

        for (const feature of fc.features) {
            if (!feature.geometry) continue;

            // ให้ turf ตรวจว่า point อยู่ใน polygon/multipolygon หรือไม่
            if (
                feature.geometry.type === 'Polygon' ||
                feature.geometry.type === 'MultiPolygon'
            ) {
                const inside = booleanPointInPolygon(
                    turfPoint([lng, lat]),
                    feature as Feature<Polygon | MultiPolygon>
                );

                if (inside) {
                    const props = feature.properties as any;
                    return (
                        props?.NL_NAME_1 ||
                        props?.name ||
                        props?.PROV_NAMT ||
                        'ไม่ทราบชื่อจังหวัด'
                    );
                }
            }
        }

        return null; // ถ้าไม่พบจังหวัด
    }


    const filteredData = useMemo(() => {
        return dataSet.filter(item =>
            item.Name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, dataSet]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, data: DataSet) => {
        setDataSetSelect(data)
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setMenuEl(null);

    const handleDeleteClick = () => {
        handleMenuClose();
        setOpenDelete(true);
    };

    const handleConfirmDelete = async () => {
        setOpenDelete(false);
    };

    const chengeStatus = async () => {
        try {
            handleClose();
            const res = await putAuth('/admin/dataset/change/' + dataSetSelect?.Dataset_id, '')
            // console.log(res)
            if (res.success) {
                fetchData()
            }

        } catch (error) {
            console.log(' error : ', error)
        }
    }

    const gotoEdit = () => {
        if(!dataSetSelect?.Dataset_id) return
        router.push('/admin/dataset/edit/' + encodeId(dataSetSelect.Dataset_id.toString()))
    }

    const encodeId = (id: string) => btoa(id);

    return (
        <LayoutAdmin>
            <div className="min-h-screen w-full flex flex-col bg-gray-50">
                <div className="flex justify-between items-center p-16 ">
                    <h1 className="text-2xl font-medium text-[#1F384C]">จัดการชุดข้อมูล</h1>
                </div>
                <div className="flex justify-center items-center w-full ">
                    <div className="p-4 w-[90%] bg-bgnavbar-2 rounded-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-2">
                                <button className="bg-bgnavbar-2 border border-bgnavbar-1 text-main p-2 rounded"><FilterAltIcon /> Filter</button>
                                <div className="relative">
                                    <SearchIcon className="absolute left-2 top-2.5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        placeholder="Search DataSet by Name "
                                        className="pl-8 pr-4 py-2 rounded-md border border-gray-300 w-80 bg-purple-50 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <button onClick={e => router.push('/admin/dataset/create')} className="bg-data-set/70 hover:bg-data-set p-2 rounded text-white">เพิ่มข้อมูล</button>
                        </div>

                        <TableContainer component={Paper} className="rounded-lg shadow-sm text-main">
                            <Table>
                                <TableHead>
                                    <TableRow className="bg-data-set/20">
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">ชื่อข้อมูล</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">ระยะเวลาการเก็บข้อมูล</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">รายละเอียด</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">สถานที่</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">สถานะ</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl" align="right">เพิ่มเติม</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : filteredData
                                    ).map((dataSet) => (
                                        <TableRow key={dataSet.details}>
                                            <TableCell>{dataSet.Name}</TableCell>
                                            <TableCell>{formatDateThai(dataSet.dateStart)} - {formatDateThai(dataSet.dateEnd)}</TableCell>
                                            <TableCell>{dataSet.details}</TableCell>
                                            <TableCell>{getProvinceName(Number(dataSet.Position.latitude), Number(dataSet.Position.longitude))}</TableCell>
                                            {/* <TableCell>{dataSet.status}</TableCell> */}
                                            <TableCell>{dataSet.status === 'active' ? 'เปิดใช้งาน' : 'ปิดการใช้งาน' }</TableCell>
                                            <TableCell align="right">
                                                <div className="flex items-center justify-end space-x-4">
                                                    <IconButton onClick={e => handleMenuClick(e, dataSet)}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter  >
                                    <TableRow className='w-full'>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={6}
                                            count={filteredData.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            slotProps={{
                                                select: {
                                                    inputProps: {
                                                        'aria-label': 'rows per page',
                                                    },
                                                    native: true,
                                                },
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>

                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={gotoEdit}>แก้ไข</MenuItem>
                            <MenuItem onClick={chengeStatus}>เปลี่ยนสถานะ ปิด/เปิด การใช้งาน</MenuItem>
                            <MenuItem onClick={handleDeleteClick}>ลบ</MenuItem>
                        </Menu>

                        <ConfirmDeleteModal
                            open={openDelete}
                            onClose={() => setOpenDelete(false)}
                            onConfirm={handleConfirmDelete}
                            data={{
                                name: dataSetSelect?.Name,
                                detail: dataSetSelect?.details,
                                startDate: dataSetSelect?.dateStart,
                                endDate: dataSetSelect?.dateEnd,
                                latitude: dataSetSelect?.Position.latitude,
                                longitude: dataSetSelect?.Position.longitude,
                            }}
                        />
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}