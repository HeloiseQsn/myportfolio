import './contact.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import emailjs from 'emailjs-com'
import logoMail from '../../assets/images/logo/chatmail.svg'

function Contact() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    society: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Paramètres EmailJS
    emailjs
      .sendForm(
        'service_lp7xxr6',
        'template_lg2s5dt',
        e.target,
        'GGPgronRGkUHO26Jf',
      )
      .then(
        (result) => {
          console.log(result.text)
          setStatus('Message envoyé avec succès!')
          setFormData({ name: '', email: '', society: '', message: '' }) // Réinitialise le formulaire
          setTimeout(() => navigate('/'), 2000) // LIEN VERS L'ACCUUEIL + AJOUTER LIEN DE RETOUR
        },
        (error) => {
          console.log(error.text)
          setStatus('Une erreur est survenue.')
        },
      )
  }

  return (
    <div className="contact-form">
      <h2>Contactez-moi</h2>
      <div className="contact-form__content">
        <img src={logoMail} alt="Logo de l'email" aria-hidden="true" />{' '}
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

          <button type="submit" aria-label="Envoyer votre message">
            Envoyer
          </button>
        </form>
      </div>
      {status && (
        <p role="status" aria-live="polite">
          {status}
        </p>
      )}
    </div>
  )
}

export default Contact
