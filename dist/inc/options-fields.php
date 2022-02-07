<?php
 /* Настройка контактов в панели настройки->общее */
// Функции вывода нужных полей
  function options_inp_html ( $id ) {
    echo "<input type='text' name='{$id}' value='" . esc_attr( get_option( $id ) ) . "'>";
  }

  add_action( 'admin_init', function() {
    $options = [
      'address'   =>  'Address',
      'email'     =>  'E-mail',
      'telegram'  =>  'Telegram',
      'twitter'   =>  'Twitter',
      'reddit'    =>  'Reddit',
      'youtube'   =>  'Youtube',
      'facebook'  =>  'Facebook',
      'tiktok'    =>  'Tiktok'
    ];

    foreach ($options as $id => $name) {
      $my_id = "contacts_{$id}";

      add_settings_field( $id, $name, 'options_inp_html', 'general', 'default', $my_id );
      register_setting( 'general', $my_id );
    }
  } );
