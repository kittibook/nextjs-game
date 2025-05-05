

export default function NavBar() {
    return (
        <div className="fixed w-full z-50">
            <div className="flex justify-between h-full border-b-[1.5px] border-b-neutral-300 p-2">
                <div className="md:w-[20%]  text-xs lg:text-lg font-bold text-main flex  items-center px-2">
                    <div className="bg-main text-white rounded-full h-8 w-8 flex items-center justify-center mr-3"> A </div>
                    A&S for MCI GAME
                </div>
                <div className="hidden w-[50%] px-[10%] text-sm lg:text-2xl text-bgnavbar-1 md:flex justify-center items-center font-bold">
                    {/* <div className=" flex bg-[#5A67BA] text-white rounded-full h-9 w-9 items-center justify-center mr-3">
                        B
                    </div>
                    <div className=" text-[#5A67BA] text-sm lg:text-lg flex items-center justify-center"> BXOK </div> */}
                </div>
            </div>
        </div>
    )
}