<section class="index-hero container">
  <picture class="index-hero__pic">
    <source type="image/webp" media="(max-width:767.98px)" srcset="<?php echo "{$template_directory_uri}/img/index-hero-img.576.webp, {$template_directory_uri}/img/index-hero-img.576@2x.webp 2x" ?>">
    <source type="image/png" media="(max-width:767.98px)" srcset="<?php echo "{$template_directory_uri}/img/index-hero-img.576.png, {$template_directory_uri}/img/index-hero-img.576@2x.png 2x" ?>">
    <source type="image/webp" media="(min-width:767.98px)" srcset="<?php echo "{$template_directory_uri}/img/index-hero-img.1440.webp, {$template_directory_uri}/img/index-hero-img.1440@2x.webp 2x" ?>">
    <source type="image/png" media="(min-width:767.98px)" srcset="<?php echo "{$template_directory_uri}/img/index-hero-img.1440.png, {$template_directory_uri}/img/index-hero-img.1440@2x.png 2x" ?>">
    <img src="<?php echo "{$template_directory_uri}/img/index-hero-img.576.png" ?>" alt="carbon molecule" class="index-hero__img">
  </picture>
  <div class="index-hero__text">
    <span class="index-hero__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
    <h1 class="index-hero__title"><?php echo $section['title'] ?></h1>
    <p class="index-hero__descr"><?php echo $section['descr'] ?></p>
    <div class="index-hero__links">
      <a href="https://google.com" class="index-hero__link btn btn-gradient" target="_blank">Change the world</a>
      <a href="<?php echo "{$site_url}/whitepaper.pdf" ?>" class="index-hero__link btn btn-grey btn-whitepaper" target="_blank">Whitepaper</a>
    </div>
  </div>
</section>