<section class="buy-sect container sect-bg">
  <h2 class="buy-sect__title sect-title"><?php echo $section['title'] ?></h2>
  <p class="buy-sect__descr"><?php echo $section['descr'] ?></p> <?php
  if ( $section['link'] ) : ?>
    <a href="<?php echo $section['link']['url'] ?>" class="buy-sect__link btn btn-gradient"><?php echo $section['link']['title'] ?></a> <?php
  endif ?>
</section>