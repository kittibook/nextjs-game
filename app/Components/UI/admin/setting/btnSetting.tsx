

export default function BtnSetting( prop : { name : string}) {

    return (
        <>
            <div className="w-2 h-1 bg-main absolute top-0 right-0"></div>
            <div className="w-2 h-1 bg-main absolute bottom-0 right-0"></div>
            <div className="w-2 h-1 bg-main absolute top-0 left-0"></div>
            <div className="w-2 h-1 bg-main absolute bottom-0 left-0"></div>
            <div className="w-1 h-2 bg-main absolute top-0 right-0"></div>
            <div className="w-1 h-2 bg-main absolute bottom-0 right-0"></div>
            <div className="w-1 h-2 bg-main absolute top-0 left-0"></div>
            <div className="w-1 h-2 bg-main absolute bottom-0 left-0"></div>
            <p className="text-xs lg:text-xl">{prop.name}</p>
        </>
    )
}