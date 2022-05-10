import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { UserDisplay } from './UserDisplay'

const API_INIT_STATE = { loading: false, error: null }
export function Users() {
    const [users, setUsers] = useState([])
    const [apiState, setApiState] = useState(API_INIT_STATE)

    const fetchUsers = async () => {
        const userIds = ['1', '3', '10']
        setApiState({ ...API_INIT_STATE, loading: true, error: null })
        try {
            const data = await Promise.all(userIds.map(id => {
                return axios.get(`https://reqres.in/api/users/${id}`)
            }))

            const _users = data.map(userRes => {
                const { data } = userRes
                return data
            })

            setUsers([..._users])

            setApiState({ ...API_INIT_STATE, loading: false })
        } catch (ex) {
            setApiState({ ...API_INIT_STATE, loading: false, error: 'Something went wrong' })
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (API_INIT_STATE?.loading) return (<span>Loading data...</span>)
    if (API_INIT_STATE?.error) return (<span>{API_INIT_STATE.error}</span>)

    return (
        <ul style={{display: 'flex', gap: '1rem', flexFlow: 'row wrap', listStyleType: 'none', alignItems: 'flex-end'}}>
            {users.map(userData => {
                const { id, email, first_name, last_name, avatar } = userData?.data

                return (
                    <li key={`email-${id}`} id={`email-${id}`}>
                        <UserDisplay
                            email={email}
                            firstName={first_name}
                            lastName={last_name}
                            avatar={avatar} />
                    </li>
                )
            })}
        </ul>
    )
}