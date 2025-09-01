'use client'
import LayoutAdmin from "@/app/Components/Layout/admin/admin";
import TablePaginationActions from "@/app/Components/UI/admin/table/TablePaginationActions";
import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { getAuth } from "@/app/Services/api.service";


interface DataSet {
    Dataset_id: number,
    Name: string
}

interface User {
    DatasetId: number
    Positionid: number
    User_id: number
    age: number
    createdAt: string
    disease: string
    name: string
    score: string
    time: string
}

export default function AdminUser() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null)
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    const [dataSet, setDataSet] = useState<DataSet[] | []>([])
    const [dataSetSelect, setDataSetSelect] = useState<number | null>(null)
    const [user, setUser] = useState<User[] | []>([])
    const [search, setSearch] = useState<string>('')
    const [criterion, setcCiterion] = useState<number>(0)

    const filteredData = useMemo(() => {
        return user.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, user]);

    useEffect(() => {
        fetchData()
        fetchCriterion()
    }, [])

    const fetchData = async () => {
        try {
            const res = await getAuth('/admin/analyze/namedataset')
            if (res.success) {
                setDataSet(res.dataSet)
            }
        } catch (error) {
        }
    }

     const fetchCriterion = async () => {
        try {
            const res = await getAuth('/admin/user/criterion')
            if (res.success) {
                setcCiterion(res.criterion)
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchUser()
    }, [dataSetSelect])

    const fetchUser = async () => {
        try {
            const id = dataSetSelect === 0 ? null : dataSetSelect
            const res = await getAuth('/admin/user/' + id)
            if (res.success) {
                setUser(res.user)
                setPage(0)
            }
        } catch (error) {
        }
    }

    const encodeId = (id: string) => btoa(id);

    return (
        <LayoutAdmin>
            <div className="min-h-screen min-w-[100%] flex flex-col pt-15 pl-5 bg-gray-50">
                <div className="flex justify-between items-center  ">
                    <h1 className="text-2xl font-medium text-[rgb(31,56,76)]">จัดการข้อมูลผู้ใช้งาน</h1>

                </div>

                <div className="w-full flex justify-center mt-5">

                    <div className="p-4 w-[90%] bg-bgnavbar-2 rounded-2xl">

                        {/* Top bar */}
                        <div className="flex justify-between items-center mb-4 w-full">
                            <div className="flex gap-2 w-[80%]">
                                {/* <button className="bg-bgnavbar-2 border border-bgnavbar-1 text-main p-2 rounded"><FilterAltIcon /> Filter</button> */}

                                <div className="relative">
                                    <SearchIcon className="absolute left-2 top-2.5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        placeholder="Search Data by Name "
                                        className="pl-8 pr-4 py-2 rounded-md border border-gray-300 w-80 bg-purple-50 focus:outline-none"
                                    />
                                </div>

                                <select
                                    // disabled
                                    id="countries_disabled"
                                    value={dataSetSelect ?? 0}
                                    onChange={e => setDataSetSelect(Number(e.target.value))}
                                    className=" w-[30%] bg-btn-dashboard border border-main-2 text-main  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                // defaultValue={0} // ใช้ defaultValue แทน selected
                                >
                                    <option value={0}>เลือกชุดข้อมูล</option>
                                    {dataSet.length > 0 ? <>
                                        {dataSet.map((v, i) => (
                                            <option key={v.Dataset_id} value={v.Dataset_id}>{v.Name}</option>

                                        ))}
                                    </> : ''}
                                </select>
                            </div>
                            {/* <button onClick={e => router.push('/admin/dataset/create')} className="bg-data-set/70 hover:bg-data-set p-2 rounded text-white">เพิ่มข้อมูล</button> */}
                        </div>

                        {/* Table */}

                        <TableContainer component={Paper} className="rounded-lg shadow-sm text-main w-full">
                            <Table>
                                <TableHead>
                                    <TableRow className="bg-data-set/20">
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">ชื่อ</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">อายุ</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">โรคประจำตัว</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">คะแนน</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">MCI</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl" align="right">เพิ่มเติม</TableCell>
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : filteredData
                                    ).map((user) => (
                                        <TableRow key={user.User_id}>
                                            <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{user.name}</TableCell>
                                            <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{user.age}</TableCell>
                                            <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{user.disease}</TableCell>
                                            <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{user.score}</TableCell>
                                            <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{ Number(user.score) >= criterion ? <p className="p-2 bg-green-200 rounded-2xl text-center">ไม่เป็น MCI</p> : <p className="p-2 bg-red-200 rounded-2xl text-center">เป็น MCI</p>}</TableCell>
                                            <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl" align="right">
                                                <div className="flex items-center justify-end space-x-0 lg:space-x-4">
                                                    <span onClick={e => router.push('/admin/manageuser/detail/' + encodeId(user.User_id as unknown as string))} className="text-main cursor-pointer">View More</span>
                                                    <IconButton onClick={handleMenuClick}>
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
                                            count={user.length}
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



                        {/* Menu Example */}
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                            <MenuItem onClick={handleClose}>Delete</MenuItem>
                        </Menu>
                    </div>
                </div>


            </div>
        </LayoutAdmin>
    )
}