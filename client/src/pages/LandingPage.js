import nbaPlayers from '../assets/nbaPlayers.jpg'

const LandingPage = () => {
    return (
        <main className='welcomeMain'>
            <h1 id='welcomeLog'> Welcome to "please name me"! </h1>
            <br></br>
            <h2>Please log in / sign up to continue!</h2>
            <br></br>
            <br></br>
            <br></br>

            <img src={nbaPlayers} alt='big name nba players' id='playersPic' />










            <footer id='welcomeFoot'>
            <p>Created by: Hattie Steed, Fabian Barranco, Kelton Sterett, Mckay Memmott</p>
            </footer>
        </main>
    );
}

export default LandingPage;