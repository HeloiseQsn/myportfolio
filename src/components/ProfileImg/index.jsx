import './profileImg.scss'
import profileImg from '../../assets/images/profil/profil.jpg'

function ProfileImage() {
  return (
    <div className="profile-img__container">
      <img
        src={profileImg}
        alt="Photo de profil de Héloïse Quinson"
        className="profile-img__container--photo"
      />
    </div>
  )
}

export default ProfileImage
