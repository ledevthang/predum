import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'style.css';

const FooterLanding = () => {
  const history = useHistory();
  const onRedirectTo = useCallback(
    (path: any) => {
      if (history.location.pathname != path) {
        history.push(path);
        window.scrollTo(0, 0);
      }
    },
    [history],
  );
  const html = `<footer>
  <div class="text-center mb-3">
    <a class="d-inline-block text-decoration-none px-2" href="https://twitter.com/predum__io">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="17.5" stroke="#ABABAB" />
        <path
          d="M17.7881 15.1922L17.8199 15.7112L17.29 15.6477C15.3613 15.404 13.6763 14.5778 12.2456 13.1902L11.5462 12.5017L11.3661 13.0101C10.9846 14.1435 11.2283 15.3405 12.0231 16.1455C12.447 16.5904 12.3516 16.654 11.6204 16.3891C11.3661 16.3044 11.1435 16.2408 11.1223 16.2726C11.0481 16.3468 11.3025 17.3107 11.5038 17.692C11.7794 18.2217 12.341 18.7407 12.9557 19.0479L13.475 19.2915L12.8603 19.3021C12.2668 19.3021 12.2456 19.3127 12.3092 19.5351C12.5212 20.2236 13.3584 20.9545 14.291 21.2723L14.948 21.4947L14.3757 21.8337C13.5279 22.321 12.5318 22.5964 11.5356 22.6175C11.0587 22.6281 10.6666 22.6705 10.6666 22.7023C10.6666 22.8082 11.9595 23.4014 12.7119 23.6344C14.9692 24.3229 17.6504 24.0264 19.6639 22.8506C21.0945 22.0138 22.5252 20.3507 23.1928 18.7407C23.5532 17.8827 23.9135 16.315 23.9135 15.5629C23.9135 15.0757 23.9453 15.0121 24.5387 14.4295C24.8884 14.0906 25.217 13.7198 25.2805 13.6139C25.3865 13.4126 25.3759 13.4126 24.8355 13.5927C23.9347 13.9105 23.8075 13.8681 24.2526 13.3915C24.5811 13.0525 24.9732 12.4381 24.9732 12.2581C24.9732 12.2263 24.8143 12.2792 24.6341 12.3746C24.4433 12.4805 24.0194 12.6394 23.7015 12.7347L23.1293 12.9148L22.61 12.5652C22.3238 12.3746 21.9211 12.1627 21.7092 12.0992C21.1687 11.9509 20.3421 11.9721 19.8546 12.1415C18.53 12.6182 17.6928 13.8469 17.7881 15.1922Z"
          fill="#ABABAB" />
      </svg>
    </a>
    <a class="d-inline-block text-decoration-none px-2" href="https://t.me/predum_community">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="17.5" stroke="#ABABAB" />
        <path
          d="M10.9257 17.4564L14.3052 18.7177L15.6133 22.9245C15.697 23.1939 16.0264 23.2935 16.2451 23.1147L18.1289 21.579C18.3263 21.4181 18.6076 21.4101 18.814 21.5599L22.2116 24.0267C22.4456 24.1967 22.777 24.0685 22.8357 23.7858L25.3247 11.8134C25.3887 11.5046 25.0853 11.247 24.7913 11.3607L10.9217 16.7112C10.5795 16.8432 10.5824 17.3278 10.9257 17.4564ZM15.4024 18.0463L22.0072 13.9784C22.1259 13.9055 22.2481 14.066 22.1461 14.1605L16.6953 19.2274C16.5037 19.4057 16.3801 19.6444 16.3451 19.9035L16.1594 21.2795C16.1348 21.4632 15.8767 21.4815 15.826 21.3037L15.1119 18.7944C15.0301 18.5082 15.1493 18.2025 15.4024 18.0463Z"
          fill="#ABABAB" />
      </svg>
    </a>
  </div>
  <ul class="nav navbar-nav nav-no-opacity flex-row justify-content-center">
    <li class="nav-item">
      <a class="nav-link text-uppercase px-4" href="https://docs.predum.io/predum/predum-platform/introduction">Whitepaper</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-uppercase px-4" href="/privacy">Privacy Policy</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-uppercase px-4" href="/disclaimer">Disclaimer</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-uppercase px-4" href="/term">Term of use</a>
    </li>
  </ul>
  <hr class="mb-2 mb-md-4" />
  <div class="text-center">
    <img class="mb-2" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/icons/danger.svg" alt="danger" />
    <p class="mb-4 disclaimer">
      All visitors must confirm the wagering and/or gambling regulations that are applicable in their local
      jurisdiction (as gambling laws may vary in different states, countries and provinces).
      <br />
      Predum does not promote or endorse any form of wagering or gambling to users under the age of 18.
    </p>
  </div>
</footer>`;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        padding: '0px 10px',
      }}
    />
  );
};
export default FooterLanding;
