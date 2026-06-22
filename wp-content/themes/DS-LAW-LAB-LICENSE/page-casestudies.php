<?php
/*
Template Name: Case Studies
*/

wp_head();
?>

<div class="container">

    <h1>Case Studies</h1>

    <?php

    $query = new WP_Query([
        'post_type' => 'lad_case_study',
        'posts_per_page' => -1
    ]);

    if($query->have_posts()) :

        while($query->have_posts()) :
            $query->the_post();
    ?>

        <article class="card">

            <h2><?php the_title(); ?></h2>

            <p>
                <?php
                echo wp_trim_words(
                    get_post_meta(
                        get_the_ID(),
                        'lad_cs_problem',
                        true
                    ),
                    30
                );
                ?>
            </p>

            <a href="<?php the_permalink(); ?>">
                View Case Study →
            </a>

        </article>

    <?php
        endwhile;
        wp_reset_postdata();
    endif;
    ?>

</div>

<?php wp_footer(); ?>