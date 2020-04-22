import React from 'react';

export default function TableHeader(props) {
  const {headerItems} = props;

  return (
    <thead>
      <tr>
        {headerItems.map((headerItem, index) => (
            <th key={index}>{headerItem}</th>
          ))}
      </tr>
    </thead>
  );
}