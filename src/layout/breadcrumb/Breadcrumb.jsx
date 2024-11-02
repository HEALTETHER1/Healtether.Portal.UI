import { Link, useMatches, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Breadcrumb() {
  const navigate = useNavigate();
  const { clinic } = useSelector((state) => state.currentClinic);
  let matches = useMatches();

  let breadcrumbLink = [];
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader data to each one
    .map((match, index) => {
      if (match.handle.crumb != null) {
        breadcrumbLink = [];
        //    actionButton = [];

        // let actions = match.handle.crumb.actionButton;

        //if (actions != null)
        // actionButton.push(
        // <div key={"l1"+index}>
        //     <Link
        //         to={actions.route}
        //         className="bg-white border border-SilverTree  inline-block rounded-lg px-2.5 py-2 leading-normal text-SilverTree shadow-md  xs:hidden lg:block ">
        //         <span className='flex'>
        //             <i className="icon-[fluent--add-16-filled] text-[1.5rem] mr-2"></i>
        //             {actions.title}</span>
        //     </Link>
        //     <Link
        //         to={actions.route}
        //         className="bg-white border  inline-block rounded-lg px-2.5 py-2 leading-normal text-SilverTree xs:block lg:hidden">
        //             <i className="icon-[fluent--add-16-filled] text-[1.3rem] mr-2"></i>
        //     </Link>
        //     </div>
        // );

        let breadcrumb = match.handle.crumb.breadcrumb;
        for (let index = 0; index < breadcrumb.length; index++) {
          const actions = breadcrumb[index];
          if (index != 0) {
            breadcrumbLink.push(
              <li key={"a" + index} className="items-center">
                <span className="icon-[fe--arrow-right] text-[18px] mx-2 text-BreadcrumbText "></span>
              </li>
            );
          }
          if (index == breadcrumb.length - 1) {
            breadcrumbLink.push(
              <li key={"b" + index} className="text-BreadcrumbText ">
                {actions.title}
              </li>
            );
          } else {
            breadcrumbLink.push(
              <li key={"b" + index}>
                <Link
                  to={actions.route}
                  className="text-BreadcrumbText font-semibold transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 "
                >
                  {actions.title}
                </Link>
              </li>
            );
          }
        }
      }
    });
  return (
    <div className="flex flex-nowrap h-full items-center justify-between">
      <nav className="bg-grey-light  rounded-md ">
        <ol className="list-reset flex py-4 ">{breadcrumbLink}</ol>
      </nav>
      <div
        className="flex items-center justify-end cursor-pointer text-Secondary font-semibold"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        <i className="icon-[healthicons--hospital-symbol] text-2xl mr-2"></i>{" "}
        {clinic.clinicName}
      </div>
      {/* <div className='w-1/2 flex items-center justify-end '>
                    {actionButton}  
                    <div className='mr-3'></div>
                    <Link
                        to={'scheduleappointment'}
                        className="bg-SilverTree inline-block border border-SilverTree shadow-md rounded-lg px-2.5 py-2 leading-normal text-white xs:hidden lg:block">

                        <span className='flex'>
                            <i className="icon-[mdi--people-add] text-[1.5rem] mr-2"></i>
                            Schedule Appointment</span>
                    </Link>
                    <Link
                        to={'scheduleappointment'}
                        className="bg-SilverTree inline-block border-SilverTree shadow-sm rounded-lg px-2.5 py-2 leading-normal text-white xs:block lg:hidden">
                        <span className='flex'>
                            <i className="icon-[mdi--people-add] text-[1.5rem] mr-2"></i>
                        </span>

                    </Link>
                </div> */}
    </div>
  );
}
