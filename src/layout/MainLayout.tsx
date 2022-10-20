import { Nav } from "@/components/nav";
import { ComponentChildren } from "preact";

type LayoutProps = {
    children: ComponentChildren
}

const MainLayout = ({children}: LayoutProps) => {
    return (
        <section class="section">
            <div className="columns">
                <div id="viewport" class="column is-9">
                    <Nav />
                    {children}
                </div>
            </div>
        </section>
    )
}


export { MainLayout };