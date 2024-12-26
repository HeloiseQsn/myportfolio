import './contactform.scss'
import { useState } from 'react'
import PropTypes from 'prop-types'
import emailjs from 'emailjs-com'
import logoMail from '../../assets/images/logo/chatmail.svg'

function ContactForm({ closeModal }) {
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
          setTimeout(() => closeModal(), 2000) // Ferme la modale après un délai
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
      {status && <p aria-live="polite">{status}</p>}
    </div>
  )
}

ContactForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default ContactForm
