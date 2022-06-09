import React from 'react';
import Link from 'next/link';

import classes from './main-header.module.css';

export const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Book Event</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
