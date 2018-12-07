import { css } from 'styled-components';

const sizes = {
  desktop: 1200,
  tablet: 992,
  phone: 576,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (literals, ...placeholders) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(literals, ...placeholders)};
    }
  `;

  return acc;
}, {});

export default media;
