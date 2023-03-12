import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    fetch("http://localhost:3001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
    })
    .then(res => res.json())
    .then(data => {
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        setExpiresIn(data.expiresIn)
        window.history.pushState({}, null, "/")
    })
    .catch(() => {
        window.location = "/"
    })
  }, [code])

//   console.log("refresh before setInterval " + refreshToken)
//   console.log("expiresIn before setInterval " + expiresIn)

//   useEffect(() => {
//     if (!refreshToken || !expiresIn){
//     console.log("if statement valid?")
//     const interval = setInterval(() => {
//         console.log("during setInterval")
//       axios
//         .post("http://localhost:3001/refresh", {
//           refreshToken,
//         })
//         .then(res => {
//           setAccessToken(res.data.accessToken)
//           setExpiresIn(res.data.expiresIn)
//         })
//         .catch(() => {
//           window.location = "/"
//         })
//     }, (expiresIn - 60) * 1000)

//     return () => clearInterval(interval)
//   }}, [refreshToken, expiresIn])

  useEffect(() => {
    if (refreshToken !== undefined || expiresIn !== undefined) {
      console.log("if statement runs and refresh token is " + refreshToken)
      const interval = setInterval(() => {
        console.log("during setInterval")
        fetch("http://localhost:3001/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        })
          .then(res => res.json())
          .then(data => {
            setAccessToken(data.accessToken)
            setExpiresIn(data.expiresIn)
          })
          .catch(() => {
            window.location = "/"
          })
      }, (expiresIn - 60) * 1000)
  
      return () => clearInterval(interval)
    }
  }, [refreshToken, expiresIn])

  console.log("after setInterval")
  return accessToken
}
