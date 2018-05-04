import React from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { login, logout } from 'redux-implicit-oauth2'
import AsanaData from "./AsanaContainer";
const config = {
    url: "https://app.asana.com/-/oauth_authorize",
    client: "659838923197012",
    secret: "f5a37d66416da51ff9166b94335b0fc1",
    redirect: "http://localhost:8080/oauth/callback",
    width: 400, // Width (in pixels) of login popup window. Optional, default: 400
    height: window.innerHeight-20 // Height (in pixels) of login popup window. Optional, default: 400
}

const Login = ({ isLoggedIn, login, logout }) => {
    if (isLoggedIn) {
        return <AsanaData logout={logout} />
    } else {
        return <button type='button' onClick={login}>Login</button>
    }
}

Login.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
    isLoggedIn: auth.isLoggedIn
})

const mapDispatchToProps = {
    login: () => login(config),
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
