<aside class="menu" style="display:none">
  <div class="menu__cnt container">
    <div class="menu__hdr">
      <a href="<?php echo $site_url ?>" class="menu__logo">
        <img src="<?php echo $logo_url ?>" alt="Logotype" width="41" height="47" class="menu__logo-img">
      </a>
      <button type="button" class="menu__close"></button>
    </div> <?php
    wp_nav_menu( [
      'theme_location'  => 'header_menu',
      'container'       => 'nav',
      'container_class' => 'menu__nav',
      'menu_class'      => 'menu__nav-list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
    <div class="menu__links"> <?php
      foreach ( $social_media_links as $name => $url ) :
        if ( $url ) : ?>
          <a href="<?php echo $url ?>" class="menu__link <?php echo $name ?>" target="_blank"></a> <?php
        endif;
      endforeach;
      unset( $name, $url ) ?>
    </div>
  </div>
</aside>