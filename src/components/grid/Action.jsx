import {useState} from "react";
import PropTypes from 'prop-types'; 

export default function Action({ value, column, row }) {
    
    return (
        <span className="flex  space-x-4 align-center justify-center">
            {column.actionAccessor.map((item) => (
                <span key={row.original[column.idAccessor]+"_"+item.name}
                    className={item.iconClass + " cursor-pointer"}
                    data-tooltip-id="grid-tooltip"
                    role="button"
                    data-tooltip-content={item.name}
                    data-tooltip-place="top"
                    onClick={(e) => item.callBack(e,row.original)}></span>
            ))}
        </span>
    )
}
// Action.propTypes={
//     actionProp:PropTypes.array,
// }
// Action.defaultProps ={
//     actionProp:[{
//         name: 'Email',
//         iconClass: '',
//         callBack: () => {}
//     }]
// }