import React, {useEffect, useState} from "react";
import {NavLink, redirect, useNavigate} from "react-router-dom";
import {DeleteStaff, GetStaffOverview} from "services/staff/staff";
import {confirm} from "components/dialog/prompt";
import {QueryClient, QueryClientProvider} from "react-query";
import Action from "components/grid/Action";
import Table, {SelectColumnFilter} from "components/grid/Table";
import {StatusPill} from "components/grid/StatusPill";
import {NamePill} from "components/grid/NamePill";
import {useSelector} from "react-redux";

export default function StaffsOverview() {
    const navigation = useNavigate();
    const {clinic} = useSelector((state) => state.currentClinic)
    function EditStaff(e, staff) {
        navigation('/staff/viewmember/' + staff._id + '/edit');
        e.stopPropagation();
    }

    function DeleteStaffInGrid(e, staff) {
        confirm({
            show: true,
            title: 'Remove',
            proceed: async(e) => {
                var removed = await DeleteStaff(staff._id);
                return removed;
            },
            confirmation: 'Are you sure want to remove staff: ' + (staff.firstName + " " + staff.lastName) + ' ?'
        })
        e.stopPropagation();
    }
    const columns = [
        {
            Header: "Id",
            accessor: 'staffId'
        },
        {
            Header: "Name",
            Cell: NamePill,
            nameAccessor: (value) => {
                let name = "";
                if (value.firstName != undefined) 
                    name += value.firstName + " ";
                
                if (value.lastName != undefined) 
                    name += value.lastName;
                
                return name;
            },
            idAccessor: "_id"
        }, {
            Header: "Phone",
            accessor: 'mobile'
        }, {
            Header: "Status",
            accessor: 'isAdmin',
            Cell: StatusPill,
            validatorAccessor: (value) => {
                return value.isAdmin || value.isDoctor;
            },
            statusAccessor: (value) => {
                return value.isAdmin || value.isDoctor
                    ? "Doctor"
                    : "Staff";
            }
        }, {
            Header: "Action",
            Cell: Action,
            actionAccessor: [
                {
                    name: 'Edit Staff',
                    iconClass: 'icon-[fa-regular--edit] text-md',
                    callBack: EditStaff
                }, {
                    name: 'Email',
                    iconClass: 'icon-[fluent--mail-28-regular] text-xl',
                    callBack: () => {}
                }, {
                    name: 'Whatsapp',
                    iconClass: 'icon-[ion--logo-whatsapp] text-xl',
                    callBack: () => {}
                }, {
                    name: 'Delete Staff',
                    iconClass: 'icon-[mdi--delete] text-xl',
                    callBack: DeleteStaffInGrid
                }
            ],
            idAccessor: "_id"
        }

    ];
    const fetchUsersData = async(page, pageSize, pageFilter, pageSortBy, setData) => {
        let paramStr = ''
        if (pageFilter?.text?.trim().length > 1 && pageFilter?.text!="ClearAllFilter") {
            paramStr = `&keyword=${pageFilter.text}`
        }
        if (pageFilter?.option?.status!=null) {
            paramStr += `&status=${pageFilter.option.status}`
        }
        if (pageSortBy.length > 0) {
            const sortParams = pageSortBy[0];
            const sortyByDir = sortParams.desc
                ? 'desc'
                : 'asc'
            paramStr += `${paramStr}&sortby=${sortParams.id}&direction=${sortyByDir}`
        }
        try {

            var res = await GetStaffOverview(clinic._id, page, pageSize, paramStr)
            const results = res.data;
            const data = {
                results: results.data,
                count: results.totalCount
            };
            return data;

        } catch (e) {
            throw new Error(`API error:${e
                ?.message}`);
        }
    };
    var tabButton = [
        {
            id: 1,
            name: "All",
            isActive: true,
            setStatus:  {status:"All"}
        }, {
            id: 2,
            name: "Doctor",
            isActive: false,
            setStatus: {status:"Doctor"}
        }, {
            id: 3,
            name: "Staff",
            isActive: false,
            setStatus: {status:"Staff"}
        }
    ];
    const queryClient = new QueryClient();
    const rowClick = (row) => {
        navigation('/staff/viewmember/' + row._id);
    }
    return (
        <div className="flex flex-col mt-2">
            <NavLink
                to={"/staff/addmember"}
                className="text-white bg-Primary font-normal  w-fit px-5 rounded-lg text-center py-2 ml-1 justify-self-end">
                Add New Member
            </NavLink>
            <div className="mt-2">
                <QueryClientProvider client={queryClient}>
                    <Table
                        headerColumn={columns}
                        rowClick={rowClick}
                        tableCaption={"Staffs details.."}
                        serverCall={fetchUsersData}
                        showRow={5}
                        tabButton={tabButton}/>
                </QueryClientProvider>
            </div>
        </div>
    )
};