// react imports
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

//components
import AboutCard, { AboutCardContent } from '../../components/AboutCard/AboutCard'
import AnimatedTitle from '../../components/AnimatedTitle/AnimatedTitle'
import IntersectionContainer from '../../components/IntersectionContainer/IntersectionContainer'

//images and styles imports
import { techImages, hobbiesImages } from '../../helpers/exports/AboutExports'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'


const About = () => {
	const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	const location = useLocation()
	const refContainer = useRef<HTMLDivElement>(null)
	const [sectionState, setSectionState] = useState(false)

	useEffect(() => {
		showContent()
	}, [])

	useEffect(() => {
		if (nav) {
			if (nav.to != location.pathname) {
				hideContent()
			}
		}
	}, [nav])

	const showContent = () => {
		setSectionState(true)
	}

	const hideContent = () => {
		setSectionState(false)
	}

	const cards: Array<AboutCardContent> = [
		{
			main: '+4',
			middle: 'años de',
			bottom: 'EXPERIENCIA',
		},
		{
			main: '3',
			middle: 'proyectos con',
			bottom: 'EMPRESAS',
		},
		{
			main: 'Y',
			middle: 'muchas',
			bottom: 'PRUEBAS',
		},
	]

	// const refImgContainer = useRef<HTMLDivElement>(null)
	// const refEducationContainer = useRef<HTMLDivElement>(null)
	// const refHobbiesContainer = useRef<HTMLDivElement>(null)

	// const appearElements = () => {
	//     let aboutElements = document.getElementsByClassName('appear')

	//     for (let i = 0; i < aboutElements.length; i++) {
	//         const element = aboutElements[i] as HTMLElement;
	//         element.style.opacity = '1'
	//     }
	// }

	// const hideElements = () => {
	//     let aboutElements = document.getElementsByClassName('appear')

	//     for (let i = 0; i < aboutElements.length; i++) {
	//         const element = aboutElements[i] as HTMLElement;
	//         element.style.opacity = '0'
	//     }
	// }

	// useLayoutEffect(() => {
	//     setTimeout(() => {
	//         appearElements()
	//     }, 500);
	// }, [])

	// xMovement for Elements based on scroll event
	// useEffect(() => {
	//     const moveImgList = (e: Event) => {
	//         refImgContainer.current ? refImgContainer.current.style.transform = `translateX(${150 - (window.scrollY / 4)}px)` : console.error('ref img container not exists')
	//         refEducationContainer.current ? refEducationContainer.current.style.transform = `translateX(${-500 + (window.scrollY / 4)}px)` : console.error('ref education container not exists')
	//         refHobbiesContainer.current ? refHobbiesContainer.current.style.transform = `translateX(${750 - (window.scrollY / 4)}px)` : console.error('ref education container not exists')
	//     }

	//     window.addEventListener('scroll', moveImgList)

	//     return () => {
	//         window.removeEventListener('scroll', moveImgList)
	//     }
	// }, [])

	return (
		<CSSTransition
			in={sectionState}
			nodeRef={refContainer}
			timeout={350}
			classNames="page-about"
			mountOnEnter
			unmountOnExit
			onExited={() => setReadyToNavigate(true)}
		>
			<div ref={refContainer} className="a">
				<header id="about">
					<h1 className="main-title">Sobre mi</h1>
					<p className="bottom-title">Lo que he hecho, hago y seguiré haciendo</p>

					<p className="about-description">
						Mi nombre es <span className="accent">Guillermo Cruz</span>, desarrollador
						FRONTEND desde hace más de 4 años, he desarrollado distintas habilidades que
						me permiten construir sitios web atractivos, siempre con la ayuda de
						tecnologías modernas, generando un flujo de trabajo óptimo y una base de
						código apegada a los estándares que exige la industria.
					</p>

					<div className="cards-container">
						{cards.map((cardContent: AboutCardContent) => {
							return (
								<AboutCard
									main={cardContent.main}
									middle={cardContent.middle}
									bottom={cardContent.bottom}
									key={cardContent.main}
								/>
							)
						})}
					</div>

					<div className="scroll">
						<p>scroll</p>
						<span id="scroll-line"></span>
					</div>
				</header>

				<main>
					<section id="experiecia" className="split-big-title">
						<div className="big-title">
							<AnimatedTitle
								items={['EXPERI', 'ENCIA']}
								alignment="left"
								textClass="titles"
							/>
							<p className="desc-title left">📝Una breve explicación</p>
						</div>

						<div className="description-container">
							<IntersectionContainer
								from={{
									opacity: '0',
									transform: 'translateY(40px)',
								}}
								to={{
									opacity: '1',
									transform: 'translateY(0px)',
								}}
								transitionTime={1000}
							>
								<div>
									<p className="right">
										Aproximadamente <span className="accent">hace 4 años</span>{' '}
										comencé con el desarrollo web, impulsado principalmente por
										resolver las necesidades de una empresa enfocada en la venta
										de agroinsumos, desarrollé su landing page y descubrí lo
										interesante y entretenido que resultaba el{' '}
										<span className="accent">frontend</span>
										.<br />
										<br />A día de hoy he mejorado mi flujo de trabajo mediante
										la adopción de distintas herramientas y lenguajes, por
										ejemplo, css se ha covertido en{' '}
										<span className="accent">SCSS</span>, JavaScript en{' '}
										<span className="accent">TypeScript</span> y el insulso
										LiveServer en <span className="accent">ViteJS</span>, además
										he conocido el poder de bibliotecas como{' '}
										<span className="accent">React</span>,{' '}
										<span className="accent">Vue</span> y{' '}
										<span className="accent">Svelte</span>, que no me atrevería
										a mencionar que las domino, sin embargo las he adoptado
										progresivamente en escenarios donde el posicionamiento no es
										un problema y vaya que generan un cambio en el flujo de
										trabajo. Probablemente mi siguiente meta sea la adopción de
										frameworks ssr como <span className="accent">NextJS</span> o{' '}
										<span className="accent">NuxtJS</span>
									</p>
								</div>
							</IntersectionContainer>
						</div>
					</section>

					<section className="years">
						<div className="tech-images">
							{techImages.map((img) => (
								<img src={img} alt="" key={img} />
							))}
						</div>
					</section>

					<section className="split-big-title reverse-row">
						<div className="big-title">
							<AnimatedTitle
								items={['EDUCA', 'CIÓN']}
								alignment="right"
								textClass="titles"
							/>
							<p className="desc-title right">¿Aprendí algo en la universidad?📜</p>
						</div>

						<div className="description-container">
							<IntersectionContainer
								from={{
									opacity: '0',
									transform: 'translateY(40px)',
								}}
								to={{
									opacity: '1',
									transform: 'translateY(0px)',
								}}
								transitionTime={1000}
							>
								<div>
									<p className="left">
										Quizá este sea el tema menos alentador en este portafolio.
										Comencé mis estudios universitarios como casi todos lo
										hacen, con grandes aspiraciones y metas, si embargo una gran
										cantidad de factores influyeron en mi deserción.
										<br />
										<br />
										Comencé mis estudios universitarios en la{' '}
										<span className="accent">
											Universidad Autónoma Chapingo
										</span>
										, me apunté a la{' '}
										<span className="accent">
											primer generación de ingenieros mecatrónicos
											especializados en la rama agronómica
										</span>
										, es aqui donde reforcé mi gusto por la programación con
										lenguajes como <span className="accent">C</span>,{' '}
										<span className="accent">C++</span>,{' '}
										<span className="accent">C#</span> y{' '}
										<span className="accent">Java</span>, las clases de métodos
										numéricos pasaban como agua entre mis manos y mis compañeros
										y yo creábamos mancuernas de excelencia.
										<br />
										<br />
										Ante la llegada del <span className="accent">
											COVID-19
										</span>{' '}
										y las clases en línea muchas aspiraciones y deseos tuvieron
										que verse truncados, pues la nueva realidad no contribuía ni
										un poco a su realización, así decidí embarcarme en lo que
										sería un nuevo yo, enfocado en el{' '}
										<span className="accent">desarrollo web</span>.
									</p>
								</div>
							</IntersectionContainer>
						</div>
					</section>

					<section className="years">
						<div>
							<p>INGENIERÍA MECATRÓNICA AGRÍCOLA</p>
						</div>
					</section>

					<section id="experiecia" className="split-big-title">
						<div className="big-title">
							<AnimatedTitle
								items={['HOB', 'BIES']}
								alignment="left"
								textClass="titles"
							/>
							<p className="desc-title left">🎧¿qué hago sino estoy programando?</p>
						</div>

						<div className="description-container">
							<IntersectionContainer
								from={{
									opacity: '0',
									transform: 'translateY(40px)',
								}}
								to={{
									opacity: '1',
									transform: 'translateY(0px)',
								}}
								transitionTime={1000}
							>
								<div>
									<p className="right">
										A lo largo de mi corta vida he desarrollado varios hobbies.
										Por ejemplo, me he enganchado a la{' '}
										<span className="accent">acuariofilia</span> especialmente
										el aquascaping, paisajismo en acuarios de agua dulce, he
										jugado <span className="accent">videojuegos</span> una
										cantidad de horas bastante considerable, he doblado papel
										por días enteros (<span className="accent">Origami</span>) y
										sin embargo, siempre hay un factor en común, la{' '}
										<span className="accent">música</span>. Quizá resulte
										gracioso, pero me autodenominaría como{' '}
										<span className="accent">melómano</span>, me encanta
										investigar, leer y adentrarme en el mundo de la música, la
										gente que la crea e interpreta. Podría pasar horas hablando
										de las bandas que me gustan, de su historia y de los
										mensajes que vierten en sus líricas.
									</p>
								</div>
							</IntersectionContainer>
						</div>
					</section>

					<section className="years">
						<div className="hobbies">
							{hobbiesImages.map((img) => (
								<img src={img} alt="" key={img} className="hobbies-img" />
							))}
						</div>
					</section>
				</main>
			</div>
		</CSSTransition>
	)
}

export default About
