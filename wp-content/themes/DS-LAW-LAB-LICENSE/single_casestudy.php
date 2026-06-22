<?php wp_head(); ?>


<?php while(have_posts()) : the_post();

$location = get_post_meta(get_the_ID(),'lad_cs_location',true);
$role = get_post_meta(get_the_ID(),'lad_cs_role',true);
$audience = get_post_meta(get_the_ID(),'lad_cs_audience',true);
$tools = json_decode(get_post_meta(get_the_ID(),'lad_cs_tools',true),true);
$problem = get_post_meta(get_the_ID(),'lad_cs_problem',true);
$outcome = get_post_meta(get_the_ID(),'lad_cs_outcome',true);
$quote = get_post_meta(get_the_ID(),'lad_cs_quote',true);
$tag = get_post_meta(get_the_ID(),'lad_cs_tag',true);

?>

<div class="container">

    <a href="/in-practice">← Back to In Practice</a>

    <h1><?php the_title(); ?></h1>

    <p><?php echo esc_html($location); ?></p>
    <p><?php echo esc_html($role); ?></p>
    <p><?php echo esc_html($audience); ?></p>

    <span><?php echo esc_html($tag); ?></span>

    <h2>Tools Used</h2>

    <ul>
        <?php
        if($tools){
            foreach($tools as $tool){
                echo '<li>'.esc_html($tool).'</li>';
            }
        }
        ?>
    </ul>

    <h2>The Challenge</h2>
    <p><?php echo wpautop($problem); ?></p>

    <h2>What Happened</h2>
    <p><?php echo wpautop($outcome); ?></p>

    <?php if($quote): ?>
        <blockquote>
            "<?php echo esc_html($quote); ?>"
        </blockquote>
    <?php endif; ?>

</div>

<?php endwhile; ?>

<?php wp_footer(); ?>