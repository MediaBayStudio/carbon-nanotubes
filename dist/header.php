<?php
global
  $webp_support,
  $address,
  $address_link,
  $email,
  $telegram,
  $twitter,
  $reddit,
  $youtube,
  $facebook,
  $tiktok,
  $site_url,
  $logo_url,
  $template_directory,
  $template_directory_uri;


$social_media_links = [
  'telegram' => $telegram,
  'twitter' => $twitter,
  'reddit' => $reddit,
  'youtube' => $youtube,
  'facebook' => $facebook,
  'tiktok' => $tiktok
];

$preload = [ $logo_url ];

if ( is_front_page() ) {
  $script_name = 'script-index';
  $style_name = 'style-index';
} else if ( is_404() ) {
  $script_name = '';
  $style_name = 'style-index';
  // $preload[] = $template_directory_uri . '/img/404.svg';
 } else {
  if ( $current_template ) {
    $script_name = 'script-' . $GLOBALS['current_template'];
    $style_name = 'style-' . $GLOBALS['current_template'];
  } else {
    $script_name = '';
    $style_name = '';
  }
}

$GLOBALS['page_script_name'] = $script_name;
$GLOBALS['page_style_name'] = $style_name ?>

<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=CustomEvent%2CIntersectionObserver%2CIntersectionObserverEntry%2CElement.prototype.closest%2CElement.prototype.dataset%2CHTMLPictureElement"></script>
  <meta charset="<?php bloginfo('charset') ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- styles preload -->
  <link rel="preload" as="style" href="<?php echo $template_directory_uri ?>/style.css">
	<link rel="preload" as="style" href="<?php echo "{$template_directory_uri}/css/{$style_name}.css" ?>" />
	<link rel="preload" as="style" href="<?php echo "{$template_directory_uri}/css/{$style_name}.576.css" ?>" media="(min-width:575.98px)" />
	<link rel="preload" as="style" href="<?php echo "{$template_directory_uri}/css/{$style_name}.768.css" ?>" media="(min-width:767.98px)" />
	<link rel="preload" as="style" href="<?php echo "{$template_directory_uri}/css/{$style_name}.1024.css" ?>" media="(min-width:1023.98px)" />
	<link rel="preload" as="style" href="<?php echo "{$template_directory_uri}/css/{$style_name}.1280.css" ?>" media="(min-width:1279.98px)" />
  <!-- fonts preload --> <?php
	$fonts = [
		'Poppins-SemiBold.woff',
		'Poppins-Medium.woff',
		'Poppins-Regular.woff'
	];
	foreach ( $fonts as $font ) : ?>
	<link rel="preload" href="<?php echo "{$template_directory_uri}/fonts/{$font}" ?>" as="font" type="font/woff" crossorigin="anonymous" /> <?php
	endforeach ?>
  <!-- other preload --> <?php
  echo PHP_EOL;
  if ( $preload ) {
    foreach ( $preload as $item ) {
      create_link_preload( $item );
    }
    unset( $item );
  echo PHP_EOL;
  } ?>
  <!-- favicons --> <?php
  echo PHP_EOL;
  wp_head() ?>
</head>

<body <?php body_class() ?>> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.
    <!-- </noindex> -->
  </noscript>
  <div id="page-wrapper">
    <header class="hdr container">
      <a href="<?php echo $site_url ?>" class="hdr__logo" title="Go to front page">
        <img src="<?php echo $logo_url ?>" alt="logotype" class="hdr__logo-img">
      </a>
      <button type="button" class="hdr__burger"></button> <?php
      wp_nav_menu([
        'theme_location'  => 'header_menu',
        'container'       => 'nav',
        'container_class' => 'hdr__nav',
        'menu_class'      => 'hdr__nav-list',
        'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
      ]);
      require 'template-parts/mobile-menu.php' ?>
    </header>