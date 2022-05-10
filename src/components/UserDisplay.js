import React from 'react'

export function UserDisplay({ email, firstName, lastName, avatar }) {
    return (
        < div className="card" style = {{minWidth: '13rem'}} >
            <img src={avatar} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{`${firstName || ''} ${lastName || ''}`}</h5>
                    <a target='_blank' href={`mailto:${email}`} className="btn btn-primary">{email}</a>
                </div>
            </div>
    )
}