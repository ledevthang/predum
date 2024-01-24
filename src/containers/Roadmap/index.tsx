import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const Roadmap = () => {
  const html = ` 
  <main>
  <section class="first-section">
    <div class="container">
      <h2>Roadmap</h2>
      <p class="mb-custom-lg text-gray">Behind a great game stand the passionate and talented people in the industry. We want to bring the best experience to all the players.</p>
    </div>
    <div class="roadmap"><img src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/roadmap.svg" alt=""/></div>
  </section>

</main>
  `;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Roadmap;
