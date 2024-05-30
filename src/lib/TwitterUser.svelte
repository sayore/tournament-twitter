<script lang="ts">
  import type { Profile } from "../class/Profile";

  export let profile;
  export let lines = [500,500];
  let avatar = "data.avatar";
  let banner = "data.banner";
  let twittername = profile;

  async function getProfile(tag: string): Promise<Profile> {
    let response = await fetch("http://127.0.0.1/profile/" + tag);
    return response.json();
  }
  if(profile != null && profile !="")
  getProfile(profile).then((data) => {
    avatar = data.avatar ?? "";
    banner = "background-image: url('"+data.banner+"')" ?? "background:linear-gradient(45deg,#e66465, #9198e5);z-index:2;";
    twittername = data.name ?? "";
  });
  else{
    avatar = "";
    banner = "background:linear-gradient(45deg,#e66465, #9198e5);z-index:2;";
    twittername = "";
  }
</script>

<div class="bracket">
  <div class="team">
    <div class="team-inner" style={("opacity:"+(twittername?1:0+";"))}>
      <div style="position:absolute;left:0%;top:0%;">
        <!-- div for line x-axis -->
        <div class="x-line" style={"z-index:-2;position:relative;left:50%;top:50px;width:"+lines[0]+"px;border:3px solid black;"}>
          
        </div>
        <!-- div for line x-axis -->
        <div class="y-line" style={"z-index:-2;position:relative;left:calc( 252px + "+lines[0]+"px );top:50px;height:"+lines[1]+"px;border:3px solid black;"}>
        
        </div>
      </div>
      <div class="avatar" style={"background-image: url('"+avatar+"')"} />
      <div class="banner" style={banner} ><h3 style={("opacity:"+(twittername?1:0+";"))}>{twittername}</h3></div>
    </div>
  </div>
</div>

<style lang="scss">
    main {
    position:relative;
    top:0;
    left:0;
  }

  .bracket {
    border:1px solid #ccc;
  }

  .team {
    h3 {
      background-color: white;
      margin-left: 10px;
      margin-bottom: 10px;
      border:1px solid #ccc;
      box-shadow: 0px 0px 5px 0px #ccc;
      position: relative;
      bottom:0;
      display:block;
      opacity: 0.77;
      bottom: -60px;
    }
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0px;
    padding: 0px;
    border-radius: 5px;
    width: fit-content;
  }

  .team-inner {
    width: 100%;
    display: flex; 
    flex-direction: row-reverse;
    height:100px;
  }

  .has-border {
    
    width: 420px;
  height: 100px;
  }

  .round {
    position:relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

  .round-1 {
    position:absolute;
    left: 487px;
    top: 58px;
    gap: 82px;
  }

  .round-2 {
    position: absolute;
    left: 962px;
    top: 150px;
    gap: 274px;
  }

  div.avatar {
    width: 100px;
    height: 100px;
    object-fit: fill;

    background-size: cover;
    //border-radius: 50%;
  }

  div.banner {
    position: relative;
    height: 100px;
    width:320px;
    object-fit: cover;
    background-color: white;
    background-size: 320px auto;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>