<section class="rd-properties container sect">
  <span class="rd-properties__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
  <h2 class="rd-properties__title sect-title"><?php echo $section['title'] ?></h2>
  <p class="rd-properties__items-descr"></p>
  <button type="button" class="rd-properties__items-prev"></button>
  <button type="button" class="rd-properties__items-next"></button>
  <div class="rd-properties__items lazy" data-src="#"> <?php
    $i = 0;
    $section['props'] = array_merge( $section['props'], $section['props'] );
    foreach ( $section['props'] as $property ) :
      $webp = get_post_meta( $property['img']['ID'], 'webp' )[0] ?>
      <div class="rd-properties__item" data-descr="<?php echo $property['descr'] ?>">
        <picture class="rd-properties__item-pic lazy"> <?php
          if ( $webp ) : ?>
            <source type="image/webp" srcset="#" data-srcset="<?php echo $upload_baseurl . $webp ?>"> <?php
          endif ?>
          <img src="#" alt="item-1" class="rd-properties__item-img" data-src="<?php echo $property['img']['url'] ?>">
        </picture>
        <div class="rd-properties__item-text">  
          <h3 class="rd-properties__item-title"><?php echo $property['title'] ?></h3>
          <p class="rd-properties__item-descr"><?php echo $property['text_below'] ?></p>
        </div>
      </div> <?php
      $i++;
    endforeach;
    unset( $property, $i, $class, $webp ) ?>
  </div>
  <div class="rd-properties__nav"></div>
</section>