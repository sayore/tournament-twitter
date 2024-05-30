<script lang="ts">
    import Battle from "./Battle.svelte";
    import TwitterUser from "./TwitterUser.svelte";
    import type { Fighter } from "../ts/Fighter";
  let teams: {
      tag: string; guid: string, shortname: string, twittername: string, points: number, avatar: string, banner: string 
}[] = [];
  
  $: teams = [];

  
  type FightTable = Fighter[][];
  
  //people can be added here so their profile picture is added by name
  let round1 : FightTable = [
    [
      { tag: "amykrippner", points:[10,10,10,10], won:0 }, 
      { tag: "eepyfeline", points:[10,10,10,10], won:0 }
    ],
    [
      { tag: "SexyCarnotaurus", points:[10,10,10,10] , won:0 },
      { tag: "bnuyygirl", points:[10,10,10,10] , won:0 },
    ],
    [
      { tag: "Kiraspirin1312", points:[10,10,10,10], won:0  },
      { tag: "minzebeere", points:[10,10,10,10], won:0  },
    ],
    [
      { tag: "EinfachMarie_", points:[10,10,10,10], won:0 },
      { tag: "AleaG0nz", points:[10,10,10,10], won:0 },
    ],
    [
      { tag: "AnnoWurstsaft", points:[10,10,10,10], won:0 }, 
      { tag: "DobbyDobbsen", points:[10,10,10,10], won:0}
    ],
    [
      { tag: "bunarchy", points:[10,10,10,10], won:0 },
      { tag: "sftimiiqx", points:[10,10,10,10], won:0 },
    ],
    [
      { tag: "bunsbrain", points:[10,10,10,10], won:0 },
      { tag: "", points:[10,10,10,10], won:0 },
    ],
    [
      { tag: "", points:[10,10,10,10], won:0 },
      { tag: "", points:[10,10,10,10], won:0 },
    ]
  ];

  function battleExec(ofight:FightTable) : FightTable {
    let fight = <FightTable>JSON.parse(JSON.stringify(ofight));
    let winners : Fighter[] = [];
    for (let i = 0; i < fight.length; i++) {
      // Wenn keine Punkte vorhanden sind, dann wird der fighter zu einem null object mit TBA als name
      if(fight[i][0].points.length == 0 || fight[i][1].points.length == 0){
        winners.push({tag:"", points:[], won:0});
        
      } else
      if (true) {

        // if a fighter's tag is empty, the other fighter wins
        if(fight[i][0].tag == ""){
          ofight[i][1].won = 1;
          winners.push(fight[i][1]);
          continue;
        }
        if(fight[i][1].tag == ""){
          ofight[i][0].won = 1;
          winners.push(fight[i][0]);
          continue;
        }

        // set random winner
        let winnerIndex=Math.floor(Math.random() * 2)
        console.log("random winner is " + winnerIndex)
        let loserIndex=winnerIndex==0?1:0;
        
        ofight[i][winnerIndex].won = 1;
        ofight[i][loserIndex].won = 0;
        winners.push(fight[i][winnerIndex]);
        //loser gets a loser flag
        
      } else
      if (fight[i][0].points > fight[i][1].points) {
        //set winner flag to true
        winners.push(fight[i][0]);
        ofight[i][0].won = 1;
        ofight[i][1].won = 0;
      } else {
        winners.push(fight[i][1]);
        ofight[i][1].won = 1;
        ofight[i][0].won = 0;
      }
    }

    // Remove the first entry of the points at the beginning of each fighter
    winners = winners.map((fighter) => {
      if(fighter.points.length >= 1)
      { fighter.points.shift(); }
      return fighter;
    });

    // pair winners
    let pairs : Fighter[][] = [];
    for (let i = 0; i < winners.length; i += 2) {
      pairs.push([winners[i], winners[i + 1]]);
    }

    return pairs;
  }
  
  console.log(round1);
  let round2 = battleExec(round1);
  console.log(round2);
  let round3 = battleExec(round2);
  console.log(round3);
  let round4 = battleExec(round3);
  console.log(round4);
  
  // let winners of round4 fight against each other, the winner is the winner of the tournament
  // check points, the onw woth more is:
  let winner;
  if (round4[0][0].points === round4[0][1].points) {
    // select random winner
    const randomIndex = Math.floor(Math.random() * 2);
    winner = round4[0][randomIndex];
  } else {
    winner = round4[0][0].points > round4[0][1].points ? round4[0][0] : round4[0][1];
  }

</script>

<main>
  <div class="rows">
    <div class="round1">
      {#each round1 as fighter,i}
        <Battle fighter1={fighter[0]} fighter2={fighter[1]} {i} round={0}/>
      {/each}
    </div>
    <div class="round2" style="gap: 100px;">
      <div class="spacer" style="display:flex;flex-direction:column;">
        {#each round2 as fighter,i}
          <div class="flexel2" style="margin-top:101px;margin-bottom:101px;">
            <Battle fighter1={fighter[0]} fighter2={fighter[1]} {i} round={1}/>
          </div>
        {/each}
      </div>
    </div>
    <div class="round3" style="gap: 100px;">
      <div class="spacer" style="display:flex;flex-direction:column;">
        {#each round3 as fighter,i}
          <div class="flexel3">
            <Battle fighter1={fighter[0]} fighter2={fighter[1]} {i} round={2}/>
          </div>
        {/each}
      </div>
    </div>
 
    <div class="round4" style="gap: 100px;">
      <div class="spacer" style="display:flex;flex-direction:column;">
        {#each round4 as fighter,i}
          <div class="flexel4" style="margin-top:200px;margin-bottom:199px;">
            <Battle fighter1={fighter[0]} fighter2={fighter[1]} {i} round={3}/>
          </div>
        {/each}
      </div>
    </div>
    <div class="round5" style="transform: scale(1.8);">
      <TwitterUser profile={winner.tag} />
    </div>
  </div>
</main>

<style lang="scss">
  main {
    position:relative;
    top:0;
    left:0;
  }
  .flexel3 {
    margin-top: 356px;
    margin-bottom: 357px;
  }
  .rows {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
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
    margin:10px;
    padding: 0px;
    border-radius: 5px;
    width: fit-content;
    border: 1px solid black;
  }

  .team-inner {
    width: 100%;
    display: flex; 
    flex-direction: row-reverse;
    height:100px;
  }

  .has-border {
    border: 1px solid black;
    width: 420px;
  height: 100px;
  }

  .round {
    position:relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

  .round1 {
    position: relative;
    left: 0px;
  }

  .round2 {
    position: relative;
    left: 50px;
  }
  .round3 {
    position: relative;
    left: 100px;

  }
  .round4 {
    position: relative;
    left: 150px;

  }
  .round5 {
    position: relative;
    left: 300px;

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
    border: 1px solid black;
  }
</style>
