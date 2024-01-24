import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const Partner = () => {
  const html = `
<main>
<section class="container first-section text-center text-md-start">
  <h2>Partners</h2>
  <p class="mb-custom-lg text-gray">In the roadmap, EFUN ecosystem will include a set of industry-leading features and benefits as following:</p>
  <ul class="partner-list">
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-1.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-2.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-3.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-4.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-5.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-6.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-7.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-8.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-9.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-10.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-11.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-12.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-13.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-14.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-15.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-16.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-17.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-18.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-19.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-20.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-21.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-22.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-23.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-24.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-25.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-26.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/partners/partner-27.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-1.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-2.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-3.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-4.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-5.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-6.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-7.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-8.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-9.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-10.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-11.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-12.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-13.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-14.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-15.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-16.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-17.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-18.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-19.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-20.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-21.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-22.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-23.png" alt=""/></a></li>
  <li><a href="#" target="_blank"><img class="img-fluid" src="https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/partner-24.png" alt=""/></a></li>
  </ul>
</section>

</main>
`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Partner;
