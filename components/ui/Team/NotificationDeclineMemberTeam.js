const NotificationDeclineMemberTeam = ({senderuser}) => {

    /* console.log("notificationData Note", notificationData) */

    return (
        <div className="">
            <h2>Team member decline</h2>
            <p>{senderuser.gamertag} approved your team member request</p>
        </div>
    )
}

export default NotificationDeclineMemberTeam