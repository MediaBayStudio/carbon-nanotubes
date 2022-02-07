<?php
// Меню на сайте
  add_action( 'after_setup_theme', function() {
    register_nav_menus( [
      'header_menu' =>  'Header menu',
      // 'mobile_menu' =>  'Mobile menu',
      // 'footer_menu' =>  'Footer menu'
    ] );
  } );

// добавить класс для ссылки в меню (a)
  add_filter( 'nav_menu_link_attributes', function( $atts, $item ) {
    global $site_url;
    $atts['class'] = 'nav-link';
    if ( $item->title === 'Whitepaper' ) {
      $atts['href'] = $site_url . '/whitepaper.pdf';
    } elseif ( $item->title === 'FAQ' ) {
      $atts['href'] = $site_url . '/#faq';
    }
    return $atts;
  }, 10, 2);  

// задать свои классы для пунктов меню (li)
  add_filter( 'nav_menu_css_class', function( $classes, $item, $args, $depth ) {
    $container_class = $args->container_class;
    $li_class = '';

    switch ( $container_class ) {
      case 'hdr__nav':
        $li_class = 'hdr__nav-li';
        break;
      // case 'ftr__nav':
      //   $li_class = 'ftr__nav-li';
      //   break;
      case 'menu__nav':
        $li_class = 'menu__nav-li';
        break;
      default:
        $li_class = 'nav__li';
        break;
    }

    $classesArray = [ $li_class ];

    foreach ( $classes as $class ) {
      if ( $class === 'current-menu-item' ) {
        $classesArray[] = 'current';
      } else if ( $class === 'last' ) {
        $classesArray[] = 'last';
      }
    }
    return $classesArray;
  }, 10, 4);

// убрать id у пунктов меню
  add_filter( 'nav_menu_item_id', function( $menu_id, $item, $args, $depth ) {
    return '';
  }, 10, 4);