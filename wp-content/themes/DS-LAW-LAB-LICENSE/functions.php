<?php
 
 function ds_law_lab_license_enqueue_scripts() {
     // Enqueue your custom CSS and JS files here
     wp_enqueue_style( 'ds-law-lab-license-style', get_template_directory_uri() . '/assets/index.css' );
     wp_enqueue_script( 'ds-law-lab-license-script', get_template_directory_uri() . '/assets/index.js', array(), '1.0.0', true );
 }
 add_action( 'wp_enqueue_scripts', 'ds_law_lab_license_enqueue_scripts' );








