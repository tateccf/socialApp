import React from 'react';

const Footer = () => {
  return (
    <footer class="border-top text-center small text-muted py-3">
      <p>
        <a href="/" class="mx-1">
          Home
        </a>
        |
        <a class="mx-1" href="/about-us">
          About Us
        </a>
        |
        <a class="mx-1" href="/terms">
          Terms
        </a>
      </p>
      <p class="m-0">
        Copyright &copy; 2021
        <a href="/" class="text-muted">
          SocialApp
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
