import React, { useEffect, useState } from 'react'
import Achievements from './Achievements/Achievements'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import TripsHistory from './TripsHistory/TripsHistory'
import { useSelector } from 'react-redux'
import { db } from '../../firebase/firebase'
import './ProfilePage.css'
import AvatarPicture from './ProfileInfo/Avatar/Avatar'
import AboutMe from './ProfileInfo/AboutMe/AboutMe'

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const userFromState = useSelector(state => state.user)
  const [futureTrips, setFutureTrips] = useState([]);
  const [lastTrips, setLastTrips] = useState([]);
  useEffect(() => {
    let currentUser
    if (userFromState.uid) {
      currentUser = db.collection('Users').doc(userFromState.uid)
        .onSnapshot((doc) => setUser(doc.data()))
    }
  }, [userFromState])
  useEffect(() => {
    let currentUser
    if (userFromState.uid) {
      currentUser = db.collection('Users').doc(userFromState.uid).collection("futureTrips")
        .onSnapshot((querySnapshot) => {
          setFutureTrips(querySnapshot.docs.map(el => ({ ...el.data(), id: el.id })))
        })
    }
  }, [userFromState])
  useEffect(() => {
    let currentUser
    if (userFromState.uid) {
      currentUser = db.collection('Users').doc(userFromState.uid).collection("lastTrips")
        .onSnapshot((querySnapshot) => {
          setLastTrips(querySnapshot.docs.map(el => ({ ...el.data(), id: el.id })))
        })
    }
  }, [userFromState])
  return (

    <div>
      {/* <ProfileInfo user={user} /> */}
      {/* <Achievements /> */}
      {/* <Grid container direction="row" justify="center" alignItems="center" flexWrap="nowrap"> */}
      {/* <TripsHistory userFinishedTrips={lastTrips} userFutureTrips={futureTrips} /> */}
      {/* <FriendsList /> */}
      {/* </Grid> */}

      <div className="profile-page">
        <div className="page-header header-filter" data-parallax="true"></div>
        <div className="main main-raised">
          <div className="profile-content">
            <div className="container">
              <div className="row">
                <div className="">
                  <div className="profile">
                    <div className="avatar" style={{ marginBottom: 70 }}>
                      <AvatarPicture user={user} />
                      <div className="titleCont">
                        <h3 className="title">{user.name}</h3>
                        <AboutMe name={user.name} telegram={user.phone} aboutUser={user.aboutMe} />
                      </div>
                    </div>
                    <div>
                    </div>
                    <div className="name" style={{ textAlign: 'center' }}>
                      <div className="description text-center">
                        {/* <p>An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. </p> */}
                      </div>
                      <a href="#pablo" className="btn btn-just-icon btn-link btn-dribbble"><i className="fa fa-dribbble"></i></a>
                      <a href="#pablo" className="btn btn-just-icon btn-link btn-twitter"><i className="fa fa-twitter"></i></a>
                      <a href="#pablo" className="btn btn-just-icon btn-link btn-pinterest"><i className="fa fa-pinterest"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-content tab-space">
                <div className="tab-pane active text-center gallery" id="studio">
                  <div className="row">
                    <div className="col-md-3 ml-auto">
                      <img src="https://images.unsplash.com/photo-1524498250077-390f9e378fc0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83079913579babb9d2c94a5941b2e69d&auto=format&fit=crop&w=751&q=80" className="rounded" />
                      <img src="https://images.unsplash.com/photo-1528249227670-9ba48616014f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=66b8e7db17b83084f16fdeadfc93b95b&auto=format&fit=crop&w=357&q=80" className="rounded" />
                    </div>
                    <div className="col-md-3 mr-auto">
                      <img src="https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=72da2f550f8cbd0ec252ad6fb89c96b2&auto=format&fit=crop&w=334&q=80" className="rounded" />
                      <img src="https://images.unsplash.com/photo-1506667527953-22eca67dd919?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6326214b7ce18d74dde5e88db4a12dd5&auto=format&fit=crop&w=750&q=80" className="rounded" />
                    </div>
                  </div>
                </div>
                <div className="tab-pane text-center gallery" id="works">
                  <div className="row">
                    <div className="col-md-3 ml-auto">
                      <img src="https://images.unsplash.com/photo-1524498250077-390f9e378fc0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=83079913579babb9d2c94a5941b2e69d&auto=format&fit=crop&w=751&q=80" className="rounded" />
                      <img src="https://images.unsplash.com/photo-1506667527953-22eca67dd919?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6326214b7ce18d74dde5e88db4a12dd5&auto=format&fit=crop&w=750&q=80" className="rounded" />
                      <img src="https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec2bdc92a9687b6af5089b335691830e&auto=format&fit=crop&w=750&q=80" className="rounded" />  					</div>
                    <div className="col-md-3 mr-auto">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProfilePage
