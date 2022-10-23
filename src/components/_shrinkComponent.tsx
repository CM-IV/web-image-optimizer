
import autoAnimate from "@formkit/auto-animate";
import { Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";


const ShrinkComponent = () => {

    const [imageQuality, setImageQuality] = useState<number>(100);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const parent = useRef(null);

    const loadFile = () => {
        window.api.loadShrinkImg(imageQuality);
    }

    const getShrinkMsg = () => {
        window.api.resShrinkImg((_event: any, args: any) => {
            if (args == "Error!") {
                setIsError(true);
                setIsSuccess(false);
            } else {
                setIsError(false);
                setIsSuccess(true);
            }
        })
    }

    const resetModal = () => {
        setIsSuccess(false);
        setIsError(false);
    }

    useEffect(() => {
        getShrinkMsg();
        parent.current && autoAnimate(parent.current);
    }, [parent])

    return (
        <Fragment>
            <section class="hero" id="shrinkHero">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title has-text-white">Image Shrinker</h1>
                    </div>
                </div>
            </section>
            {isSuccess ? (
                <section class="section" ref={parent} onClick={resetModal}>
                    <div class="notification is-success">
                        <p>Your image was optimized!</p>
                    </div>
                </section>
            ) : (
                null
            )}
            {isError ? (
                <section class="section" ref={parent} onClick={resetModal}>
                    <div class="notification is-danger">
                        <p>There was an error!  Make sure you use JPG/PNG images.</p>
                    </div>
                </section>
            ) : (
                null
            )}
            <section class="section">
                <div class="field">
                    <label class="label has-text-white">Select a png/jpg image to optimize</label>
                </div>
                <div class="field">
                    <label class="label has-text-white">Image Quality</label>
                    <div class="select">
                        <select onChange={(e) => setImageQuality(Number(e.currentTarget.value))}>
                            <option value={100}>100%</option>
                            <option value={90}>90%</option>
                            <option value={70}>70%</option>
                            <option value={50}>50%</option>
                            <option value={30}>30%</option>
                        </select>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button is-link" onClick={loadFile}>Pick a PNG/JPG</button>
                    </div>
                </div>
            </section>
    </Fragment>
    )
}

export { ShrinkComponent };