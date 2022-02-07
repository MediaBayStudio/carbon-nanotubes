<?php

function create_link_preload( $args ) {
  
  if ( !$args['url'] ) {
    return;
  }

  $defaults = [
    'url' => '',
    'imagesrcset' => '',
    'as' => 'image',
    'media' => '',
    'print' => true
  ];

  $parsed_args = wp_parse_args( $args, $defaults );
  $media = $parsed_args['media'] ? ' media="' . $parsed_args['media'] . '"' : '';
  $imagesrcset = $parsed_args['imagesrcset'] ? ' imagesrcset="' . $parsed_args['imagesrcset'] . '"' : '';

  $link_tag = "<link rel=\"preload\" as=\"{$parsed_args['as']}\" href=\"{$parsed_args['url']}\"${imagesrcset}{$media} />";

  if ( $parsed_args['print'] ) {
    echo $link_tag . PHP_EOL;
  } else {
    return $link_tag;
  }
}