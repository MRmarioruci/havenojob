import { useRef } from 'react';
import './scss/main.scss'
import JobMatcher from './components/JobMatcher';
import ProfileSummarizer from './components/ProfileSummarizer';
import JobSummarizer from './components/JobSummarizer';
import CoverLetter from './components/CoverLetter';
import Preregister from './components/Preregister';
import Footer from './components/Footer';
import poggoImg from './images/poggo.png'
import logo from './images/logo.png'
import Dropdown from './utils/Dropdown';

function App() {
	const home = useRef(null)
	const preregister = useRef(null)
	const profile = useRef(null)
	const jobMatcher = useRef(null)
	const jobSummary = useRef(null)
	const coverLetter = useRef(null)
	const scrollTo = (where) => {
		switch (where) {
			case 'profile':
				if (profile.current) profile.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
				break;
			case 'jobMatcher':
				if (jobMatcher.current) jobMatcher.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
				break;
			case 'jobSummary':
				if (jobSummary.current) jobSummary.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
				break;
			case 'preregister':
				if (preregister.current) preregister.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
				break;
			case 'home':
				if (home.current) home.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
				break;
			case 'coverLetter':
				if (coverLetter.current) coverLetter.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
				break;
			default:
				break;
		}
	}
	return (
		<div className="page">
			<div className="page__header">
				<div className='page__header-menu'>
					<img src={logo} width="350" onClick={() => scrollTo('home')} alt="logo" className="pointer logo" />
					<div className="float--right">
						<Dropdown isRight={true}>
							<div className="btn btn__light menu__mob dropdown-trigger">
								<span className="material-icons">menu</span>
							</div>
							<div className="dropdown__menu">
								<div className="dropdown__content">
									<a className="dropdown__item" onClick={() => scrollTo('profile')}>
										Profile Summarizer
									</a>
									<a className="dropdown__item" onClick={() => scrollTo('jobSummary')}>
										Job Summarizer
									</a>
									<a className="dropdown__item" onClick={() => scrollTo('jobMatcher')}>
										Job Matcher
									</a>
									<a className="dropdown__item" onClick={() => scrollTo('coverLetter')}>
										Cover Letter
									</a>
									<a className="dropdown__item" onClick={() => scrollTo('preregister')}>
										<span className="material-icons">how_to_reg</span>&nbsp;
										<span className="mtop--5">Preregister</span>
									</a>
								</div>
							</div>
						</Dropdown>
						<div className="flex flex__row menu__desk">
							<a className="btn btn__transparent" onClick={() => scrollTo('profile')}>
								Profile Summarizer
							</a>
							<a className="btn btn__transparent" onClick={() => scrollTo('jobSummary')}>
								Job Summarizer
							</a>
							<a className="btn btn__transparent" onClick={() => scrollTo('jobMatcher')}>
								Job Matcher
							</a>
							<a className="btn btn__transparent" onClick={() => scrollTo('coverLetter')}>
								Cover letter
							</a>
							<a className="btn btn__inverted-outline btn-md btn__rounded page__header-menuItem" onClick={() => scrollTo('preregister')}>
								<span className="material-icons">how_to_reg</span>&nbsp;
								<span className="mtop--5">Preregister</span>
							</a>
						</div>
					</div>						
				</div>
			</div>
			<div className="page__main" ref={home}>
				<div className="page__main-section">
					<div className="page__main-text">
						<h1 className="page__main-textHeader">
							The job market made
							<span className="text__gradient mleft--10">easy.</span>
						</h1>
						<div className="font__20 mtop--20 text__semi-muted page__main-subtextHeader">
							A list of <b>AI</b> generative tools for helping both candidates and recruiters.
							<br />
							<small>(Yes we said the magic word, AI, AI, AI....).</small>
							<br />
							Our goal is to make the job search as effortless and quick as we can.
							Take a look at our existing features. More to come...
						</div>
						<div className="mtop--20" onClick={() => scrollTo('profile')}>
							<div class="btn btn__primary-outline btn-md btn__rounded page__header-menuItem" style={{position: 'relative', overflow: 'hidden', width: '150px', 'height': '45px'}}>
								<span class="button__animation"></span>
								<span class="button__animation-text">
									<span className="material-icons">arrow_downward</span>&nbsp;
									Try it out
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="page__main-section">
					<div className="page__main-sectionRight">
						<div className="inner">
							<div className="page__main-sectionRightTitle">P.S. The closest thing we could find to Yoda 😂</div>
							<img src={poggoImg} width="350"></img>
						</div>
					</div>
				</div>
			</div>
			<div ref={profile}>
				<ProfileSummarizer />
			</div>
			<div ref={jobMatcher}>
				<JobMatcher />
			</div>
			<div ref={jobSummary}>
				<JobSummarizer />
			</div>
			<div ref={coverLetter}>
				<CoverLetter />
			</div>
			<div ref={preregister}>
				<Preregister />
			</div>
			<Footer />
		</div>
	);
}

export default App;
