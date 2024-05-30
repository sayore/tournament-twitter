<script lang="ts">
  import TwitterUser from "./TwitterUser.svelte";
  export let profile;
  export let params;
</script>

<foreignObject id={profile} class="box" x={Math.random() * 1400} y={Math.random() * 1400} width="420" height="100" z="10">
  <body xmlns="http://www.w3.org/1999/xhtml">
    <TwitterUser profile={profile} />
  </body> 
</foreignObject>