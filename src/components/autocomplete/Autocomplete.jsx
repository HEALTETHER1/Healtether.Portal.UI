import React, { useEffect, useRef, useState } from "react"
import { SearchPatientMobileApi } from "services/patient/patient";
import debounce from 'lodash/debounce';
import AutocompleteModel from "utils/AutocompleteModel";

export default function Autocomplete({onSelect, name,value,defaultValue, onChange,customClass,placeHolder,search,searchMapper,setDisable=false,maxLength=10,avoidImg=false}) {

    const [showOptions, setShowOptions] = useState(false)
    const [filteredOptions, setfilteredOptions] = useState([])
    const [cursor, setCursor] = useState(-1)
    const [loading,SetLoading]=useState(false);
    const ref = useRef();
   
    const select = option => {
        onSelect(option)
        setShowOptions(false)
    }
   let onChangeDebounced = (text) => {
    if(text.length>3)
    {
   setfilteredOptions([]);
   SetLoading(true);
   search(text,50).then((res)=>{
            var data=res.data;
            var options=searchMapper(data);
           setfilteredOptions(options);
            setCursor(-1);
            if(!showOptions) {
                setShowOptions(true)
            }
            SetLoading(false);
        });
    }
      }
     onChangeDebounced = debounce(onChangeDebounced, 200)
    const handleChange = text => {
        onChange(text);
        onChangeDebounced(text);
    }
   
    

    const moveCursorDown = () => {
        if(cursor < filteredOptions.length - 1) {
            var c=cursor;
            c=c+1;
            setCursor(c)
        }
    }

    const moveCursorUp = () => {
        if(cursor > 0) {
            var c=cursor;
            c=c-1;
            setCursor(c - 1)
        }
    }

    const handleNav = (e) => {
        switch (e.key) {
            case "ArrowUp":
                moveCursorUp();
                break;
            case "ArrowDown":
                moveCursorDown();
                break;
            case "Enter":
                if(cursor >= 0 && cursor < filteredOptions.length) {
                    select(filteredOptions[cursor].Value);
                    return false;
                }
                break;
        }
    }

    useEffect(() => {
        const listener = e => {
            if(!ref.current.contains(e.target)) {
                setShowOptions(false)
                setCursor(-1)
            }
        };
        
        document.addEventListener('click', listener)
        document.addEventListener('focusin', listener)
        return () => { 
            document.removeEventListener('click', listener); 
            document.removeEventListener('focusin', listener); 
        }
    },[]);

  
    let className = "px-4 hover:bg-gray-100 "
        
    return (<div className="relative w-full " ref={ref} >

        <input type="text" className={customClass +" relative"}
            value={value}
            onChange={e => handleChange(e.target.value)}
            onFocus={(e)=>{ setShowOptions(false); handleChange(e.target.value)}} 
            onKeyDown={handleNav}
            readOnly={setDisable}
            maxLength={maxLength} defaultValue={defaultValue}
            autoComplete="off"
                             aria-autocomplete="list"
             required
            placeholder={placeHolder} name={name}
            />
         {loading? <div
        className=" absolute end-2.5 bottom-2.5 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-BgSecondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>:<></>}
        <ul className={`absolute mt-2 z-10 mr-2 scroll-smooth origin-top-left w-full max-h-64 overflow-y-auto bg-white shadow-lg border border-Primary  focus:outline-none ${!showOptions && 'hidden' } select-none`}>
           {filteredOptions.length > 0 ? filteredOptions.map((option, i, arr) => {
          
            // if(i === 0)
            //     className += "pt-1 pb-2"
            // else if(i === arr.length)
            //     className += "pt-1 pb-2 "
            // else if(i ===0 && arr.length === 1)
            //     className += "py-2"
            // else 
                className += "pt-1 pb-2"
        
            if(cursor === i) {
                className += " bg-gray-100"
            }
        
            var opt=(
            <div className="flex items-center gap-2 space-x-3">
            {!avoidImg? option.ShowImg?<div id="profileImage" className="flex bg-Primary font-normal text-white text-xl w-[32px] h-[32px] justify-center items-center rounded-full uppercase">{option.MainText.substring(0,1)}</div>:
            <div className="w-[32px] h-[32px]"></div>:<></>}
            <div className="flex flex-col">
            
              <strong className="text-TextPrimary font-medium capitalize">{option.MainText}</strong>
              <span className="text-sm font-light text-Secondary">{option.SubText}</span>
            </div>
          </div>);
        
            return <li className={className} 
                key={i}
                onClick={() => select(option.Value)}
                >{opt}</li>
        }) :<></> }
        </ul>
    </div>)
}