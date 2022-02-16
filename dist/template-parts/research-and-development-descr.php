<section class="rd-descr container sect lazy" data-src="#">
  <h2 class="rd-descr__title sect-title"><?php echo $section['title'] ?></h2>
  <p class="rd-descr__text"><?php echo $section['descr'] ?></p>
  <picture class="rd-descr__pic lazy">
    <source type="image/webp" srcset="#" data-srcset="<?php echo $template_directory_uri ?>/img/rd-descr-img.webp">
    <img src="#" alt="image" data-src="<?php echo $template_directory_uri ?>/img/rd-descr-img.png" class="rd-descr__img">
  </picture>
</section>