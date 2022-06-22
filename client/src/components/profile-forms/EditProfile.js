import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../redux/actions/profile';

const EditProfile = ({
  profile: { loading, profile },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    githubusername: '',
    youtube: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  });
  const [displaySocialNetwork, setDisplaySocialNetwork] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    facebook,
    twitter,
    linkedin,
    instagram,
  } = formData;

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(', '),
      bio: loading || !profile.bio ? '' : profile.bio,
      githubusername:
        loading || !profile.social.githubusername
          ? ''
          : profile.social.githubusername,
      youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
      facebook:
        loading || !profile.social.facebook ? '' : profile.social.facebook,
      twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
      linkedin:
        loading || !profile.social.linkedin ? '' : profile.social.linkedin,
      instagram:
        loading || !profile.social.instagram ? '' : profile.social.instagram,
    });
  }, [loading]);

  const handleChangeValueInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
    console.log({ profile });
  };

  return (
    <>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmitProfile}>
        <div className='form-group'>
          <select
            name='status'
            value={status}
            onChange={handleChangeValueInput}
          >
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            value={company}
            onChange={handleChangeValueInput}
            placeholder='Company'
            name='company'
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            value={website}
            onChange={handleChangeValueInput}
            placeholder='Website'
            name='website'
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            value={location}
            onChange={handleChangeValueInput}
            placeholder='Location'
            name='location'
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            value={skills}
            onChange={handleChangeValueInput}
            placeholder='* Skills'
            name='skills'
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            value={githubusername}
            onChange={handleChangeValueInput}
            type='text'
            placeholder='Github Username'
            name='githubusername'
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            value={bio}
            onChange={handleChangeValueInput}
            placeholder='A short bio of yourself'
            name='bio'
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            type='button'
            onClick={() => {
              setDisplaySocialNetwork(!displaySocialNetwork);
            }}
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialNetwork && (
          <>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                value={twitter}
                onChange={handleChangeValueInput}
                placeholder='Twitter URL'
                name='twitter'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                value={facebook}
                onChange={handleChangeValueInput}
                placeholder='Facebook URL'
                name='facebook'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                value={youtube}
                onChange={handleChangeValueInput}
                placeholder='YouTube URL'
                name='youtube'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                value={linkedin}
                onChange={handleChangeValueInput}
                placeholder='Linkedin URL'
                name='linkedin'
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                value={instagram}
                onChange={handleChangeValueInput}
                placeholder='Instagram URL'
                name='instagram'
              />
            </div>
          </>
        )}
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
