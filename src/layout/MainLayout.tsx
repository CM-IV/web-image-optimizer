import { ComponentChildren } from "preact";
import { Menu } from "@/components/_menu";

type LayoutProps = {
    children: ComponentChildren
}

const MainLayout = ({children}: LayoutProps) => {
    return (
        <section class="section">
            <div className="columns">
                <div class="column is-3">
                    <Menu />
                </div>
                <div id="viewport" class="column is-9">
                    {children}
                </div>
            </div>
        </section>
    )
}


export { MainLayout };