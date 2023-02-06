const NotificationRequestTeamCommunity = ({sendercommunity}) => {

    /* console.log("notificationData Note", notificationData) */

    return (
        <div className="">
            <h2>Community team request</h2>
            <p>{sendercommunity.name} sent a request to add your team</p>
        </div>
    )
}

export default NotificationRequestTeamCommunity