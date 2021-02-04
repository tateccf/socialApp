import React from 'react';

const Container = ({ children, wide, ...restProps }) => {
  return (
    <div
      className={'container py-md-5 ' + (wide ? '' : 'container--narrow')}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Container;
