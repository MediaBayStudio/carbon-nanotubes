<section class="rd-hero container">
  <span class="rd-hero__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
  <h1 class="rd-hero__title"><?php echo $section['title'] ?></h1>
  <div class="rd-hero__text"> <?php
    foreach ( $section['descr_repeater'] as $descr ) : ?>
      <p class="rd-hero__descr"><?php echo $descr['text'] ?></p> <?php
    endforeach ?>
  </div>
  <div class="rd-hero__media"></div>
</section>