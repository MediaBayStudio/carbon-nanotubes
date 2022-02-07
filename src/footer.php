      <?php
        global 
          $social_media_links ?>
      <footer class="ftr container"> <?php
        if ( !is_front_page() ) : ?>
          <div class="ftr__links"> <?php
            foreach ( $social_media_links as $name => $url ) :
              if ( $url ) : ?>
                <a href="<?php echo $url ?>" class="ftr__link <?php echo $name ?>" target="_blank"></a> <?php
              endif;
            endforeach;
            unset( $name, $url ) ?>
          </div> <?php
        endif ?>
        <span class="ftr__copy">&copy; All rights reserved</span>
      </footer>
      <div id="fake-scrollbar"></div> <?php
      wp_footer() ?>
    </div>
  </body>
</html>