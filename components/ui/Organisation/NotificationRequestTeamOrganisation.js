const NotificationRequestTeamOrganisation = ({senderorganisation}) => {

    /* console.log("notificationData Note", notificationData) */

    return (
        <div className="">
            <h2>Organisation team approval</h2>
            <p>{senderorganisation.name} sent a request to add your team</p>
        </div>
    )
}

export default NotificationRequestTeamOrganisation