import './profileImg.scss'
import profileImg from '../../assets/images/profil/profil.webp'

function ProfileImage() {
  return (
    <div className="profile-img__container">
      <img
        src={profileImg}
        alt="Photo de profil de Héloïse Quinson"
        className="profile-img__container--photo"
        aria-label="Photo de profil"
      />
    </div>
  )
}

export default ProfileImage
