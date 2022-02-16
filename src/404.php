<?php
get_header() ?>
<style>
  #page-wrapper {
    min-height: 100vh;
  }
  
  .hero-404 {
    margin: auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    text-align: center;

  }

  .hero-404__img {
    max-width: 400px;
    width: 80%;
  }

  .hero-404__title {
    margin: 30px 0 0;
    font: bold 28px/1.3 Poppins, sans-serif;
    text-transform: uppercase;
  }

  .hero-404__descr {
    margin: 20px 0 0;
    max-width: 335px;
  }

  .hero-404__btn {
    margin: 35px 0 0;
    width: 135px;
    height: 50px;
  }

  @media (min-width:1279px) {
    .hero-404__title {
      margin: 50px 0 0;
      font-size: 48px;
    }

    .hero-404__btn {
      margin: 50px 0 0;
      width: 155px;
      height: 60px;
    }
  }

</style>
<section class="hero-404 container">
  <img src="<?php echo $template_directory_uri ?>/img/hero-404-img.svg" alt="404" class="hero-404__img">
  <h1 class="hero-404__title">Page not found</h1>
  <p class="hero-404__descr">This page is missing or you assembled the link incorrectly</p>
  <a href="<?php echo $site_url ?>" class="btn btn-gradient hero-404__btn">Go home</a>
</section> <?php
get_footer();