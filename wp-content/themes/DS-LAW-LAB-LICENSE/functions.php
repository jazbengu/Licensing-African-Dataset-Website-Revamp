<?php
 
 function ds_law_lab_license_enqueue_scripts() {
     // Enqueue your custom CSS and JS files here
     wp_enqueue_style( 'ds-law-lab-license-style', get_template_directory_uri() . '/assets/index.css' );
     wp_enqueue_script( 'ds-law-lab-license-script', get_template_directory_uri() . '/assets/index.js', array(), '1.0.0', true );
 }
 add_action( 'wp_enqueue_scripts', 'ds_law_lab_license_enqueue_scripts' );

/** Replace default Tags box on LAD Updates with a fixed checkbox list */
function lad_remove_default_tags_box() {
    remove_meta_box( 'tagsdiv-post_tag', 'lad_update', 'side' );
}
add_action( 'admin_menu', 'lad_remove_default_tags_box' );

function lad_add_custom_tags_box() {
    add_meta_box(
        'lad_custom_tags',
        'Tags',
        'lad_render_custom_tags_box',
        'lad_update',
        'side',
        'default'
    );
}
add_action( 'add_meta_boxes', 'lad_add_custom_tags_box' );

function lad_render_custom_tags_box( $post ) {
    wp_nonce_field( 'lad_save_custom_tags', 'lad_custom_tags_nonce' );

    $allowed_tags = [
        'Dataset Creator',
        'Researcher',
        'Community',
        'Policymaker',
        'News',
        'Updates',
        'Stories from the field',
    ];

    $current_tags = wp_get_post_terms( $post->ID, 'post_tag', [ 'fields' => 'names' ] );
    ?>
    <div style="max-height:200px; overflow-y:auto;">
        <?php foreach ( $allowed_tags as $tag ) : ?>
            <label style="display:block; margin-bottom:6px;">
                <input
                    type="checkbox"
                    name="lad_custom_tags[]"
                    value="<?php echo esc_attr( $tag ); ?>"
                    <?php checked( in_array( $tag, $current_tags, true ) ); ?>
                />
                <?php echo esc_html( $tag ); ?>
            </label>
        <?php endforeach; ?>
    </div>
    <?php
}

function lad_save_custom_tags( $post_id ) {
    if ( ! isset( $_POST['lad_custom_tags_nonce'] ) || ! wp_verify_nonce( $_POST['lad_custom_tags_nonce'], 'lad_save_custom_tags' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;

    $selected = isset( $_POST['lad_custom_tags'] ) ? array_map( 'sanitize_text_field', (array) $_POST['lad_custom_tags'] ) : [];
    wp_set_post_terms( $post_id, $selected, 'post_tag', false ); // false = replace, not append
}
add_action( 'save_post_lad_update', 'lad_save_custom_tags' );


/** Register the custom post type and tag taxonomy */
function lad_register_post_type() {
    register_post_type( 'lad_update', [
        'labels' => [
            'name'               => 'LAD Updates',
            'singular_name'      => 'LAD Update',
            'add_new_item'       => 'Add New Update',
            'edit_item'          => 'Edit Update',
            'new_item'           => 'New Update',
            'view_item'          => 'View Update',
            'search_items'       => 'Search Updates',
            'not_found'          => 'No updates found',
        ],
        'public'       => true,
        'has_archive'  => true,          // gives you /lad_update/ archive URL
        'show_in_rest' => true,          // enables Gutenberg editor
        'supports'     => [ 'title', 'editor', 'author', 'excerpt', 'thumbnail' ],
        'taxonomies'  => [ 'post_tag' ],    // enables tags
        'rewrite'      => [ 'slug' => '/blog' ],
        'menu_icon'    => 'dashicons-megaphone',
    ] );


}
add_action( 'init', 'lad_register_post_type' );



// Make sure the excerpt is used as the lead/intro text.
// (Write your excerpt manually in the WP editor for best results.)
add_filter('excerpt_length', function() { return 30; }, 999);
add_filter('excerpt_more',   function() { return '…'; });

/** ============================================================
 *  IN PRACTICE — Case Studies CPT
 *  ============================================================ */
function lad_register_case_study_cpt() {
    register_post_type( 'lad_case_study', [
        'labels' => [
            'name'          => 'Case Studies',
            'singular_name' => 'Case Study',
            'add_new_item'  => 'Add New Case Study',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'has_archive'  => true,
        'supports'     => [ 'title' ], // title = the person's name
        'rewrite'      => [ 'slug' => '/noodl-framework/in-practice' ],
        'menu_icon'    => 'dashicons-groups',
    ] );

    $fields = [
        'location' => 'string',
        'role'     => 'string',
        'audience' => 'string', // Dataset Creator | Researcher | Community | Policymaker
        'tools'    => 'array',  // NOODL Licence | Split Sheet | Dictionary | Resource Library
        'problem'  => 'string',
        'outcome'  => 'string',
        'quote'    => 'string',
        'tag'      => 'string',
    ];
    foreach ( $fields as $key => $type ) {
        register_post_meta( 'lad_case_study', $key, [
            'type'         => $type,
            'single'       => $type !== 'array',
            'show_in_rest' => $type === 'array' ? [
                'schema' => [ 'type' => 'array', 'items' => [ 'type' => 'string' ] ]
            ] : true,
        ] );
    }
}
add_action( 'init', 'lad_register_case_study_cpt' );

/** ============================================================
 *  RESOURCE LIBRARY CPT
 *  ============================================================ */
function lad_register_resource_cpt() {
    register_post_type( 'lad_resource', [
        'labels' => [
            'name'          => 'Resources',
            'singular_name' => 'Resource',
            'add_new_item'  => 'Add New Resource',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'has_archive'  => true,
        'supports'     => [ 'title', 'editor' ], // editor = description
        'rewrite'      => [ 'slug' => '/noodl-framework/resources' ],
        'menu_icon'    => 'dashicons-media-document',
    ] );

    $fields = [
        'format'       => 'string', // Videos | Summaries & Explainers | Policy Briefs | Reports | Articles & Publications | Audio Explainers
        'date'         => 'string',
        'duration'     => 'string',
        'language'     => 'string',
        'author'       => 'string',
        'outlet'       => 'string',
        'link'         => 'string',
        'downloadable' => 'boolean',
        'comingSoon'   => 'boolean',
    ];
    foreach ( $fields as $key => $type ) {
        register_post_meta( 'lad_resource',$key, [
            'type'         => $type,
            'single'       => true,
            'show_in_rest' => true,
        ] );
    }
}
add_action( 'init', 'lad_register_resource_cpt' );

/** ============================================================
 *  DICTIONARY CPT
 *  ============================================================ */
function lad_register_dictionary_cpt() {
    register_post_type( 'lad_term', [
        'labels' => [
            'name'          => 'Dictionary Terms',
            'singular_name' => 'Dictionary Term',
            'add_new_item'  => 'Add New Term',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'has_archive'  => true,
        'supports'     => [ 'title', 'editor', 'custom-fields'], // title = term, editor = definition
        'rewrite'      => [ 'slug' => '/noodl-framework/dictionary' ],
        'menu_icon'    => 'dashicons-book',
    ] );

    register_post_meta( 'lad_term', 'category', [
        'type' => 'string', 'single' => true, 'show_in_rest' => true,
    ] ); // Legal | Data Governance | NOODL | Technical | Policy



    register_post_meta( 'lad_term', 'example', [
        'type' => 'string', 'single' => true, 'show_in_rest' => true,
    ] );
}
add_action( 'init', 'lad_register_dictionary_cpt' );



/* ----------------------------------------------------------------
   1. CASE STUDY META BOX
   ---------------------------------------------------------------- */
function lad_add_case_study_meta_box() {
    add_meta_box(
        'lad_case_study_details',
        'Case Study Details',
        'lad_render_case_study_meta_box',
        'lad_case_study',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'lad_add_case_study_meta_box' );
 
function lad_render_case_study_meta_box( $post ) {
    wp_nonce_field( 'lad_save_case_study', 'lad_case_study_nonce' );
 
    $location = get_post_meta( $post->ID, 'location', true );
    $role     = get_post_meta( $post->ID, 'role', true );
    $audience = get_post_meta( $post->ID, 'audience', true );
    $tools    = (array) get_post_meta( $post->ID, 'tools', true );
    $problem  = get_post_meta( $post->ID, 'problem', true );
    $outcome  = get_post_meta( $post->ID, 'outcome', true );
    $quote    = get_post_meta( $post->ID, 'quote', true );
    $tag      = get_post_meta( $post->ID, 'tag', true );
 
    $audience_options = [ 'Dataset Creator', 'Researcher', 'Community', 'Policymaker' ];
    $tool_options     = [ 'NOODL Licence', 'Split Sheet', 'Dictionary', 'Resource Library' ];
    ?>
    <p><em>Note: the post Title field above is used as the person's <strong>Name</strong>.</em></p>
 
    <table class="form-table">
        <tr>
            <th><label for="lad_location">Location</label></th>
            <td><input type="text" id="lad_location" name="lad_location" value="<?php echo esc_attr( $location ); ?>" class="regular-text" placeholder="e.g. Nigeria" /></td>
        </tr>
        <tr>
            <th><label for="lad_role">Role</label></th>
            <td><input type="text" id="lad_role" name="lad_role" value="<?php echo esc_attr( $role ); ?>" class="regular-text" placeholder="e.g. Computational Linguist" /></td>
        </tr>
        <tr>
            <th><label for="lad_audience">Audience</label></th>
            <td>
                <select id="lad_audience" name="lad_audience">
                    <?php foreach ( $audience_options as $opt ) : ?>
                        <option value="<?php echo esc_attr( $opt ); ?>" <?php selected( $audience, $opt ); ?>><?php echo esc_html( $opt ); ?></option>
                    <?php endforeach; ?>
                </select>
            </td>
        </tr>
        <tr>
            <th>Tools Used</th>
            <td>
                <?php foreach ( $tool_options as $opt ) : ?>
                    <label style="display:inline-block;margin-right:15px;">
                        <input type="checkbox" name="lad_tools[]" value="<?php echo esc_attr( $opt ); ?>" <?php checked( in_array( $opt, $tools, true ) ); ?> />
                        <?php echo esc_html( $opt ); ?>
                    </label>
                <?php endforeach; ?>
            </td>
        </tr>
        <tr>
            <th><label for="lad_tag">Tag</label></th>
            <td><input type="text" id="lad_tag" name="lad_tag" value="<?php echo esc_attr( $tag ); ?>" class="regular-text" placeholder="e.g. Speech & Audio" /></td>
        </tr>
        <tr>
            <th><label for="lad_problem">The Challenge (Problem)</label></th>
            <td><textarea id="lad_problem" name="lad_problem" rows="4" class="large-text"><?php echo esc_textarea( $problem ); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="lad_outcome">What Happened (Outcome)</label></th>
            <td><textarea id="lad_outcome" name="lad_outcome" rows="4" class="large-text"><?php echo esc_textarea( $outcome ); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="lad_quote">Quote (optional)</label></th>
            <td><textarea id="lad_quote" name="lad_quote" rows="2" class="large-text"><?php echo esc_textarea( $quote ); ?></textarea></td>
        </tr>
    </table>
    <?php
}
 
function lad_save_case_study_meta( $post_id ) {
    if ( ! isset( $_POST['lad_case_study_nonce'] ) || ! wp_verify_nonce( $_POST['lad_case_study_nonce'], 'lad_save_case_study' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;
 
    $text_fields = [ 'location', 'role', 'audience', 'tag' ];
    foreach ( $text_fields as $f ) {
        if ( isset( $_POST["lad_$f"] ) ) {
            update_post_meta( $post_id, $f, sanitize_text_field( $_POST["lad_$f"] ) );
        }
    }
 
    $textarea_fields = [ 'problem', 'outcome', 'quote' ];
    foreach ( $textarea_fields as $f ) {
        if ( isset( $_POST["lad_$f"] ) ) {
            update_post_meta( $post_id, $f, sanitize_textarea_field( $_POST["lad_$f"] ) );
        }
    }
 
    $tools = isset( $_POST['lad_tools'] ) ? array_map( 'sanitize_text_field', (array) $_POST['lad_tools'] ) : [];
    update_post_meta( $post_id, 'tools', $tools );
}
add_action( 'save_post_lad_case_study', 'lad_save_case_study_meta' );
 
 
/* ----------------------------------------------------------------
   2. RESOURCE META BOX
   ---------------------------------------------------------------- */
function lad_add_resource_meta_box() {
    add_meta_box(
        'lad_resource_details',
        'Resource Details',
        'lad_render_resource_meta_box',
        'lad_resource',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'lad_add_resource_meta_box' );
 
function lad_render_resource_meta_box( $post ) {
    wp_nonce_field( 'lad_save_resource', 'lad_resource_nonce' );
 
    $format       = get_post_meta( $post->ID, 'format', true );
    $date         = get_post_meta( $post->ID, 'date', true );
    $duration     = get_post_meta( $post->ID, 'duration', true );
    $language     = get_post_meta( $post->ID, 'language', true );
    $author       = get_post_meta( $post->ID, 'author', true );
    $outlet       = get_post_meta( $post->ID, 'outlet', true );
    $link         = get_post_meta( $post->ID, 'link', true );
    $downloadable = get_post_meta( $post->ID, 'downloadable', true );
    $comingSoon   = get_post_meta( $post->ID, 'comingSoon', true );
 
    $format_options = [ 'Videos', 'Summaries & Explainers', 'Policy Briefs', 'Reports', 'Articles & Publications', 'Audio Explainers' ];
    ?>
    <p><em>Note: post Title = resource title. Use the main Content editor below for the description.</em></p>
 
    <table class="form-table">
        <tr>
            <th><label for="lad_format">Format</label></th>
            <td>
                <select id="lad_format" name="lad_format">
                    <?php foreach ( $format_options as $opt ) : ?>
                        <option value="<?php echo esc_attr( $opt ); ?>" <?php selected( $format, $opt ); ?>><?php echo esc_html( $opt ); ?></option>
                    <?php endforeach; ?>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="lad_date">Date</label></th>
            <td><input type="text" id="lad_date" name="lad_date" value="<?php echo esc_attr( $date ); ?>" class="regular-text" placeholder="e.g. March 2025" /></td>
        </tr>
        <tr>
            <th><label for="lad_duration">Duration / Label</label></th>
            <td><input type="text" id="lad_duration" name="lad_duration" value="<?php echo esc_attr( $duration ); ?>" class="regular-text" placeholder="e.g. Watch on YouTube, 12 min read" /></td>
        </tr>
        <tr>
            <th><label for="lad_language">Language</label></th>
            <td><input type="text" id="lad_language" name="lad_language" value="<?php echo esc_attr( $language ); ?>" class="regular-text" placeholder="e.g. English" /></td>
        </tr>
        <tr>
            <th><label for="lad_author">Author</label></th>
            <td><input type="text" id="lad_author" name="lad_author" value="<?php echo esc_attr( $author ); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="lad_outlet">Outlet / Publisher</label></th>
            <td><input type="text" id="lad_outlet" name="lad_outlet" value="<?php echo esc_attr( $outlet ); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="lad_link">Link (URL)</label></th>
            <td><input type="url" id="lad_link" name="lad_link" value="<?php echo esc_attr( $link ); ?>" class="regular-text" placeholder="https://..." /></td>
        </tr>
        <tr>
            <th>Downloadable?</th>
            <td><label><input type="checkbox" name="lad_downloadable" value="1" <?php checked( $downloadable, '1' ); ?> /> Yes</label></td>
        </tr>
        <tr>
            <th>Coming Soon?</th>
            <td><label><input type="checkbox" name="lad_comingSoon" value="1" <?php checked( $comingSoon, '1' ); ?> /> Yes</label></td>
        </tr>
    </table>
    <?php
}
 
function lad_save_resource_meta( $post_id ) {
    if ( ! isset( $_POST['lad_resource_nonce'] ) || ! wp_verify_nonce( $_POST['lad_resource_nonce'], 'lad_save_resource' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;
 
    $text_fields = [ 'format', 'date', 'duration', 'language', 'author', 'outlet' ];
    foreach ( $text_fields as $f ) {
        if ( isset( $_POST["lad_$f"] ) ) {
            update_post_meta( $post_id, $f, sanitize_text_field( $_POST["lad_$f"] ) );
        }
    }
 
    if ( isset( $_POST['link'] ) ) {
        update_post_meta( $post_id, 'link', sanitize_url( $_POST['lad_link'] ) );
    }
 
    update_post_meta( $post_id, 'downloadable', isset( $_POST['lad_downloadable'] ) ? '1' : '' );
    update_post_meta( $post_id, 'comingSoon', isset( $_POST['lad_comingSoon'] ) ? '1' : '' );
}
add_action( 'save_post_lad_resource', 'lad_save_resource_meta' );
 
 
/* ----------------------------------------------------------------
   3. DICTIONARY TERM META BOX
   ---------------------------------------------------------------- */
function lad_add_term_meta_box() {
    add_meta_box(
        'lad_term_details',
        'Dictionary Term Details',
        'lad_render_term_meta_box',
        'lad_term',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'lad_add_term_meta_box' );
 
function lad_render_term_meta_box( $post ) {
    wp_nonce_field( 'lad_save_term', 'lad_term_nonce' );
 
    $category     = get_post_meta( $post->ID, 'category', true );
    $example      = get_post_meta( $post->ID, 'example', true );
 
    $category_options = [ 'Legal', 'Data Governance', 'NOODL', 'Technical', 'Policy' ];
    ?>
    <p><em>Note: post Title = the term itself. Use the main Content editor below for the definition.</em></p>
 
    <table class="form-table">
        <tr>
            <th><label for="lad_category">Category</label></th>
            <td>
                <select id="lad_category" name="lad_category">
                    <?php foreach ( $category_options as $opt ) : ?>
                        <option value="<?php echo esc_attr( $opt ); ?>" <?php selected( $category, $opt ); ?>><?php echo esc_html( $opt ); ?></option>
                    <?php endforeach; ?>
                </select>
            </td>
        </tr>

        <tr>
            <th><label for="lad_example">Example (optional)</label></th>
            <td><textarea id="lad_example" name="lad_example" rows="3" class="large-text"><?php echo esc_textarea( $example ); ?></textarea></td>
        </tr>
    </table>
    <?php
}
 
function lad_save_term_meta( $post_id ) {
    if ( ! isset( $_POST['lad_term_nonce'] ) || ! wp_verify_nonce( $_POST['lad_term_nonce'], 'lad_save_term' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;
 
    if ( isset( $_POST['lad_category'] ) ) {
        update_post_meta( $post_id, 'category', sanitize_text_field( $_POST['lad_category'] ) );
    }
 
 
    if ( isset( $_POST['lad_example'] ) ) {
        update_post_meta( $post_id, 'example', sanitize_textarea_field( $_POST['lad_example'] ) );
    }
}
add_action( 'save_post_lad_term', 'lad_save_term_meta' );

add_filter( 'use_block_editor_for_post_type', function( $use_block_editor, $post_type ) {
    if ( in_array( $post_type, [ 'lad_resource', 'lad_term', 'lad_update' ], true ) ) {
        return false;
    }
    return $use_block_editor;
}, 10, 2 );;
/** Flush rewrites once for new CPTs */
function lad_flush_new_cpts() {
    lad_register_case_study_cpt();
    lad_register_resource_cpt();
    lad_register_dictionary_cpt();
    flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'lad_flush_new_cpts' );

/* ----------------------------------------------------------------
   CORS — allow the Vite dev server and production frontend
   ---------------------------------------------------------------- */
function lad_rest_cors_headers() {
    $allowed = [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://licensing-african-datasets-prototype.local', // ← update before going live
    ];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ( in_array( $origin, $allowed, true ) ) {
        header( 'Access-Control-Allow-Origin: ' . $origin );
        header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
        header( 'Access-Control-Allow-Headers: Content-Type, Authorization' );
        header( 'Vary: Origin' );
    }
}
add_action( 'rest_api_init', function () {
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    add_filter( 'rest_pre_serve_request', function ( $value ) {
        lad_rest_cors_headers();
        return $value;
    }, 15 );
}, 15 );

?>