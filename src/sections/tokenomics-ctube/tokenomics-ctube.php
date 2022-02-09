<section class="tokenomics-ctube container sect">
  <span class="tokenomics-ctube__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
  <h2 class="tokenomics-ctube__title sect-title"><?php echo $section['title'] ?></h2>
  <div class="tokenomics-ctube__items"> <?php
    $i = 0;
    $section['cases'] = array_merge( $section['cases'], $section['cases'] );
    foreach ( $section['cases'] as $case ) : ?>
      <div class="tokenomics-ctube__item" data-number="<?php echo substr( "0" . ($i + 1), -2 ) ?>">
      <img src="#" alt="item-1" class="tokenomics-ctube__item-img lazy" data-src="<?php echo $case['img']['url'] ?>">
        <h3 class="tokenomics-ctube__item-title"><?php echo $case['title'] ?></h3>
        <p class="tokenomics-ctube__item-descr"><?php echo $case['descr'] ?></p>
      </div> <?php
      $i++;
    endforeach;
    unset( $case, $i ) ?>
  </div>
</section>