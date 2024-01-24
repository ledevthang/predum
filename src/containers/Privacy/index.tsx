import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'style.css';

const Privacy = () => {
  const html = `
  <main>
    <section class="container first-section">
      <h2>Privacy Policy</h2>
      <p class="mb-custom-xxxl text-gray">Like any other crypto project, predum.io cares about and respects the privacy
        of our users. When you access this platform, we will learn certain information, and we are committed to keeping
        all information private.<br />
        This Privacy Policy details exactly how predum.io handle any information that we have about our users.
      </p>
    </section>
    <section class="container mb-custom-xxl">
      <div class="row mb-4 mb-md-custom-xxl">
        <div class="col-12 col-md-6">
          <h3 class="mb-2">1. About the Policy</h3>
          <p class="mb-custom-lg text-gray">
            This Privacy Policy sets out the terms for how the platform collects information from users and how that
            information is used.<br />
            This Privacy Policy does not relate to how any third-party websites that may be linked from our platform
            will use the user information.
          </p>
          <h3 class="mb-2">2. Non-Personal Information</h3>
          <p class="mb-custom-lg text-gray">
            Certain non-personal information is collected and stored when users visit the platform. This includes the
            browser being used, the type of computer being used, the domain being used, the date and time of access, and
            other technical information, etc.<br />
            This information may collectively be used to analyze traffic to the platform, but it is not linked in any
            way to individual users accessing the platform.
          </p>
          <h3 class="mb-2">3. Personal Information</h3>
          <p class="mb-custom-lg text-gray">
            Your crypto wallet address is collected and stored by the platform for the purpose of completing the
            transactions made by you.<br />
            No personal information, including passwords, private key, seed phrases etc. will be collected.
          </p>
          <h3 class="mb-2">4. Sale or Disclosure of Personal Information</h3>
          <p class="text-gray">
            Predum.io will not sell or disclose any personal information to any third-party under any circumstances.
          </p>
        </div>
        <div class="col-12 col-md-6">
          <div class="d-flex justify-content-md-end">
            <img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/privacy-1.svg" alt="home item right" />
          </div>
        </div>
      </div>
      <div class="row flex-column-reverse flex-md-row">
        <div class="col-12 col-md-6">
          <div class="d-flex justify-content-md-start">
            <img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/privacy-2.svg" alt="home item right" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <h3 class="mb-2">5. Cookies</h3>
          <p class="mb-custom-lg text-gray">
            The platform may use cookies for the purposes of improving user experience, tracking traffic coming from
            other websites, and tracking traffic leaving to other websites. Cookies are not linked in any way to
            individual users accessing the platform.
          </p>
          <h3 class="mb-2">6. Acceptance of Privacy Policy</h3>
          <p class="mb-custom-lg text-gray">
            By using the platform, all users agree to accept the terms of this Privacy Policy.
          </p>
          <h3 class="mb-2">7. Questions Relating to Privacy Policy</h3>
          <p class="mb-custom-lg text-gray">
            If you as the user have any questions relating to these terms you may contact us at: contact@predum.io
          </p>
          <h3 class="mb-2">8. Updating and Amending of Privacy Policy</h3>
          <p class="text-gray">
            Predum.io may update or amend this Privacy Policy at any time without notice.
          </p>
        </div>
      </div>
    </section>
  </main>
`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Privacy;
