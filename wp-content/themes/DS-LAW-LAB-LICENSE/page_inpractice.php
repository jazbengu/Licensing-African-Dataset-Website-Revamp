<?php
/*
Template Name: In Practice
*/

wp_hea();
?>

<div class="container">

    <h1>In Practice</h1>
    <p>Real stories from dataset creators, researchers, communities and policymakers.</p>

    <div class="case-study-grid">

        <?php

        $studies = new WP_Query([
            'post_type' => 'lad_case_study',
            'posts_per_page' => -1
        ]);

        if ($studies->have_posts()) :

            while ($studies->have_posts()) :
                $studies->the_post();

                $location = get_post_meta(get_the_ID(),'lad_cs_location',true);
                $role = get_post_meta(get_the_ID(),'lad_cs_role',true);
                $audience = get_post_meta(get_the_ID(),'lad_cs_audience',true);
                $tag = get_post_meta(get_the_ID(),'lad_cs_tag',true);
        ?>

        <article class="card">

            <span class="tag"><?php echo esc_html($tag); ?></span>

            <h2><?php the_title(); ?></h2>

            <p>
                <?php echo esc_html($location); ?>
                •
                <?php echo esc_html($role); ?>
            </p>

            <p>
                Audience:
                <?php echo esc_html($audience); ?>
            </p>

            <a href="<?php the_permalink(); ?>">
                Read Story →
            </a>

        </article>

        <?php
            endwhile;
            wp_reset_postdata();
        endif;
        ?>

    </div>

</div>

<?php wp_footer(); ?>