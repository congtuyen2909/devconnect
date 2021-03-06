import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../redux/actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'> Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience
            experience={profile.experience ? profile.experience : []}
          />
          <Education education={profile.education ? profile.education : []} />
        </>
      ) : (
        <>
          <p>You have not yer setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStatetoProps, { getCurrentProfile })(Dashboard);
