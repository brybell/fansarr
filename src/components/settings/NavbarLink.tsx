import { Fansarr } from '../../enums/Stasharr';

const NavbarLink = () => (
  <a
    class="nav-link"
    data-bs-toggle="modal"
    data-bs-target={Fansarr.DOMSelector.SettingsModal}
    href="#"
  >
    Fansarr
  </a>
);

export default NavbarLink;
