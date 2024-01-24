import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const OurTeam = () => {
  const html = ` 
  <main>
    <section class="container first-section">
      <h2>Our Team</h2>
      <p class="mb-custom-lg text-gray">Behind a great game stand the passionate and talented people in the industry. We
        want to bring the best experience to all the players.</p>
      <ul class="team-list flex-column flex-md-row">
        <li>
          <div class="member">
            <img src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/teams/Tony_CEO.png" alt="" />
            <h5 class="name">Tony</h5>
            <div class="role">CEO & Founder</div>
            <p class="text-gray">Seasoned tech entrepreneur with 15+ years running IT and sport SAAS businesses.</p>
          </div>
        </li>
        <li>
          <div class="member">
            <img src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/teams/Nick_CTO.jpeg" alt="" />
            <h5 class="name">Nick</h5>
            <div class="role">CTO & Founder</div>
            <p class="text-gray">18+ years of experience, Former CTO of Software Development company. Completed multiple projects in the Crypto industry</p>
          </div>
        </li>
        <li>
          <div class="member">
            <img src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/teams/Jiminezt_CFO.jpeg" alt="" />
            <h5 class="name">Jiminezt</h5>
            <div class="role">CFO</div>
            <p class="text-gray">A Master of Financial investment/data scientist. He has a 10-years background in the finance industry and has completed a Master's degree in Financial Investment.</p>
          </div>
        </li>
        <li>
          <div class="member">
            <img src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/teams/Dan_CMO.jpeg" alt="" />
            <h5 class="name">Dan</h5>
            <div class="role">CMO</div>
            <p class="text-gray">A Blockchain and Crypto Enthusiast, he started researching cryptocurrency from 2016. Combining his 8 years of experience in IT companies, he believes in the future of cryptocurrency.</p>
          </div>
        </li>
        <li>
          <div class="member">
            <img src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/teams/Henry_COO.jpeg" alt="" />
            <h5 class="name">Henry</h5>
            <div class="role">COO</div>
            <p class="text-gray">A COO who managed IT companies with more than 100 human resources. A Crypto lover who is ambitious and always look forward to operating great products.</p>
          </div>
        </li>
        <li>
          <div class="member">
            <img src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/teams/Mike_Product_Manager.jpeg" alt="" />
            <h5 class="name">Mike</h5>
            <div class="role">Product Manager</div>
            <p class="text-gray">
            Software engineer who has more than 5 years working in Blockchain projects. He loves challenges and has the passion of solving big problems.</p>
          </div>
        </li>
        <li>
          <div class="member">
            <img src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/teams/Leo_Blockchain.jpeg" alt="" />
            <h5 class="name">Leo</h5>
            <div class="role">Blockchain Lead</div>
            <p class="text-gray">Product manager who has been working in multiple BlockChain projects since 2016. He is a proactive team player with exceptional communication skills.</p>
          </div>
        </li>
        <li>
          <div class="member">
            <img src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/teams/Simon_Backend_developer.jpeg" alt="" />
            <h5 class="name">Simon</h5>
            <div class="role">Backend Developer</div>
            <p class="text-gray">Software engineer with over 10 years of experience. He has a great love for Blockchain and Cryptocurrencies, and joined the crypto market since 2016.</p>
          </div>
        </li>
        <li>
          <div class="member">
            <img src="https://efun-public.s3.ap-southeast-1.amazonaws.com/images/teams/Thomas_Frontend_Developer.jpeg" alt="" />
            <h5 class="name">Thomas</h5>
            <div class="role">Frontend Developer</div>
            <p class="text-gray">Software engineer with over 5 years of experience. Former Tech Lead in big Software development company who has trong knowledge about frontend development and design.</p>
          </div>
        </li>
      </ul>
    </section>

  </main>
  `;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default OurTeam;
