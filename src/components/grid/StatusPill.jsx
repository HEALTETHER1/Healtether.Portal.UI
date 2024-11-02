import { classNames } from "./Utils";

export function StatusPill({ value,column,row }) {
  
    return (
      <span key={row.original[column.idAccessor]+"_status"}
        className={
          classNames(
            "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full ",
            column.validatorAccessor(row.original) ?  "bg-green-200 text-Primary border" :"bg-purple-100 text-Secondary border" 
         
          )
        }
      >
        {column.statusAccessor(row.original)}
      </span>
    );
  };