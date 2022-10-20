import { Fragment } from "preact";
import { Link } from "wouter-preact";

const Nav = () => {
  return (
    <Fragment>
      <div id="boxMenu" class="box">
        <aside class="menu is-3">
          <ul class="menu-list">
            <li>
              <Link to={"/"} id="menuButton" class="menu-item has-text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/test-page"} id="menuButton" class="menu-item has-text-white">
                Test
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </Fragment>
  );
};

export { Nav };