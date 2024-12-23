import React from 'react'

const UserCard = ({user}) => {
    console.log(user) ;
  return (
    <div>
        <div className="card glass w-96">
            <figure>
                <img
                className='p-3'
                src={user.photoUrl}
                alt="car!" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user.firstName} {user.lastName}</h2>
                <p>How to park your car at your garage?</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard