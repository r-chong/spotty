import {useState, useEffect} from "react";
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        axios.post('http://localhost:3001/login', {
            code,
        })
        .then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({},null,'/')
        })
        .catch(() => {
            // if the accesstoken expires, redirect back to / to get new token
            window.location = '/'
        })
    },[code])

    return accessToken
}