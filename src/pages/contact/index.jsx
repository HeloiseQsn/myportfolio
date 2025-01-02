import './contact.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from 'emailjs-com'
import logoMail from '../../assets/images/logo/chatmail.svg'

function Contact() {
  // Utilisation du hook useNavigate pour la redirection après l'envoi du formulaire
  const navigate = useNavigate()

  // Initialisation des états pour gérer les données du formulaire, le statut de l'envoi et l'état de soumission
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    society: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()

    // Indication de l'état de soumission en cours
    setIsSubmitting(true)
    setStatus('Envoi du message en cours...')

    // Envoi du formulaire via EmailJS
    emailjs
      .sendForm(
        'service_lp7xxr6', // Identifiant du service EmailJS
        'template_lg2s5dt', // Identifiant du template EmailJS
        e.target, // Formulaire cible
        'GGPgronRGkUHO26Jf', // Clé publique EmailJS
      )
      .then(
        (result) => {
          // Succès de l'envoi
          console.log(result.text)
          setStatus('Message envoyé avec succès!')
          setFormData({ name: '', email: '', society: '', message: '' }) // Réinitialisation du formulaire
          setTimeout(() => navigate('/'), 2000) // Redirection vers l'accueil après 2 secondes
        },
        (error) => {
          // Échec de l'envoi
          console.log(error.text)
          setStatus('Une erreur est survenue. Veuillez réessayer.')
        },
      )
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="contact-form">
      <h2>Contactez-moi</h2>
      <div className="contact-form__content">
        <img src={logoMail} alt="Logo de l'email" aria-hidden="true" />
        <form onSubmit={handleSubmit}>
          <div className="contact-form__content--labelinput">
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-label="Entrez votre nom"
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
              aria-label="Entrez votre email"
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
              aria-label="Entrez le nom de votre entreprise"
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
              aria-label="Entrez votre message"
            />
          </div>

          <button
            type="submit"
            aria-label="Envoyer votre message"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>
      </div>
      {status && (
        <p role="status" aria-live="polite" aria-atomic="true">
          {status}
        </p>
      )}
    </div>
  )
}

export default Contact
