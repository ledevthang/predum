import React from 'react';
import { Helmet } from 'react-helmet-async';

interface IProps {
  title?: string;
  image?: string;
}
const HeaderMeta = ({ title, image }: IProps) => {
  return (
    <Helmet>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default HeaderMeta;
