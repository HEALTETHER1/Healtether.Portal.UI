
export function NamePill({ value,column,row }){
    return(     <span key={row.original[column.idAccessor]+"_name"}>
    {column.nameAccessor(row.original)}
  </span>)
}