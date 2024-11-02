
function Sidebar({
    id,
    name,
    isActive,
    onClick,
    isVisible = true,
    isEnabled = false
}) {
  
    return (
        <div key={id + "_" + name}>
            <div
                className="grid grid-cols-1 font-medium space-y-6  items-center font-['Montserrat']">
                <div
                    onClick={() => {
                  const result=  onClick();
         
                }}
                    className={`${isVisible
                    ? ''
                    : 'hidden'}${isActive
                        ? ' bg-[#EEEEEE] shadow-xs '
                        : ' bg-BgDisabled'} ${id} flex font-medium items-center pl-4 h-[55px] rounded-sm capitalize leading-[1.2rem] transition duration-300 ease-in-out ${isEnabled
                            ? ' cursor-pointer '
                            : ' bg-BgDisabled text-TextDisabled cursor-none '}`}>
                    {name}
                </div>

            </div>
        </div>
    )
}

export default Sidebar