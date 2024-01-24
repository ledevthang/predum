import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'style.css';

const Disclaimer = () => {
  const html = ` 
  <main>
  <section class="container first-section mb-custom-xxl">
    <div class="row">
      <div class="col-12 col-md-8">
        <h2>Disclaimer</h2>
        <p class="text-gray">
          The following “Disclaimer” for platform Predum.io, together with our Terms of Use, and the Privacy Policy collectively apply to your use of the platform and its  content, programs, services, and services it provides. This Disclaimer is accessible to all users via an obvious and unambiguous link in the footer of each and every page of this platform and, therefore, incorporates them all.<br/>
          Any access or use of this platform constitutes a collective and aggregate Acceptance of this Disclaimer, the Terms of Use, and the Privacy Policy. Jointly, these three instruments provide the basis for a mutual Agreement between the user and this platform setting forth the rules for administering the rights and responsibilities for either party. Any and all access to and use of our platform is at the user’s sole discretion, option, and risk.<br/>
          All content, materials, programs, services, and software contained on or made available by this platform are for entertainment, educational, and informational purposes only. Any use of the foregoing in violation of local, state, federal, provincial, or national law is strictly prohibited. We do not warrant the legality of any particular gambling or predicting activities in any user’s specific location. Laws and regulations change continually worldwide, and it is the visitor’s responsibility to ensure that any gambling or predicting actions or behaviors they undertake are legal in their relevant jurisdiction.<br/>
          Predum.io is not a gambling or predicting operator and functions independently from any online gambling or predicting operator’s control. This platform itself does not directly offer or provide real money (fiat) gambling or predicting services of any kind.
          <br/>
          This platform makes every effort to ensure that all published content is accurate at the time of publication but does not explicitly or implicitly guarantee the completeness, correctness, timeliness, or perpetuation of the subject matter provided, nor that any errors or omissions will be corrected, deleted, or otherwise made fit for their purpose. Circumstances change, and this platform has no control over any other sites or sources to which it externally links. In that regard, all information provided herein should be considered as researched opinion rather than demonstrated fact or formal endorsement.<br/>
          Any advice provided on this platform should not be considered as legal or professional advice in any way. Predum.io, its affiliates, and/or licensors hereby disclaim any conditions, representations, and warranties, express or implied, of accuracy, suitability, quality, fitness for a particular purpose, merchantability, non-infringement, and/or non-interference as regards its content, materials, programs, services, and software.<br/>
          It is the user’s responsibility to ensure that they meet all age and other regulatory requirements prior to connecting his/her crypto wallet to the platform. Predum.io, its affiliates, and/or its licensors, shall not be held liable to users or any third party in contract, tort, negligence, or otherwise, for any monetary or other losses or damages of any kind incurred by the user or such third party directly or indirectly arising from or in any way connected with or in consequence to any use or access of the platform and its content, programs, services, or software.<br/>
          Predum.io contains content submitted by users that does not reflect the opinions or views of this platform, its affiliates, and/or its licensors. Predum.io reserves the right to edit, remove, or modify any content provided on this platform, as well as periodically amend its Terms of Use, at any time and without prior notice.<br/>
          Contact Information<br/>
          Please don’t hesitate to contact us if you have questions of any kind about any content contained in this platform via email address: contact@predum.io.
        </p>
      </div>
      <div class="col-12 col-md-4">
        <div class="d-flex justify-content-md-end mt-5">
          <img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/disclaimer.svg" alt="home item right" />
        </div>
      </div>
    </div>
  </section>
</main>
  `;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Disclaimer;
