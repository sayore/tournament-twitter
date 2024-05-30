<script lang="ts">
    import TwitterUser from "./TwitterUser.svelte";
    import type { Fighter } from "../ts/Fighter";

    export let fighter1 : Fighter;
    export let fighter2: Fighter;
    export let i;
    export let round;

    .getBoundingClientRect();
</script>


<div>
  <div class="battle">
    {#if false}
      {#if fighter1.won && i % 2 == 0}
        <div class="bracket-winner-lines-4" style={"height:"+[150,380,620,0][round]+"px;border-color:black;opacity:"+(fighter1.won==1?1:0)}></div>
        <div class="bracket-winner-lines-1" style="width:500px; border-top:1px solid black;"></div>
      {/if}
      {#if fighter1.won && i % 2 != 0} <!-- // if fighter1 won and is on bottom bracket -->
        <div class="bracket-winner-lines-1" style="width:500px; border-top:1px solid red;"></div>
      {/if}
      {#if fighter2.won && i % 2 != 0} <!-- // if fighter2 won and is on bottom bracket -->
        <div class="bracket-winner-lines-1" style="width:500px; border-top:1px solid green;position:absolute;top:154px;"></div>
        <div class="bracket-winner-lines-3" style={"height:"+[150,380,620,0][round]+"px;border-color:green;opacity:"+(fighter1.won==0?1:0)}></div>
      {/if}
      {#if fighter2.won && i % 2 == 0}
        <div class="bracket-winner-lines-1" style="width:500px; border-top:1px solid blue;position:absolute;top:153px;"></div>
      {/if}
    {/if}
    <TwitterUser profile={fighter1.tag} lines={[500,10]}/>
    <TwitterUser profile={fighter2.tag} lines={[500,-10]}/>
  </div>
</div>

<style lang="scss">
.battle {
    position: relative;
    margin: 50px;
  }
  .bracket-winner-lines-1 {
    height: 99px;
    position: absolute;
    right: -354px;
    top: 50px;
    width: 451px;
  }

  .bracket-winner-lines-2 {
    border-bottom: 9px solid #fff;
    height: 1px;
    position: relative;
    right: -100px;
    top: 50px;
    width: 50px;
  }
  .bracket-winner-lines-3 {
    border-right: 5px solid #c00;
    height: 50px;
    position: absolute;
    right: -354px;
    top: -226px;
    width: 1px;
    z-index: -3;
  }
  .bracket-winner-lines-4 {
    border-right: 12px solid #0c0;
    height: 50px;
    position: absolute;
    right: -354px;
    bottom: 6px;
    width: 1px;
    z-index: -3;
  }
</style>