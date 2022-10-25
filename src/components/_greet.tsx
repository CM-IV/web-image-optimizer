import { Fragment } from "preact";
import { Link } from "wouter-preact";


const Greet = () => {

    const openWebsite = () => {
        window.open("https://home.civdev.xyz", "_blank", "nodeIntegration=no")
    }

    const openGithub = () => {
        window.open("https://github.com/CM-IV/web-image-optimizer", "_blank", "nodeIntegration=no")
    }

    return (
        <Fragment>
            <section class="hero" id="greetHero">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title has-text-white">Web Image Optimizer</h1>
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="box" id="greetBox">
                    <h2 class="subtitle has-text-white">Optimize and convert your JPG/PNG images for the web.</h2>
                    <p class="has-text-white">Converted and optimized images are stored in the Pictures directory.</p>
                    
                    <hr />

                    <p class="has-text-white"><Link to="#" onClick={openWebsite}> CM-IV</Link></p>
                    <p class="has-text-white"><Link to="#" onClick={openGithub}>GitHub Source</Link></p>
                </div>
            </section>
        </Fragment>
    )
}


export { Greet };