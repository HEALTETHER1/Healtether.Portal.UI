import React, { useEffect, useState } from 'react'
import DefaultTextboxClass from '../../utils/Classes'
import ButtonList from '../detail-page/ButtonList'
// import Select from 'react-select'

// const statusOptions = [
//     {'value':'', 'label':'All'},
//     {'value':'Active', 'label':'Active'},
//     {'value':'Inactive', 'label':'Inactive'},
//     {'value':'Pending', 'label':'Pending'},
// ]

function GridFilter  ({onClickFilterCallback, defaultKeyword,tabButton,showFilter})  {
    const [keyword, setKeyword] = useState(defaultKeyword)
    const onKeywordChange = ( e ) => {
        var prev=keyword;
        setKeyword({text: e.target.value,option:prev.option} )
    }
    const onClickSearch = () => {
        onClickFilterCallback(keyword)
    }
    const onClear=()=>{
        var prev=keyword;
        setKeyword({text:"",option:prev.option});
        onClickFilterCallback({text:"ClearAllFilter",option:prev.option});
    }
    const [activeTab,
        setActiveTab] = useState(0);
    const handleTabClick = (tabNumber) => {
            setActiveTab(tabNumber);
      };

    const handleKeyPress = async (e) => {
        if (e.key === "Enter") {
        onClickSearch();
        }
    };
useEffect(()=>{
    if(keyword.text==""){
        onClear();
    }
},[keyword.text])

    return (
        <>
             {tabButton!=null?  <div className="mb-4 mt-2" >
       { tabButton.map((tab, i) => {
        return <ButtonList key={i} id={i} name={tab.name}  isActive={(activeTab === i)} change={()=>{
             handleTabClick(i);
              var prev=keyword;
               setKeyword({text:prev.text,option:{...prev.option,status:tab.setStatus?.status}});
                onClickFilterCallback({text:prev.text,option:{...prev.option,status:tab.setStatus?.status}});}}/>
         }) }
        </div>:<></>}
        {showFilter?
        <div className="flex w-1/2 mb-2 ">
            {/* <div className="col-md-4 px-0">
                <Select
                    value={status}
                    onChange={onStatusChange}
                    options={statusOptions}
                    clearable={false}
                    className="react-select"
                    placeholder={statusPlaceholder}
                    classNamePrefix="react-select"
                />
            </div> */}
            <div className="flex ml-1 w-3/5">
                    <input 
                        value={keyword.text}
                        onChange={onKeywordChange}
                        type="text"
                        onKeyDown={handleKeyPress}
                        className={DefaultTextboxClass+" w-full py-1 leading-2 border text-sm shadow-xs border-BgSecondary hover:border-BgSecondary"}
                        //className="rounded-3xl text-[#484d63] outline-none shadow-xs focus:border-teal-500 focus:ring-teal-500  "
                        placeholder="Search..."
                    />
            </div>
            <div className="flex ml-2 space-x-2">
                <button className="cursor-pointer border-Primary border  px-3 py-2 text-Primary hover:text-white hover:bg-Primary rounded-lg" onClick={onClickSearch} >
                <span className='flex text-xs'>
                            <i className="icon-[fluent--search-16-filled] text-[1.0rem] mr-2"></i>
                            Search </span>
                    
                    </button>
                    <button className="cursor-pointer px-3 py-2 text-Primary bg-white border border-Primary hover:text-white hover:bg-Primary rounded-lg" onClick={onClear}>
                <span className='flex text-xs'>
                &#10008;&nbsp;&nbsp;Clear </span>
                    
                    </button>
            </div>
        </div>:<></>}
        </>
    )
}

export default GridFilter;