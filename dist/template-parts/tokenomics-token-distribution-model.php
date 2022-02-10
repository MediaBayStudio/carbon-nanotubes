<section class="tokenomics-distribution container sect">
  <span class="tokenomics-distribution__top-text sect-top-text"><?php echo $section['upper_text'] ?></span>
  <h2 class="tokenomics-distribution__title sect-title"><?php echo $section['title'] ?></h2>
  <div class="tokenomics-distribution__chart-block">
    <div class="tokenomics-distribution__chart-wrap">
      <canvas class="tokenomics-distribution__chart distribution-chart" width="280" height="280"></canvas>
      <div class="tokenomics-distribution__chart-tooltip"></div>
    </div>
    <div class="distribution-chart__data">
      <p class="distribution-chart__data-title"><?php echo $section['max_supply'] ?></p> <?php
        foreach ( $section['distributions'] as $item ) : ?>
          <div class="distribution-chart__data-item">
            <div class="distribution-chart__data-item-color" style="background: <?php echo $item['color'] ?>"></div>
            <span class="distribution-chart__data-item-title"><?php echo $item['title'] ?></span>
            <span class="distribution-chart__data-item-descr"><?php echo $item['descr'] ?></span>
          </div> <?php
        endforeach ?>
    </div>
  </div>
</section>
<div class="tokenomics-supply container sect-bg">
  <div class="tokenomics-supply__block">
    <p class="tokenomics-supply__number"><?php echo $section['max_supply_number'] ?></p>
    <p class="tokenomics-supply__text"><?php echo $section['max_supply_text'] ?></p>
  </div>
  <div class="tokenomics-supply__block">
    <p class="tokenomics-supply__number"><?php echo $section['total_supply_number'] ?></p>
    <p class="tokenomics-supply__text"><?php echo $section['total_supply_text'] ?></p>
  </div>
</div>
<div class="tokenomics-table-block container sect">
  <div class="tokenomics-table-block__text">
    <p class="tokenomics-table-block__title"><?php echo $section['table_title'] ?></p>
    <p class="tokenomics-table-block__descr"><?php echo $section['table_descr'] ?></p>
  </div> <?php
    if ( !empty( $section['table'] ) ) {
      echo '<div class="tokenomics-table-block__wrap">';
      echo '<table class="tokenomics-table-block__table tokenomics-table">';
      if ( !empty( $section['table']['header'] ) ) {
        echo '<thead class="tokenomics-table__hdr">';
          echo '<tr class="tokenomics-table__tr">';
            foreach ( $section['table']['header'] as $th ) {
              echo '<th class="tokenomics-table__th">';
                echo $th['c'];
              echo '</th>';
            }
          echo '</tr>';
        echo '</thead>';
      }
      echo '<tbody class="tokenomics-table__body">';
        foreach ( $section['table']['body'] as $tr ) {
          echo '<tr class="tokenomics-table__tr">';
            foreach ( $tr as $td ) {
              echo '<td class="tokenomics-table__td">';
                echo $td['c'];
              echo '</td>';
            }
          echo '</tr>';
        }
      echo '</tbody>';
      echo '</table></div></div>';
    } ?>
</div>