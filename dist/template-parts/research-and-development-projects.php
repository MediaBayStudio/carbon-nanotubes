<section class="rd-projects container sect">
  <span class="rd-projects__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
  <h2 class="rd-projects__title sect-title"><?php echo $section['title'] ?></h2>
  <ul class="rd-projects__items"> <?php
    $i = 0;
    foreach ( $section['projects'] as $project ) :
      $class = $i % 2 === 0 ? 'odd' : 'even';
      $webp = get_post_meta( $project['img']['ID'], 'webp' )[0] ?>
      <li class="rd-projects__item <?php echo $class ?>">
        <picture class="rd-projects__item-pic lazy"> <?php
          if ( $webp ) : ?>
            <source type="image/webp" srcset="#" data-srcset="<?php echo $upload_baseurl . $webp ?>"> <?php
          endif ?>
          <img src="#" alt="item-1" class="rd-projects__item-img" data-src="<?php echo $project['img']['url'] ?>">
        </picture>
        <div class="rd-projects__item-text">
          <h3 class="rd-projects__item-title"><?php echo $project['title'] ?></h3>
          <p class="rd-projects__item-descr"><?php echo $project['descr'] ?></p>
        </div>
      </li> <?php
      $i++;
    endforeach;
    unset( $project, $i, $class, $webp ) ?>
  </ul>
</section>