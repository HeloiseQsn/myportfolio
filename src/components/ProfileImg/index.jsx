import profileImg from '../../assets/images/profil/profil.webp'
import './ProfileImg.scss'

function ProfileImage() {
  return (
    <div className="profile-img__container">
      <img src={profileImg} alt="Profile" className="profile-image" />
    </div>
  )
}

export default ProfileImage
