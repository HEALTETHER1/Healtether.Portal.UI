import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import ContainerHeading from "components/detail-page/ContainerHeading";
import { GetNotificationOverview } from "../../services/notification/notificationApi";
import { PageButton } from "../../components/grid/Button";

function Notification() {
  const [notification, SetNotification] = useState(() => []);
  const [notificationCount, SetNotificationCount] = useState(() => 0);
  const [page, SetPage] = useState(1);
  const [pageSize, SetPageSize] = useState(10);
  const [canPreviousPage, SetCanPreviousPage] = useState(false);
  const [canNextPage, SetCanNextPage] = useState(true);
  const [loading, SetLoading] = useState(false);
  let loadingStarted = false;
  useEffect(() => {
    if (!loadingStarted) {
      loadingStarted = true;
      const fetch = async () => {
        var notification = await fetchNotificationData(
          page,
          pageSize,
          null,
          null
        );
        SetNotification(notification.results);
        SetNotificationCount(notification.count);
      };
      fetch();
    }
  }, [loadingStarted]);
  const fetchNotificationData = async (page, pageSize) => {
    try {
      SetLoading(true);
      var res = await GetNotificationOverview(page, pageSize);
      const results = res.data;
      const data = {
        results: results.data,
        count: results.totalCount,
      };
      SetLoading(false);
      return data;
    } catch (e) {
      throw new Error(`API error:${e?.message}`);
    }
  };

  async function previousPage() {
    var pg = page;
    var previous = pg - 1;
    if (previous == 1) {
      SetCanPreviousPage(false);
    }
    if (Math.ceil(notificationCount / pageSize) == previous) {
      SetCanNextPage(false);
    } else {
      SetCanNextPage(true);
    }
    if (previous > -1) {
      SetPage(previous);
      var notification = await fetchNotificationData(previous, pageSize);
      SetNotification(notification.results);
      SetNotificationCount(notification.count);
    }
  }

  async function nextPage() {
    var pg = page;
    var previous = pg + 1;
    if (Math.ceil(notificationCount / pageSize) == previous) {
      SetCanNextPage(false);
    } else {
      SetCanPreviousPage(true);
    }

    if (previous > -1) {
      SetPage(previous);
      var notification = await fetchNotificationData(previous, pageSize);
      SetNotification(notification.results);
      SetNotificationCount(notification.count);
    }
  }

  return (
    <div className="pt-2">
      <div className="space-y-2">
        <ContainerHeading heading={"Notifications"} />

        <div className=" text-sm text-BreadcrumbText flex flex-row justify-between">
          <span>
            {notificationCount}
            appointments found
          </span>
          <div className=" flex text-md font-semibold">
            {(page - 1) * pageSize}- {page * pageSize}
            &nbsp; of &nbsp;{" "}
            {notificationCount < pageSize
              ? 1
              : Math.ceil(notificationCount / pageSize)}
            &nbsp;&nbsp;
            <div className="flex justify-center ">
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="icon-[ic--round-keyboard-arrow-left] h-full w-5 text-gray-600"></span>
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="icon-[ic--round-keyboard-arrow-right] h-full w-5 text-gray-600"></span>
              </PageButton>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <NotificationCard notificationText={notification} isloading={loading} />
      </div>
    </div>
  );
}

export default Notification;
