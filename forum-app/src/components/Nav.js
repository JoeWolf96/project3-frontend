
export default function Nav(props) {
    return(
        <nav>
        <div class="userstuff">

            <form onSubmit={props.loggingUser}>
                <strong>Login</strong>
                <label htmlFor="name">Username: </label>
                <input type="text" id="name" name="username"/>
                <label htmlFor="name">Password: </label>
                <input type="text" id="password" name="password"/>
                <input type="submit" value="login" />
            </form>
            OR
            <form onSubmit={props.register}>
                <strong>Register</strong>
                <label htmlFor="name">Username: </label>
                <input type="text" id="name" name="username"/>
                <label htmlFor="name">Password: </label>
                <input type="text" id="password" name="password"/>
                <input type="submit" value="signup" />
            </form>
            </div>
        </nav>
    )
}
