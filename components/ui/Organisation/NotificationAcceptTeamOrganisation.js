const NotificationAcceptTeamOrganisation = ({senderteam}) => {

    /* console.log("notificationData Note", notificationData) */

    return (
        <div className="">
            <h2>Organisation team approval</h2>
            <p>{senderteam.name} approved your team request</p>
        </div>
    )
}

export default NotificationAcceptTeamOrganisation