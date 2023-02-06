const NotificationRequestCommunityOrganisation = ({senderorganisation}) => {

    /* console.log("notificationData Note", notificationData) */

    return (
        <div className="">
            <h2>Organisation community request</h2>
            <p>{senderorganisation.name} sent a request to add your community</p>
        </div>
    )
}

export default NotificationRequestCommunityOrganisation