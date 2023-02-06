const NotificationRequestMemberTeam = ({senderteam}) => {

    /* console.log("notificationData Note", notificationData) */

    return (
        <div className="">
            <h2>Team member request</h2>
            <p>{senderteam.name} requested you to join their team</p>
        </div>
    )
}

export default NotificationRequestMemberTeam