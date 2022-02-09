<section class="rd-more-apps container sect">
  <span class="rd-more-apps__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
  <h2 class="rd-more-apps__title sect-title"><?php echo $section['title'] ?></h2>
  <div class="rd-more-apps__items"> <?php
    foreach ( $section['applications'] as $app ) :
      $webp = get_post_meta( $app['img']['ID'], 'webp' )[0] ?>
      <div class="rd-more-apps__item">
        <h3 class="rd-more-apps__item-title"><span class="rd-more-apps__item-arrow"></span><?php echo $app['title'] ?></h3>
        <p class="rd-more-apps__item-bottom-text"><?php echo $app['text_below'] ?></p>
        <picture class="rd-more-apps__item-pic lazy"> <?php
          if ( $webp ) : ?>
            <source type="image/webp" srcset="#" data-srcset="<?php echo $upload_baseurl . $webp ?>"> <?php
          endif ?>
          <img src="#" alt="item-1" class="rd-more-apps__item-img" data-src="<?php echo $app['img']['url'] ?>">
        </picture>
        <p class="rd-more-apps__item-descr"><?php echo $app['descr'] ?></p>
      </div> <?php
      $i++;
    endforeach;
    unset( $app, $webp ) ?>
  </div>
</section>