const NotificationAcceptCommunityOrganisation = ({sendercommunity}) => {

    /* console.log("notificationData Note", notificationData) */

    return (
        <div className="">
            <h2>Organisation community approval</h2>
            <p>{sendercommunity.name} approved your community request</p>
        </div>
    )
}

export default NotificationAcceptCommunityOrganisation