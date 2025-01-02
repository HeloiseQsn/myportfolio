import './contactform.scss'
import { useState } from 'react'
import PropTypes from 'prop-types'
import emailjs from 'emailjs-com'
import logoMail from '../../assets/images/logo/chatmail.svg'

function ContactForm({ closeModal }) {
  // Déclaration d'un état pour garder la trace des données du formulaire, par défaut tout est vide
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    society: '',
    message: '',
  })
  // Déclaration d'un état pour garder la trace du statut du formulaire (succès ou erreur)
  const [status, setStatus] = useState('')

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target // Extraction du nom et de la valeur du champ modifié
    // Mise à jour des données du formulaire avec la nouvelle valeur
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Empêche le comportement par défaut du formulaire (rechargement de la page)

    // Utilisation de EmailJS pour envoyer le formulaire
    emailjs
      .sendForm(
        'service_lp7xxr6', // Identifiant du service EmailJS
        'template_lg2s5dt', // Identifiant du modèle EmailJS
        e.target,
        'GGPgronRGkUHO26Jf', // Clé publique utilisateur EmailJS
      )
      .then(
        (result) => {
          console.log(result.text) // Affiche le texte du résultat de l'envoi
          setStatus('Message envoyé avec succès!') // Met à jour le statut en cas de succès
          setFormData({ name: '', email: '', society: '', message: '' }) // Réinitialise le formulaire
          setTimeout(() => closeModal(), 2000) // Ferme la modale après un délai de 2 secondes
        },
        (error) => {
          console.log(error.text) // Affiche le texte de l'erreur
          setStatus('Une erreur est survenue.') // Met à jour le statut en cas d'erreur
        },
      )
  }

  // Rendu du composant ContactForm
  return (
    <div className="contact-form">
      <h2>Contactez-moi</h2>
      <div className="contact-form__content">
        <img src={logoMail} alt="Logo Email" />
        <form onSubmit={handleSubmit} aria-labelledby="formTitle">
          <div className="contact-form__content--labelinput">
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-describedby="nameDesc"
            />
          </div>
          <div className="contact-form__content--labelinput">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-describedby="emailDesc"
            />
          </div>
          <div className="contact-form__content--labelinput">
            <label htmlFor="society">Entreprise :</label>
            <input
              type="text"
              id="society"
              name="society"
              value={formData.society}
              onChange={handleChange}
              required
              aria-describedby="societyDesc"
            />
          </div>
          <div className="contact-form__content--labelinput">
            <label htmlFor="message">Message :</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-describedby="messageDesc"
            />
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </div>
      {status && <p aria-live="polite">{status}</p>}{' '}
      {/* Affichage du statut si disponible */}
    </div>
  )
}

// Définition des propTypes pour valider les props du composant
ContactForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default ContactForm // Exportation du composant pour l'utiliser dans d'autres fichiers
