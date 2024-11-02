function ButtonList({id, name,isActive, change,activeBgCss="bg-Primary"}){
  
    return (
     <button type="button" key={id + "_" + name} className={(isActive? "text-white "+activeBgCss :"bg-BgPrimary text-TextPrimary ")+ " font-normal text-sm w-fit px-4 border rounded-full text-center py-2 mx-2 ml-1 justify-self-end"}
     onClick={change}
     >
                {name}
                </button>
  )
}

export default ButtonList   