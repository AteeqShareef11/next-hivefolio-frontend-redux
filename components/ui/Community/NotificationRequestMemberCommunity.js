const NotificationRequestMemberCommunity = ({sendercommunity}) => {

    /* console.log("notificationData Note", notificationData) */

    return (
        <div className="">
            <h2>Community member request</h2>
            <p>{sendercommunity.name} has sent you a member request</p>
        </div>
    )
}

export default NotificationRequestMemberCommunity