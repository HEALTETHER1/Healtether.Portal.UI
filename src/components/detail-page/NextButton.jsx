export const NextButton=({click})=>{
    return(
        <>
         <div className="pt-2">
            <button type="button" className="bg-Primary text-white py-3 px-10 h-fit rounded-md text-md " onClick={()=>{click();}}>Next&nbsp;&nbsp;&nbsp;&rarr;</button>
            </div>
        </>
    )
}