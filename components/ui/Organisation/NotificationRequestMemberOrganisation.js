const NotificationRequestMemberOrganisation = ({senderorganisation}) => {

    /* console.log("notificationData Note", notificationData) */

    return (
        <div className="">
            <h2>Organisation member request</h2>
            <p>{senderorganisation.name} requested you to join their organisation</p>
        </div>
    )
}

export default NotificationRequestMemberOrganisation