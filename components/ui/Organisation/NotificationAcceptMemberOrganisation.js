const NotificationAcceptMemberOrganisation = ({senderuser}) => {

    /* console.log("notificationData Note", notificationData) */

    return (
        <div className="">
            <h2>Organisation member approval</h2>
            <p>{senderuser.gamertag} approved your organisation member request</p>
        </div>
    )
}

export default NotificationAcceptMemberOrganisation