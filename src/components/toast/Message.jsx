import PropTypes from "prop-types";

const Message = ({ notification }) => {
  return (
    <>
      <div id="notificationHeader">
        {/* image is optional */}
        {notification.image && (
          <div id="imageContainer">
            <img src={notification.image} width={100} alt="Notification" />
          </div>
        )}
        <span className="text-xs font-semibold uppercase font-['Montserrat']">
          {notification.title}
        </span>
      </div>
      <div id="notificationBody" className="text-sm">
        <span className="text-sm font-normal capitalize font-['poppins']">
          {notification.body}
        </span>
      </div>
    </>
  );
};

Message.propTypes = {
  notification: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
