<script>
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(godoit, 1000);

    function godoit() {
      tekenCESDiagrammen({
        // datapath: "/src/assets/CES.csv",
        targetDiv: "page",
        clusterSelectie: "Rotterdam",
      });

      // tekenCESDiagrammen({
      //   // datapath: "/src/assets/CES.csv",
      //   targetDiv: "page",
      //   clusterSelectie: "Noord-Nederland",
      // });

      // tekenCESDiagrammen({
      //   datapath: "/src/assets/CES.csv",
      //   targetDiv: "page",
      //   clusterSelectie: "Chemelot",
      // });
    }
  });
</script>

<style>
</style>
