
import { Fragment } from "preact";
import { Link } from "wouter-preact";

const Menu = () => {
  return (
    <Fragment>
      <div id="boxMenu" class="box">
        <aside class="menu is-3">
          <p class="menu-label has-text-white">Admin</p>
          <ul class="menu-list">
            <li>
              <Link to={"/"} id="menuButton" class="menu-item has-text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/optimize"} id="menuButton" class="menu-item has-text-white">
                Optimize Photo
              </Link>
            </li>
            <li>
              <Link to={"/convert"} id="menuButton" class="menu-item has-text-white">
                Convert Photo
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </Fragment>
  );
};

export { Menu };