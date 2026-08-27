import EnrollmentRequest from "./EnrollmentRequest";

const NotificationItem = ({
    notification,
    onProcessed = () => { },
}) => {
    if (!notification) {
        return null;
    }

    switch (notification.type) {
        case "ENROLLMENT_REQUEST":
            return (
                <EnrollmentRequest
                    notification={notification}
                    onProcessed={onProcessed}
                />
            );

        default:
            return null;
    }
};

export default NotificationItem;