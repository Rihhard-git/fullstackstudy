const User = ({ user }) => {

    if (!user) {
        return null
    }

    console.log('priting user, in user component', user)
    console.log(user.blogs.length === 0)
    console.log(user)


    return (
        <div>
            <h2>Users</h2>
            <h3>{user.name}</h3>
            <h4>added blogs</h4>
            {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
        </div>
    )
}

export default User
