import React, { useEffect } from 'react';
import Container from './Container';

const Page = ({ children, title, wide, ...restProps }) => {
  // Change page title and scroll to top on the first render

  useEffect(() => {
    document.title = `${title} | SocialApp`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <Container wide={wide} {...restProps}>
      {children}
    </Container>
  );
};

export default Page;
