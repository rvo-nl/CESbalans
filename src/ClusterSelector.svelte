<script lang="ts">
  import type { MenuComponentDev } from "@smui/menu";
  import Menu from "@smui/menu";
  import { Anchor } from "@smui/menu-surface";
  import List, {
    Item,
    Separator,
    Text,
    PrimaryText,
    SecondaryText,
  } from "@smui/list";
  import Button, { Label } from "@smui/button";
  import HelpCircle from "svelte-material-icons/HelpCircle.svelte";
  import Printer from "svelte-material-icons/Printer.svelte";
  import FileImage from "svelte-material-icons/FileImage.svelte";

  let menu: MenuComponentDev;
  let anchor: HTMLDivElement;
  let anchorClasses: { [k: string]: boolean } = {};
  let clicked = "nothing yet";

  export let size = "1.5em";
  export let width = size;
  export let height = size;
  export let color = "currentColor";
  export let viewBox = "0 0 24 24";

  // setTimeout(enButton, 1000);
  // function enButton() {
  //   enableButton = true;\

  let enableButton = false;

  window.genereerafbeelding = () => {
    console.log("call");
    html2canvas(document.querySelector("#page")).then((canvas) => {
      document.body.appendChild(canvas);
    });
  };

  function printDivContent() {
    window.print();
  }

  window.initClusterSelector = () => {
    enableButton = true;
  };
  // }
</script>

<div
  class={Object.keys(anchorClasses).join(" ")}
  use:Anchor={{
    addClass: (className) => {
      if (!anchorClasses[className]) {
        anchorClasses[className] = true;
      }
    },
    removeClass: (className) => {
      if (anchorClasses[className]) {
        delete anchorClasses[className];
        anchorClasses = anchorClasses;
      }
    },
  }}
  bind:this={anchor}
>
  <Button
    style="position:absolute;top:0px;height:50px; width:140px;"
    on:click={() => menu.setOpen(true)}
    variant="raised"
  >
    <Label>KIES CLUSTER</Label>
  </Button>
  <Menu
    bind:this={menu}
    anchor={false}
    bind:anchorElement={anchor}
    anchorCorner="BOTTOM_LEFT"
  >
    <List twoLine>
      <!-- {console.log(testObject.keys())} -->
      {#if enableButton}
        {#each Object.keys(processedDataSet) as cluster, i}
          <Item
            on:SMUI:action={() =>
              tekenCESDiagrammen({
                targetDiv: "page",
                clusterSelectie: cluster,
              })}
          >
            <Text>
              <PrimaryText>{cluster}</PrimaryText>
              <SecondaryText>Subtext</SecondaryText>
            </Text>
          </Item>
        {/each}
      {/if}
      <!-- <Item on:SMUI:action={() => (clicked = "Copy")}>
        <Text>
          <PrimaryText>Copy</PrimaryText>
          <SecondaryText>Copy to clipboard.</SecondaryText>
        </Text>
      </Item>
      <Item on:SMUI:action={() => (clicked = "Paste")}>
        <Text>
          <PrimaryText>Paste</PrimaryText>
          <SecondaryText>Paste from clipboard.</SecondaryText>
        </Text>
      </Item>
      <Separator />
      <Item on:SMUI:action={() => (clicked = "Delete")}>
        <Text>
          <PrimaryText>Delete</PrimaryText>
          <SecondaryText>Remove item.</SecondaryText>
        </Text>
      </Item> -->
    </List>
  </Menu>
</div>

<Button
  style="position:absolute; left:-80px; top: 0px; height:50px; font-size:18px; color:white;"
  on:click={() =>
    // genereerafbeelding()
    window.alert("Functie 'opslaan als afbeelding' is nog niet beschikbaar.")}
  variant="raised"
  ><FileImage {color} {size} {width} {height} {viewBox} />
  <Label />
</Button>

<Button
  style="position:absolute; left:-160px; top: 0px; height:50px; font-size:18px; color:white;"
  on:click={() => printDivContent()}
  variant="raised"
  ><Printer {color} {size} {width} {height} {viewBox} />
  <Label />
</Button>

<style>
</style>
