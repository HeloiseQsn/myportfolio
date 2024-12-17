import './home.scss'
import ProfileImage from '../../components/ProfileImg'
import Title from '../../components/Title'
import Projects from '../../components/Projects'

function Home() {
  return (
    <main className="main-home">
      <ProfileImage />
      <Title />
      <h2 id="projects">Mes projets</h2>
      <Projects />
      <h2 id="about">Qui suis-je ? </h2>
      <div className="about__text">
        <p>
          Je m&apos;appelle Héloïse, j&apos;ai 34 ans et je suis en reconversion
          dans le développement web 😊.{' '}
        </p>
        <p>
          Passionnée de musique, de danse et culture bretonne, j&apos;ai fait
          mes premiers pas dans la vie active en tant que professeure de harpe
          celtique. Expérience qui aura duré un an, le temps de me rendre compte
          qu&apos;à 18 ans, je n&apos;avais pas envie de continuer à travailler
          quand les autres ne travaillent pas , et que j&apos;avais envie de
          découvrir autre chose.{' '}
        </p>
        <p>
          J&apos;ai donc repris une voie un peu plus conventionnelle, en
          intégrant un BTS Assistante de gestion PME/PMI, qui m&apos;a conduit
          vers les Ressources Humaines. Après 3 ans d&apos;alternance dans le
          cadre d&apos;une licence et d&apos;un master RH, j&apos;ai occupé
          pendant 7 ans des postes d&apos;Assistante RH en industries
          agro-alimentaire (coopérative laitière) et de production de cartons.{' '}
        </p>{' '}
        <p>
          Je dois avouer que les dernières années, je m&apos;arrangeais toujours
          pour trouver des petites choses à développer à mon niveau (notamment
          sur Excel) pour faciliter mon quotidien et celui de mon équipe. Je
          dois aussi avouer que je préfèrais les développer que les utiliser 🤫.{' '}
        </p>
        <p>
          Puis je suis devenue maman, une merveilleuse expérience mais bien plus
          difficile que ce que j&apos;avais imaginé. J&apos;ai eu envie de me
          reconcentrer sur l&apos;essentiel et la question de la reconversion a
          été au centre de mes réflexions. J&apos;avais très très envie de
          tenter le développement web. Pour acquérir les premières bases, je me
          suis inscrite à la{' '}
          <a
            href="https://openclassrooms.com/fr/paths/899-developpeur-web?utm_source=google&utm_medium=cpc&utm_campaign=display_google_fr_fr_b2c_prospecting_perf-max-track-developpement_230117_00_adgroup-is-&utm_source=google&utm_medium=cpc&gad_source=1&gclid=CjwKCAiA34S7BhAtEiwACZzv4dRHEparGKGDAoIEFsUnmXbKGEzCVSzvf3FaaCFGQ1ikExIDu4D9LhoCBqoQAvD_BwE"
            target="_blank"
            rel="noopener noreferrer"
          >
            formation Développement web{' '}
          </a>{' '}
          d&apos;OpenClassRoom.{' '}
        </p>
        <p>
          Je souhaite désormais intégrer une formation Bac +3 en contrat de
          professionnalisation sur le bassin Rennais.
        </p>
      </div>

      <h2 id="experiences">Mes expériences</h2>
    </main>
  )
}

export default Home
