import { Fragment } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import autoAnimate from "@formkit/auto-animate";


const ConvertComponent = () => {

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const parent = useRef(null);
    
    const loadFile = () => {
        window.api.loadConvertImg();
    }

    const getConvertMsg = () => {
        window.api.resConvertImg((_event: any, args: any) => {
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
        setIsError(false);
        setIsSuccess(false);
    }

    useEffect(() => {
        getConvertMsg();
        parent.current && autoAnimate(parent.current);
    }, [parent])

    return (
        <Fragment>
            <section class="hero" id="convertHero">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title has-text-white">Image Converter</h1>
                    </div>
                </div>
            </section>
            {isSuccess ? (
                <section class="section" ref={parent} onClick={resetModal}>
                    <div class="notification is-success">
                        <p>Your image was converted!</p>
                    </div>
                </section>
            ) : (
                null
            )}
            {isError ? (
                <section class="section" ref={parent} onClick={resetModal}>
                    <div class="notification is-danger">
                        <p>There was an error!</p>
                    </div>
                </section>
            ) : (
                null
            )}
            <section class="section">
                    <div class="field">
                        <label class="label has-text-white">Convert an image (jpg/jpeg, png) to WebP</label>
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

export { ConvertComponent };