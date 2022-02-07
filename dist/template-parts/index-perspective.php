<section class="index-perspective container sect">
  <span class="index-perspective__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
  <h2 class="index-perspective__title sect-title"><?php echo $section['title'] ?></h2>
  <ul class="index-perspective__items"> <?php
    $i = 0;
    foreach ( $section['items'] as $item ) :
      $class = $i % 2 === 0 ? 'odd' : 'even';
      $webp = get_post_meta( $item['img']['ID'], 'webp' )[0] ?>
      <li class="index-perspective__item <?php echo $class ?>">
        <picture class="index-perspective__item-pic lazy"> <?php
          if ( $webp ) : ?>
            <source type="image/webp" srcset="#" data-srcset="<?php echo $upload_baseurl . $webp ?>"> <?php
          endif ?>
          <img src="#" alt="item-1" class="index-perspective__item-img" data-src="<?php echo $item['img']['url'] ?>">
        </picture>
        <div class="index-perspective__item-text">
          <span class="index-perspective__item-title"><?php echo $item['title'] ?></span>
          <p class="index-perspective__item-descr"><?php echo $item['descr'] ?></p>
        </div>
      </li> <?php
      $i++;
    endforeach;
    unset( $item, $i, $class, $webp ) ?>
  </ul>
  <a href="<?php echo $section['link']['url'] ?>" class="index-perspective__link btn btn-ol-gradient"><?php echo $section['link']['title'] ?></a>
</section>