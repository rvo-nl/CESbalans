<script lang="ts">
  import Button, { Label } from "@smui/button";
  import type { MenuComponentDev } from "@smui/menu";
  import FolderOpen from "svelte-material-icons/FolderOpen.svelte";
  import Download from "svelte-material-icons/Download.svelte";
  import Eye from "svelte-material-icons/Eye.svelte";
  import HelpCircle from "svelte-material-icons/HelpCircle.svelte";
  // openVoorbeeldFile();

  function openVoorbeeldFile() {
    loadDataViaURL("/src/assets/Sjabloonbestand.xlsx");
  }

  function openFile() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_this) => {
      let files = Array.from(input.files);
      console.log(files);

      var XLSXfile = files[0];

      var file = XLSXfile;
      var reader = new FileReader();
      reader.onload = function (event) {
        console.log(event.target.result);
        loadDataViaDragDrop(event.target.result);
        //holder.style.background = 'url(' + event.target.result + ') no-repeat center';
      };

      console.log(file);
      reader.readAsArrayBuffer(file);
    };
    input.click();
  }
  d3.selectAll("#animatedgif").remove();
  d3.select("#menu")
    .append("img")
    .attr("id", "animatedgif")
    .attr("src", "/src/assets/draganddropexplainer.gif")
    .attr("width", "1000px")
    .style("position", "relative")
    .style("top", "100px")
    .style("left", "0px");

  export let size = "2em";
  export let width = size;
  export let height = size;
  export let color = "currentColor";
  export let viewBox = "0 0 24 24";
</script>

<span class="mdi-folder-open" />
<Button
  style="position:absolute; left:0px; height: 60px; top: 30px; width:300px; font-size:18px; color:white;"
  on:click={() => openFile()}
  variant="unelevated"
>
  <FolderOpen {color} {size} {width} {height} {viewBox} />
  &nbsp&nbsp
  <Label>Open .XLSX bestand</Label>
</Button>

<Button
  style="position:absolute; left: 308px; top:30px; width:310px; height:60px; font-size:18px; color:white;"
  on:click={() => window.open("/src/assets/Sjabloonbestand.xlsx")}
  variant="unelevated"
  ><Download {color} {size} {width} {height} {viewBox} />
  &nbsp&nbsp
  <Label>Download sjabloon</Label>
</Button>

<Button
  style="position:absolute; left:626px; top: 30px; width: 250px; height:60px; font-size:18px; color:white;"
  on:click={() => openVoorbeeldFile()}
  variant="unelevated"
  ><Eye {color} {size} {width} {height} {viewBox} />
  &nbsp&nbsp
  <Label>Toon sjabloon</Label>
</Button>

<Button
  style="position:absolute; left:885px; top: 30px; height:60px; font-size:18px; color:white;"
  on:click={() =>
    window.alert("Functie 'Toon handleiding' is nog niet beschikbaar.")}
  variant="unelevated"
  ><HelpCircle {color} {size} {width} {height} {viewBox} />

  <Label />
</Button>

<p
  style="position:absolute; left: 160px;top:20px; height: 100%; font-size:30px;"
/>

<style>
</style>
