<section class="index-faq container sect">
  <span class="index-faq__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
  <h2 class="index-faq__title sect-title"><?php echo $section['title'] ?></h2>
  <div class="index-faq__whitepaper-block">
    <p class="index-faq__descr"><?php echo $section['descr'] ?></p>
    <a href="<?php echo "{$site_url}/whitepaper.pdf" ?>" class="index-faq__whitepaper-btn btn btn-grey btn-whitepaper">Whitepaper</a>
  </div>
  <ul class="index-faq__list"> <?php
    foreach ( $section['faq'] as $faq ) : ?>
      <li class="index-faq__item">
        <span class="index-faq__item-question"><?php echo $faq['question'] ?><span class="index-faq__item-cross"></span></span>
        <p class="index-faq__item-answer"><?php echo $faq['answer'] ?></p>
      </li> <?php
    endforeach ?>
  </ul>
</section>