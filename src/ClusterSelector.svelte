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

  let menu: MenuComponentDev;
  let anchor: HTMLDivElement;
  let anchorClasses: { [k: string]: boolean } = {};
  let clicked = "nothing yet";

  let testObject = ["Aap", "Noot", "Mies"];
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
  <Button on:click={() => menu.setOpen(true)} variant="raised">
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
            <SecondaryText>Copy to clipboard and remove.</SecondaryText>
          </Text>
        </Item>
      {/each}
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

<style>
</style>
