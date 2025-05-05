'use client';
import { Button, IconButton, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, Menu, MenuItem, TableFooter, TablePagination, useTheme, Box } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import LayoutAdmin from "@/app/Components/Layout/admin/admin";
import { useState } from 'react';
import TablePaginationActions from '@/app/Components/UI/admin/table/TablePaginationActions';
import { useRouter } from 'next/navigation';

export default function AdminDataSet() {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null)
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
    ;

    return (
        <LayoutAdmin>
            <div className="min-h-screen w-full flex flex-col bg-gray-50">
                <div className="flex justify-between items-center p-16 ">
                    <h1 className="text-lg font-medium text-[#1F384C]">จัดการชุดข้อมูล</h1>
                </div>
                <div className="flex justify-center items-center w-full ">

                    <div className="p-4 w-[90%] bg-bgnavbar-2 rounded-2xl">
                        {/* Top bar */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-2">
                                <button className="bg-bgnavbar-2 border border-bgnavbar-1 text-main p-2 rounded"><FilterAltIcon /> Filter</button>
                                <div className="relative">
                                    <SearchIcon className="absolute left-2 top-2.5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search Data by Name "
                                        className="pl-8 pr-4 py-2 rounded-md border border-gray-300 w-80 bg-purple-50 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <button onClick={e => router.push('/admin/dataset/create')} className="bg-data-set/70 hover:bg-data-set p-2 rounded text-white">เพิ่มข้อมูล</button>
                        </div>

                        {/* Table */}
                        <TableContainer component={Paper} className="rounded-lg shadow-sm text-main">
                            <Table>
                                <TableHead>
                                    <TableRow className="bg-data-set/20">
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">ชื่อข้อมูล</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">ระยะเวลาการเก็บข้อมูล</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">รายละเอียด</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">ผู้สร้าง</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">สร้างเมื่อ</TableCell>
                                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl" align="right">เพิ่มเติม</TableCell>
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                    ).map((row) => (
                                        <TableRow key={row}>
                                            <TableCell>DATA NAME {row}</TableCell>
                                            <TableCell>{row} มกราคม 2568 - {row + 1} มีนาคม 2568</TableCell>
                                            <TableCell>เก็บข้อมูล .....</TableCell>
                                            <TableCell>USERNAME {row}</TableCell>
                                            <TableCell>1/{row}/2568 - 12:12:12</TableCell>
                                            <TableCell align="right">
                                                <div className="flex items-center justify-end space-x-4">
                                                    <span className="text-main cursor-pointer">View More</span>
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
                                            count={rows.length}
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