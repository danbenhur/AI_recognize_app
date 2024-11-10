import React from 'react';
import styles from '../styles/Header.module.css';
import logo from '../assets/logo.svg';


export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
        <img src={logo} alt="My Store" />
    </div>
  );
};

