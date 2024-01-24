import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'style.css';

const Audit = () => {
  const html = ` 
  <main>
    <section class="first-section container mb-md-custom-xxl">
      <div class="row mb-md-custom-xxl">
        <div class="col-12 col-md-6 mb-4 mb-md-0">
          <h2 class="mb-4">Predum Contract</h2>
          <p class="mb-custom-xxxl text-gray">
            Smart contract security auditing is a thorough analysis of a blockchain applications’ smart contracts in
            order to correct design issues, errors in the code, or security vulnerabilities. Predum is InterFi-audited.
            Here is what InterFi had to say about us.
          </p>
          <h2 class="mb-4">InterFi Predum Audit: <span class="text-gray">Security Audit Report</span></h2>
          <ul class="audit-list">
            <li>
              <div class="label">Auditing Firm</div>
              <div class="value">InterFi Network</div>
            </li>
            <li>
              <div class="label">Architecture</div>
              <div class="value">InterFi “Echelon” Auditing Standark</div>
            </li>
            <li>
              <div class="label">Smart Contract Audit Approved By</div>
              <div class="value">Chis | Marketing Specialist at InterFi Network</div>
            </li>
            <li>
              <div class="label">Project Overview Approved By</div>
              <div class="value">Albert | Marketing Specialist at InterFi Network</div>
            </li>
            <li>
              <div class="label">Platform</div>
              <div class="value">Solidity</div>
            </li>
            <li>
              <div class="label">Mandatory Audit Check</div>
              <div class="value">Static, Software, Auto Intelligent & Manual Analysis</div>
            </li>
            <li>
              <div class="label">Consultation Request Date</div>
              <div class="value">November 14, 2021</div>
            </li>
            <li>
              <div class="label">Report Date</div>
              <div class="value">November 20, 2021</div>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-6 mb-4 mb-md-0">
          <div class="d-flex justify-content-md-end">
            <img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/audit-1.svg" alt="home item right" />
          </div>
        </div>
      </div>
      <div class="row flex-column-reverse flex-md-row">
        <div class="col-12 col-md-6 mb-4 mb-md-0">
          <div class="d-flex justify-content-md-start mb-custom-xxxl">
            <img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/audit-2.svg" alt="home item right" />
          </div>
        </div>
        <div class="col-12 col-md-6 mb-4 mb-md-0">
          <h2 class="mb-4">Audit Summary</h2>
          <p class="text-gray">
            InterFi team has performed a line-by-line manual analysis and automated review of the smart contract.
            The smart contract was analyzed mainly for common smart contract vulnerabilities, exploits, and
            manipulation hacks. According to the smart contract audit:
          </p>
          <ul class="audit-list-2">
            <li>Predum's smart contract source code has LOW RISK SEVERITY</li>
            <li>Predum's has PASSED the smart contract audit</li>
          </ul>
        </div>
      </div>
    </section>
  </main>
  `;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Audit;
