<script>
  let teams = [
      'Team 1', 'Team 2', 'Team 3', 'Team 4',
      'Team 5', 'Team 6', 'Team 7', 'Team 8'
  ];

  const generateBracket = (/** @type {any[]} */ teams) => {
      let rounds = [];
      let currentRound = teams.map((team, index) => ({
          team,
          id: `team-${index + 1}`
      }));

      while (currentRound.length > 1) {
          rounds.push(currentRound);
          currentRound = Array.from({ length: Math.ceil(currentRound.length / 2) }, (_, i) => ({
              team: `Winner ${i + 1}`,
              id: `winner-${i + 1}`
          }));
      }

      rounds.push(currentRound);
      return rounds;
  };

  let rounds = generateBracket(teams);
</script>

<div class="tournament">
  {#each rounds as round, roundIndex}
      <div class="round round-{roundIndex + 1}">
          {#each round as matchup}
              <div class="matchup">
                  <div class="team">{matchup.team}</div>
              </div>
          {/each}
      </div>
  {/each}
</div>

<style>
.tournament {
  display: flex;
  justify-content: center;
  align-items: center;
}

.round {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  position: relative;
}

.matchup {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  position: relative;
}

.matchup .team {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  width: 100px;
  text-align: center;
  margin: 5px 0;
  position: relative;
  z-index: 1;
}

.matchup:before, .matchup:after {
  content: '';
  position: absolute;
  width: 20px;
  border-top: 1px solid #000;
}

.matchup:before {
  left: -20px;
  top: 50%;
  margin-top: -1px;
}

.matchup:after {
  right: -20px;
  top: 50%;
  margin-top: -1px;
  border-right: 1px solid #000;
}

.round-1 .matchup:before, .round-1 .matchup:after {
  height: 60px;
}

.round-2 .matchup:before, .round-2 .matchup:after {
  height: 140px;
}

.round-3 .matchup:before, .round-3 .matchup:after {
  height: 300px;
}

.round-1 .matchup + .matchup:before {
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
  width: 20px;
  height: 30px;
  top: -15px;
  left: -20px;
}

.round-2 .matchup + .matchup:before {
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
  width: 20px;
  height: 70px;
  top: -35px;
  left: -20px;
}

.round-3 .matchup + .matchup:before {
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
  width: 20px;
  height: 150px;
  top: -75px;
  left: -20px;
}


</style>
