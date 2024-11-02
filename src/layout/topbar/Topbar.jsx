import { Link, useNavigate } from "react-router-dom";
import DefaultTextboxClass from "../../utils/Classes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/slice/AuthSlice";
import { confirm } from "components/dialog/prompt";
import { removeUser } from "store/slice/UserSlice";
import { removeCurrentClinic } from "store/slice/ClinicSlice";

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { clinic } = useSelector((state) => state.currentClinic);
  let SuperAdmin = user.isSuperAdmin;
  let admin = user.isSuperAdmin;

  for (let index = 0; index < user.linkedClinics.length && !admin; index++) {
    const linkedClinic = user.linkedClinics[index];

    var isCurrent = linkedClinic?.clinic?._id == clinic._id;

    if (isCurrent) {
      admin = linkedClinic.isAdmin;
      break;
    }
  }
  const LogoutUser = async () => {
    confirm({
      show: true,
      title: "Logout",
      proceed: async () => {
        dispatch(removeUser());
        dispatch(removeCurrentClinic());
        return dispatch(logout());
      },
      confirmation: "Are you sure you want to logout?",
    });
  };

  const dropDownMenu = [
    {
      _id: 1,
      icon: "icon-[mdi--settings] text-2xl bg-[#046472]",
      Heading: "Settings",
      role: "Admin",
      click: (e) => {
        e.preventDefault();

        navigate("clinic/setting");
      },
    },
    {
      _id: 2,
      icon: "icon-[zondicons--date-add] text-xl bg-[#046472]",
      Heading: "Manage Clinic",
      role: "SuperAdmin",
      click: (e) => {
        e.preventDefault();

        navigate("clinic/manageclinic");
      },
    },
    {
      _id: 3,
      icon: "icon-[mdi--account-switch-outline] text-2xl bg-[#046472]",
      Heading: "Switch Clinic",
      role: "All",
      click: (e) => {
        e.preventDefault();

        navigate("select-clinic");
      },
    },
    {
      _id: 4,
      icon: "icon-[uiw--logout] text-xl bg-[#046472]",
      role: "All",
      Heading: "Logout",
      click: (e) => {
        e.preventDefault();

        LogoutUser();
      },
    },
  ];

  return (
    <div className="flex h-full space-y-2">
      <div className="flex flex-row md:w-4/5 items-center justify-start">
        {/* <div className="flex items-center">
            <img src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png" alt="Logo" className="w-28 h-18 mr-2"/>
            <h2 className="font-bold text-xl">Nombre de la Aplicación</h2>
        </div> */}

        <div className="lg:hidden  mr-3  basis-1/6">
          <div id="menuBtn" className="peer">
            <i className="icon-[streamline--interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger]  text-xl "></i>
          </div>
        </div>
        <div className=" md:basis-3/6 xl:basis-4/6 ">
          <input
            type="text"
            name="Search"
            placeholder="Quick Search Patient"
            id="Search"
            className={DefaultTextboxClass + " w-3/4 text-sm "}
          />{" "}
          {/* <TEInput type="text" id="Search" label="Search Patient" prefix={<i
                                    className="icon-[streamline--interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger]  text-xl "></i>}  size="base" theme={inputText}></TEInput>
                            */}
        </div>
      </div>

      <div className="flex flex-row md:w-1/5 items-center justify-end">
        <div className="flex space-x-5 ">
          <button id="info" name="info" type="button">
            <span className="icon-[material-symbols--help-outline]  text-2xl"></span>
          </button>

          <button id="notification" name="notification" type="button">
            <Link to="notification" className="">
              <span className="icon-[gridicons--bell] text-2xl"></span>
            </Link>
          </button>

          <div className="relative inline-block text-left ">
            <div className="peer">
              <button id="profileimage" name="profileimage">
                <span className="flex">
                  <img
                    src="https://mdbootstrap.com//img/Photos/Square/1.jpg"
                    className="max-h-8 max-w-full rounded-full"
                    alt=""
                  />
                  <span className="ml-2 mt-1 h-fit truncate">
                    {user?.firstName + " " + user?.lastName}
                  </span>
                </span>
              </button>
            </div>
            <div className="w-[180px] hidden peer-hover:flex focus:flex py-2  hover:flex absolute flex-col right-0 z-10  origin-top-right inline-block  bg-TextBgPrimary z-10 rounded-lg  drop-shadow cursor-pointer space-y-3">
              {dropDownMenu.map((item) => {
                if (
                  (item.role == "Admin" && admin) ||
                  item.role == "All" ||
                  (item.role == "SuperAdmin" && SuperAdmin)
                )
                  return (
                    <div
                      className="hover:bg-white hover:border-r-2 hover:border-r-[#110C2C]  px-2.5 py-1.5"
                      key={item._id}
                      onClick={(e) => {
                        item.click(e);
                      }}
                    >
                      <div className="flex flex-row  align-center space-x-3">
                        <span
                          className={item.icon + " "}
                          style={{
                            color: "#625D5D",
                          }}
                        ></span>
                        <span className="text-black-100 text-TextPrimary">
                          {item.Heading}
                        </span>
                      </div>
                    </div>
                  );
                else return <></>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
