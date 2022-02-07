<section class="index-about container sect">
  <span class="index-about__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
  <h2 class="index-about__title sect-title"><?php echo $section['title'] ?></h2>
  <ul class="index-about__properties"> <?php
    foreach ( $section['items'] as $item ) : ?>
      <li class="index-about__property">
        <span class="index-about__property-title"><?php echo $item['title'] ?></span>
        <p class="index-about__property_descr"><?php echo $item['descr'] ?></p>
      </li> <?php
    endforeach;
    unset( $item ) ?>
  </ul>
</section>