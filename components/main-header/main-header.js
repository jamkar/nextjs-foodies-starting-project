import Image from 'next/image';
import Link from 'next/link';

import logoImg from '@/assets/logo.png';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';
import NavLink from './navLink';

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href='/' className={classes.logo}>
          <Image src={logoImg} alt='A plate with food on it' priority />
          NextLevel food
        </Link>
      </header>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink href='/meals'>Browse Meals</NavLink>
          </li>
          <li>
            <NavLink href='/community'>Foodies Community</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MainHeader;
