<?php
 
 function ds_law_lab_license_enqueue_scripts() {
     // Enqueue your custom CSS and JS files here
     wp_enqueue_style( 'ds-law-lab-license-style', get_template_directory_uri() . '/assets/index.css' );
     wp_enqueue_script( 'ds-law-lab-license-script', get_template_directory_uri() . '/assets/index.js', array(), '1.0.0', true );
 }
 add_action( 'wp_enqueue_scripts', 'ds_law_lab_license_enqueue_scripts' );

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
        'rewrite'      => [ 'slug' => 'updates' ],
        'menu_icon'    => 'dashicons-megaphone',
    ] );

    register_taxonomy( 'lad_tag', 'lad_update', [
        'labels' => [
            'name'          => 'Update Tags',
            'singular_name' => 'Update Tag',
            'edit_item'     => 'Edit Tag',
            'add_new_item'  => 'Add New Tag',
        ],
        'public'            => true,
        'hierarchical'      => false,
        'show_in_rest'      => true,
        'show_admin_column' => true,
        'rewrite'           => [ 'slug' => 'updates/tag' ],
    ] );
}
add_action( 'init', 'lad_register_post_type' );

add_action( 'after_switch_theme', 'lad_flush_rewrites' );

function lad_register_default_tags() {
    $tags = [
        'Dataset Creator',
        'Researcher',
        'Community',
        'Policymaker',
        'News',
        'Updates',
        'Stories from the field',
    ];
    foreach ($tags as $tag) {
        if (!term_exists($tag, 'post_tag')) {
            wp_insert_term($tag, 'post_tag');
        }
    }
}
add_action('after_switch_theme', 'lad_register_default_tags');

// Make sure the excerpt is used as the lead/intro text.
// (Write your excerpt manually in the WP editor for best results.)
add_filter('excerpt_length', function() { return 30; }, 999);
add_filter('excerpt_more',   function() { return '…'; });



function lad_register_case_study_post_type() {
    register_post_type( 'lad_case_study', [
        'labels' => [
            'name'          => 'Case Studies',
            'singular_name' => 'Case Study',
            'add_new_item'  => 'Add New Case Study',
            'edit_item'     => 'Edit Case Study',
        ],
        'public'       => true,
        'has_archive'  => false,
        'show_in_rest' => true,   // exposes to REST API + enables Gutenberg
        'supports'     => [ 'title', 'editor' ],  // title = person name; editor = not used but good to keep
        'rewrite'      => [ 'slug' => 'case-studies' ],
        'menu_icon'    => 'dashicons-id-alt',
    ] );
}
add_action( 'init', 'lad_register_case_study_post_type' );
 
/**
 * Register meta fields for Case Studies.
 * These will appear as custom fields and be exposed via the REST API.
 */
function lad_register_case_study_meta() {
    $fields = [
        'lad_cs_location'  => 'string',
        'lad_cs_role'      => 'string',
        'lad_cs_audience'  => 'string',   // 'Dataset Creator' | 'Researcher' | 'Community' | 'Policymaker'
        'lad_cs_tools'     => 'string',   // JSON-encoded array, e.g. '["NOODL Licence","Split Sheet"]'
        'lad_cs_problem'   => 'string',
        'lad_cs_outcome'   => 'string',
        'lad_cs_quote'     => 'string',
        'lad_cs_tag'       => 'string',   // e.g. 'Speech & Audio', 'Text & NLP'
    ];
 
    foreach ( $fields as $key => $type ) {
        register_post_meta( 'lad_case_study', $key, [
            'type'         => $type,
            'single'       => true,
            'show_in_rest' => true,
            'default'      => '',
        ] );
    }
}
add_action( 'init', 'lad_register_case_study_meta' );
 
/** Admin meta box for Case Studies */
function lad_case_study_meta_box() {
    add_meta_box(
        'lad_case_study_details',
        'Case Study Details',
        'lad_case_study_meta_box_html',
        'lad_case_study',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'lad_case_study_meta_box' );
 
function lad_case_study_meta_box_html( $post ) {
    wp_nonce_field( 'lad_case_study_save', 'lad_case_study_nonce' );
 
    $location = get_post_meta( $post->ID, 'lad_cs_location', true );
    $role     = get_post_meta( $post->ID, 'lad_cs_role', true );
    $audience = get_post_meta( $post->ID, 'lad_cs_audience', true );
    $tools    = get_post_meta( $post->ID, 'lad_cs_tools', true ); // stored as JSON string
    $problem  = get_post_meta( $post->ID, 'lad_cs_problem', true );
    $outcome  = get_post_meta( $post->ID, 'lad_cs_outcome', true );
    $quote    = get_post_meta( $post->ID, 'lad_cs_quote', true );
    $tag      = get_post_meta( $post->ID, 'lad_cs_tag', true );
 
    // Decode tools for checkboxes
    $selected_tools = $tools ? json_decode( $tools, true ) : [];
    $all_tools = [ 'NOODL Licence', 'Split Sheet', 'Dictionary', 'Resource Library' ];
    $all_audiences = [ 'Dataset Creator', 'Researcher', 'Community', 'Policymaker' ];
    ?>
    <table class="form-table">
        <tr>
            <th><label>Person Name</label></th>
            <td><em>Use the post Title field above for the person's name.</em></td>
        </tr>
        <tr>
            <th><label for="lad_cs_location">Location</label></th>
            <td><input type="text" id="lad_cs_location" name="lad_cs_location" value="<?php echo esc_attr( $location ); ?>" class="regular-text" placeholder="e.g. Nigeria" /></td>
        </tr>
        <tr>
            <th><label for="lad_cs_role">Role</label></th>
            <td><input type="text" id="lad_cs_role" name="lad_cs_role" value="<?php echo esc_attr( $role ); ?>" class="regular-text" placeholder="e.g. Computational Linguist" /></td>
        </tr>
        <tr>
            <th><label>Audience</label></th>
            <td>
                <select name="lad_cs_audience" id="lad_cs_audience">
                    <?php foreach ( $all_audiences as $aud ) : ?>
                        <option value="<?php echo esc_attr( $aud ); ?>" <?php selected( $audience, $aud ); ?>>
                            <?php echo esc_html( $aud ); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </td>
        </tr>
        <tr>
            <th><label>Tools Used</label></th>
            <td>
                <?php foreach ( $all_tools as $tool ) : ?>
                    <label style="display:block; margin-bottom:4px;">
                        <input type="checkbox" name="lad_cs_tools[]" value="<?php echo esc_attr( $tool ); ?>"
                            <?php checked( in_array( $tool, $selected_tools ) ); ?> />
                        <?php echo esc_html( $tool ); ?>
                    </label>
                <?php endforeach; ?>
            </td>
        </tr>
        <tr>
            <th><label for="lad_cs_tag">Tag</label></th>
            <td><input type="text" id="lad_cs_tag" name="lad_cs_tag" value="<?php echo esc_attr( $tag ); ?>" class="regular-text" placeholder="e.g. Speech &amp; Audio" /></td>
        </tr>
        <tr>
            <th><label for="lad_cs_problem">The Challenge</label></th>
            <td><textarea id="lad_cs_problem" name="lad_cs_problem" rows="5" class="large-text"><?php echo esc_textarea( $problem ); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="lad_cs_outcome">What Happened (Outcome)</label></th>
            <td><textarea id="lad_cs_outcome" name="lad_cs_outcome" rows="5" class="large-text"><?php echo esc_textarea( $outcome ); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="lad_cs_quote">Quote (optional)</label></th>
            <td><textarea id="lad_cs_quote" name="lad_cs_quote" rows="3" class="large-text"><?php echo esc_textarea( $quote ); ?></textarea></td>
        </tr>
    </table>
    <?php
}
 
function lad_save_case_study_meta( $post_id ) {
    if ( ! isset( $_POST['lad_case_study_nonce'] ) || ! wp_verify_nonce( $_POST['lad_case_study_nonce'], 'lad_case_study_save' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;
 
    $text_fields = [ 'lad_cs_location', 'lad_cs_role', 'lad_cs_audience', 'lad_cs_problem', 'lad_cs_outcome', 'lad_cs_quote', 'lad_cs_tag' ];
    foreach ( $text_fields as $field ) {
        if ( isset( $_POST[$field] ) ) {
            update_post_meta( $post_id, $field, sanitize_textarea_field( $_POST[$field] ) );
        }
    }
 
    // Tools: stored as JSON array
    $tools = isset( $_POST['lad_cs_tools'] ) ? array_map( 'sanitize_text_field', $_POST['lad_cs_tools'] ) : [];
    update_post_meta( $post_id, 'lad_cs_tools', wp_json_encode( $tools ) );
}
add_action( 'save_post_lad_case_study', 'lad_save_case_study_meta' );
 
 
// ── 2. RESOURCES ──────────────────────────────────────────────────────────────
 
function lad_register_resource_post_type() {
    register_post_type( 'lad_resource', [
        'labels' => [
            'name'          => 'Resources',
            'singular_name' => 'Resource',
            'add_new_item'  => 'Add New Resource',
            'edit_item'     => 'Edit Resource',
        ],
        'public'       => true,
        'has_archive'  => false,
        'show_in_rest' => true,
        'supports'     => [ 'title' ],   // title = resource title
        'rewrite'      => [ 'slug' => 'resources' ],
        'menu_icon'    => 'dashicons-book-alt',
    ] );
}
add_action( 'init', 'lad_register_resource_post_type' );
 
function lad_register_resource_meta() {
    $fields = [
        'lad_res_format'       => 'string', // 'Videos' | 'Reports' | etc.
        'lad_res_description'  => 'string',
        'lad_res_date'         => 'string',
        'lad_res_duration'     => 'string',
        'lad_res_language'     => 'string',
        'lad_res_author'       => 'string',
        'lad_res_outlet'       => 'string',
        'lad_res_link'         => 'string',
        'lad_res_downloadable' => 'boolean',
        'lad_res_coming_soon'  => 'boolean',
    ];
 
    foreach ( $fields as $key => $type ) {
        register_post_meta( 'lad_resource', $key, [
            'type'         => $type,
            'single'       => true,
            'show_in_rest' => true,
            'default'      => ( $type === 'boolean' ) ? false : '',
        ] );
    }
}
add_action( 'init', 'lad_register_resource_meta' );
 
function lad_resource_meta_box() {
    add_meta_box(
        'lad_resource_details',
        'Resource Details',
        'lad_resource_meta_box_html',
        'lad_resource',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'lad_resource_meta_box' );
 
function lad_resource_meta_box_html( $post ) {
    wp_nonce_field( 'lad_resource_save', 'lad_resource_nonce' );
 
    $format       = get_post_meta( $post->ID, 'lad_res_format', true );
    $description  = get_post_meta( $post->ID, 'lad_res_description', true );
    $date         = get_post_meta( $post->ID, 'lad_res_date', true );
    $duration     = get_post_meta( $post->ID, 'lad_res_duration', true );
    $language     = get_post_meta( $post->ID, 'lad_res_language', true );
    $author       = get_post_meta( $post->ID, 'lad_res_author', true );
    $outlet       = get_post_meta( $post->ID, 'lad_res_outlet', true );
    $link         = get_post_meta( $post->ID, 'lad_res_link', true );
    $downloadable = get_post_meta( $post->ID, 'lad_res_downloadable', true );
    $coming_soon  = get_post_meta( $post->ID, 'lad_res_coming_soon', true );
 
    $all_formats = [ 'Videos', 'Summaries & Explainers', 'Policy Briefs', 'Reports', 'Articles & Publications', 'Audio Explainers' ];
    ?>
    <p><em>Use the post Title field above for the resource title.</em></p>
    <table class="form-table">
        <tr>
            <th><label for="lad_res_format">Format</label></th>
            <td>
                <select name="lad_res_format" id="lad_res_format">
                    <option value="">— Select format —</option>
                    <?php foreach ( $all_formats as $fmt ) : ?>
                        <option value="<?php echo esc_attr( $fmt ); ?>" <?php selected( $format, $fmt ); ?>>
                            <?php echo esc_html( $fmt ); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="lad_res_description">Description</label></th>
            <td><textarea id="lad_res_description" name="lad_res_description" rows="4" class="large-text"><?php echo esc_textarea( $description ); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="lad_res_outlet">Outlet / Publisher</label></th>
            <td><input type="text" id="lad_res_outlet" name="lad_res_outlet" value="<?php echo esc_attr( $outlet ); ?>" class="regular-text" placeholder="e.g. MIT Technology Review" /></td>
        </tr>
        <tr>
            <th><label for="lad_res_author">Author(s)</label></th>
            <td><input type="text" id="lad_res_author" name="lad_res_author" value="<?php echo esc_attr( $author ); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="lad_res_date">Date</label></th>
            <td><input type="text" id="lad_res_date" name="lad_res_date" value="<?php echo esc_attr( $date ); ?>" class="regular-text" placeholder="e.g. 21 April 2026" /></td>
        </tr>
        <tr>
            <th><label for="lad_res_language">Language</label></th>
            <td><input type="text" id="lad_res_language" name="lad_res_language" value="<?php echo esc_attr( $language ); ?>" class="regular-text" placeholder="e.g. English" /></td>
        </tr>
        <tr>
            <th><label for="lad_res_duration">Duration / Watch Label</label></th>
            <td><input type="text" id="lad_res_duration" name="lad_res_duration" value="<?php echo esc_attr( $duration ); ?>" class="regular-text" placeholder="e.g. Watch on YouTube" /></td>
        </tr>
        <tr>
            <th><label for="lad_res_link">Link URL</label></th>
            <td><input type="url" id="lad_res_link" name="lad_res_link" value="<?php echo esc_attr( $link ); ?>" class="large-text" placeholder="https:// or /internal-path" /></td>
        </tr>
        <tr>
            <th>Flags</th>
            <td>
                <label style="display:block; margin-bottom:6px;">
                    <input type="checkbox" name="lad_res_downloadable" value="1" <?php checked( $downloadable, '1' ); ?> />
                    Downloadable
                </label>
                <label>
                    <input type="checkbox" name="lad_res_coming_soon" value="1" <?php checked( $coming_soon, '1' ); ?> />
                    Coming Soon
                </label>
            </td>
        </tr>
    </table>
    <?php
}
 
function lad_save_resource_meta( $post_id ) {
    if ( ! isset( $_POST['lad_resource_nonce'] ) || ! wp_verify_nonce( $_POST['lad_resource_nonce'], 'lad_resource_save' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;
 
    $text_fields = [ 'lad_res_format', 'lad_res_description', 'lad_res_date', 'lad_res_duration', 'lad_res_language', 'lad_res_author', 'lad_res_outlet' ];
    foreach ( $text_fields as $field ) {
        if ( isset( $_POST[$field] ) ) {
            update_post_meta( $post_id, $field, sanitize_textarea_field( $_POST[$field] ) );
        }
    }
 
    if ( isset( $_POST['lad_res_link'] ) ) {
        update_post_meta( $post_id, 'lad_res_link', esc_url_raw( $_POST['lad_res_link'] ) );
    }
 
    update_post_meta( $post_id, 'lad_res_downloadable', isset( $_POST['lad_res_downloadable'] ) ? '1' : '0' );
    update_post_meta( $post_id, 'lad_res_coming_soon',  isset( $_POST['lad_res_coming_soon'] )  ? '1' : '0' );
}
add_action( 'save_post_lad_resource', 'lad_save_resource_meta' );
 
 
// ── 3. DICTIONARY TERMS ───────────────────────────────────────────────────────
 
function lad_register_dictionary_post_type() {
    register_post_type( 'lad_term', [
        'labels' => [
            'name'          => 'Dictionary Terms',
            'singular_name' => 'Dictionary Term',
            'add_new_item'  => 'Add New Term',
            'edit_item'     => 'Edit Term',
        ],
        'public'       => true,
        'has_archive'  => false,
        'show_in_rest' => true,
        'supports'     => [ 'title' ],  // title = the term
        'rewrite'      => [ 'slug' => 'dictionary' ],
        'menu_icon'    => 'dashicons-editor-textcolor',
    ] );
}
add_action( 'init', 'lad_register_dictionary_post_type' );
 
function lad_register_dictionary_meta() {
    $fields = [
        'lad_term_category'     => 'string',  // 'Legal' | 'Data Governance' | 'NOODL' | 'Technical' | 'Policy'
        'lad_term_definition'   => 'string',
        'lad_term_related'      => 'string',  // comma-separated list of related term names
        'lad_term_example'      => 'string',
    ];
 
    foreach ( $fields as $key => $type ) {
        register_post_meta( 'lad_term', $key, [
            'type'         => $type,
            'single'       => true,
            'show_in_rest' => true,
            'default'      => '',
        ] );
    }
}
add_action( 'init', 'lad_register_dictionary_meta' );
 
function lad_dictionary_meta_box() {
    add_meta_box(
        'lad_term_details',
        'Term Details',
        'lad_dictionary_meta_box_html',
        'lad_term',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'lad_dictionary_meta_box' );
 
function lad_dictionary_meta_box_html( $post ) {
    wp_nonce_field( 'lad_term_save', 'lad_term_nonce' );
 
    $category   = get_post_meta( $post->ID, 'lad_term_category', true );
    $definition = get_post_meta( $post->ID, 'lad_term_definition', true );
    $related    = get_post_meta( $post->ID, 'lad_term_related', true );
    $example    = get_post_meta( $post->ID, 'lad_term_example', true );
 
    $all_categories = [ 'Legal', 'Data Governance', 'NOODL', 'Technical', 'Policy' ];
    ?>
    <p><em>Use the post Title field above for the term name.</em></p>
    <table class="form-table">
        <tr>
            <th><label for="lad_term_category">Category</label></th>
            <td>
                <select name="lad_term_category" id="lad_term_category">
                    <option value="">— Select category —</option>
                    <?php foreach ( $all_categories as $cat ) : ?>
                        <option value="<?php echo esc_attr( $cat ); ?>" <?php selected( $category, $cat ); ?>>
                            <?php echo esc_html( $cat ); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="lad_term_definition">Definition</label></th>
            <td><textarea id="lad_term_definition" name="lad_term_definition" rows="6" class="large-text"><?php echo esc_textarea( $definition ); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="lad_term_related">Related Terms</label></th>
            <td>
                <input type="text" id="lad_term_related" name="lad_term_related" value="<?php echo esc_attr( $related ); ?>" class="large-text" placeholder="Comma-separated, e.g. License, Copyright, Data Rights" />
                <p class="description">Separate each related term with a comma. Term names must match exactly.</p>
            </td>
        </tr>
        <tr>
            <th><label for="lad_term_example">Example in Practice (optional)</label></th>
            <td><textarea id="lad_term_example" name="lad_term_example" rows="4" class="large-text"><?php echo esc_textarea( $example ); ?></textarea></td>
        </tr>
    </table>
    <?php
}
 
function lad_save_dictionary_meta( $post_id ) {
    if ( ! isset( $_POST['lad_term_nonce'] ) || ! wp_verify_nonce( $_POST['lad_term_nonce'], 'lad_term_save' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;
 
    $text_fields = [ 'lad_term_category', 'lad_term_definition', 'lad_term_related', 'lad_term_example' ];
    foreach ( $text_fields as $field ) {
        if ( isset( $_POST[$field] ) ) {
            update_post_meta( $post_id, $field, sanitize_textarea_field( $_POST[$field] ) );
        }
    }
}
add_action( 'save_post_lad_term', 'lad_save_dictionary_meta' );
 
 
// ── 4. FLUSH REWRITES on theme switch (add all 3 types) ───────────────────────
// Note: your existing lad_flush_rewrites already calls lad_register_post_type().
// Replace it with this version that also registers the three new types:
 
remove_action( 'after_switch_theme', 'lad_flush_rewrites' );
 
function lad_flush_all_rewrites() {
    lad_register_post_type();            // your existing lad_update type
    lad_register_case_study_post_type();
    lad_register_resource_post_type();
    lad_register_dictionary_post_type();
    flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'lad_flush_all_rewrites' );
 
?>








