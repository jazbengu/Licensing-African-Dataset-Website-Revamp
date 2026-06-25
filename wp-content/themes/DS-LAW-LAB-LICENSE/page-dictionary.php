<?php
/*
Template Name: Dictionary
*/
die('DICTIONARY TEMPLATE LOADED');
wp_head();

$terms = get_posts([
    'post_type' => 'lad_term',
    'posts_per_page' => -1,
    'orderby' => 'title',
    'order' => 'ASC'
]);

$grouped = [];

foreach ($terms as $term) {
    $letter = strtoupper(substr($term->post_title, 0, 1));
    $grouped[$letter][] = $term;
}
?>

<div class="dictionary-page">

    <div class="dictionary-header">
        <h1>Dictionary</h1>

        <p>
            Explore key legal, technical and governance concepts
            related to African datasets and licensing.
        </p>

        <input
            type="text"
            id="dictionary-search"
            placeholder="Search terms..."
        >
    </div>

    <div class="dictionary-nav">

        <?php foreach(range('A','Z') as $letter): ?>

            <a href="#letter-<?php echo $letter; ?>">
                <?php echo $letter; ?>
            </a>

        <?php endforeach; ?>

    </div>

    <?php foreach(range('A','Z') as $letter): ?>

        <?php if(empty($grouped[$letter])) continue; ?>

        <section
            id="letter-<?php echo $letter; ?>"
            class="dictionary-letter-section"
        >

            <h2><?php echo $letter; ?></h2>

            <?php foreach($grouped[$letter] as $term):

                $category = get_post_meta($term->ID,'lad_term_category',true);
                $definition = get_post_meta($term->ID,'lad_term_definition',true);
                $related = get_post_meta($term->ID,'lad_term_related',true);
                $example = get_post_meta($term->ID,'lad_term_example',true);

            ?>

                <article
                    id="<?php echo sanitize_title($term->post_title); ?>"
                    class="dictionary-term"
                >

                    <h3><?php echo esc_html($term->post_title); ?></h3>

                    <?php if($category): ?>
                        <span class="term-category">
                            <?php echo esc_html($category); ?>
                        </span>
                    <?php endif; ?>

                    <div class="term-definition">
                        <?php echo wpautop($definition); ?>
                    </div>

                    <?php if($example): ?>
                        <div class="term-example">
                            <strong>Example:</strong>
                            <?php echo esc_html($example); ?>
                        </div>
                    <?php endif; ?>

                    <?php if($related): ?>

                        <div class="related-terms">

                            <strong>Related Terms:</strong>

                            <?php
                            $related_terms = explode(',', $related);

                            foreach($related_terms as $related_term):

                                $slug = sanitize_title(trim($related_term));
                            ?>

                                <a href="#<?php echo $slug; ?>">
                                    <?php echo trim($related_term); ?>
                                </a>

                            <?php endforeach; ?>

                        </div>

                    <?php endif; ?>

                </article>

            <?php endforeach; ?>

        </section>

    <?php endforeach; ?>

</div>

<script>
document.addEventListener("DOMContentLoaded", () => {

    const search = document.getElementById("dictionary-search");

    if(!search) return;

    const terms = document.querySelectorAll(".dictionary-term");

    search.addEventListener("keyup", () => {

        const value = search.value.toLowerCase();

        terms.forEach(term => {

            const text = term.innerText.toLowerCase();

            term.style.display =
                text.includes(value)
                ? "block"
                : "none";

        });

    });

});
</script>

<?php wp_footer(); ?>