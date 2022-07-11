<script lang="ts">
  // import logo from "./assets/logo-ro-light.svg";

  setTimeout(function () {
    d3.select("#verticalLine")
      .transition()
      .duration(1000)
      .style("height", "400px");
  }, 100);
</script>

<!-- <p>Hallo</p> -->
<p
  style="font-size:30px; font-weight: 800; color:
  #154273; position:absolute; left:-500px; top:10px;"
>
  Energie & CO<sub>2</sub>-balans
</p>
<p id="subtitle" style="position:absolute;left:-498px; top:60px;">
  Visualisatietoolkit
</p>
<div
  class="center"
  id="verticalLine"
  style="z-index:10; position:relative; left:-550px; top:35px; width: 4px; height:0px; background-color: #154273;"
/>
<!-- <p style="position:absolute; toppx;left: 75px; font-size:15px; color:#888">
  Versie 20-6-2022
</p> -->

<!-- <div style="margin-left:50%;"> -->
<!-- <img src={logo} id="rijkslogo" alt="Logo Rijksoverheid" /> -->
<!-- </div> -->
<!-- <div style="position:absolute; top:20px; right:20px;" /> -->

<!-- <pre class="status">Clicked: {clicked}</pre> -->
<style>
</style>
