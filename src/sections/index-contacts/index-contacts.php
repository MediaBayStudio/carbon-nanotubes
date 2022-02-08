<section class="index-contacts container sect">
  <span class="index-contacts__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
  <h2 class="index-contacts__title sect-title"><?php echo $section['title'] ?></h2> <?php
  echo do_shortcode( '[contact-form-7 id="' . $section['form'] . '" html_class="index-contacts__form" html_id="contact-form"]' ) ?>
  <div class="index-contacts__contacts">
    <div class="index-contacts__address">
      <span class="index-contacts__address-title">Address</span>
      <p class="index-contacts__address-descr"><?php echo $address ?></p>
    </div>
    <div class="index-contacts__email">
      <span class="index-contacts__email-title">E-mail</span>
      <p class="index-contacts__email-descr"><?php echo $email ?></p>
    </div> <?php
    $social_media_links_html = '';
    foreach ( $social_media_links as $name => $url ) :
      if ( $url ) {
        $social_media_links_html .= "<a href=\"$url\" class=\"index-contacts__link $name\" target=\"_blank\"></a>";
      }
    endforeach;
    unset( $name, $url );
    if ( $social_media_links_html ) : ?>
      <div class="index-contacts__links">
        <span class="index-contacts__links-title">Join us</span> <?php
        echo $social_media_links_html;
      endif ?>
    </div>
  </div>
</section>