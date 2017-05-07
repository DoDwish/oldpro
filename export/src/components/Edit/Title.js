import React, {Component, PropTypes} from 'react';
export default ({title, ...props}) => {
  return (
    <div {...props}>
      <span style={{
        fontSize: 18,
        borderWidth: 2,
        fontWeight: 'bold'
      }}>{title}</span>
    </div>
  );
};