const NotificationAcceptMemberCommunity = ({senderuser}) => {

    return (
        <div className="">
            <h2>Community member approval</h2>
            <p>{senderuser.gamertag} approved your community member request</p>
        </div>
    )
}

export default NotificationAcceptMemberCommunity