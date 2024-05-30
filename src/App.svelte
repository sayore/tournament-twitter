<script lang="ts">
  import { onMount } from "svelte";
    import SVGTwitterUser from "./lib/SVGTwitterUser.svelte";
    import { Corner } from "./ts/Corner";

    class Player {
      constructor(
        public tag: string = "",
        public points: number[] = [],
        public element?: SVGForeignObjectElement | null,
        public mainNode?: FightNode | null,
        public isOpponent: boolean = false
      ) {

      }
      public getElement() : SVGForeignObjectElement {
        if(this.element == undefined) {
          this.element = <SVGForeignObjectElement>document.querySelector("#"+this.tag);
        }
        return <SVGForeignObjectElement>this.element;
      }
      public createElement() : SVGForeignObjectElement {
        let target = document.querySelector("g#autogenUserProfile")
        if(target == null) {
          throw new Error("Target not found");
        }
        let newEl = new SVGTwitterUser({target: target, props: {profile: this.tag, params: [Math.random() * 1400, Math.random() * 1400]}});
        return this.getElement();
      }
      updateElement() {
        //move element closer to to enemy
        //check if i am fighter or opponent, and then move close to mainNode.opponent or mainNode.fighter
        let targetPlayer = this.isOpponent ? this.mainNode?.fighter : this.mainNode?.opponent;
        
        let targetPlayerElement = targetPlayer?.getElement();
        let targetPlayerRect = targetPlayerElement?.getBoundingClientRect();
        let currentElement = this.getElement();
        let currentX = parseFloat(currentElement.getAttribute("x"));
        let currentY = parseFloat(currentElement.getAttribute("y"));
        let targetX = targetPlayerRect?.x ?? currentX;
        let targetY = targetPlayerRect?.y ?? currentY;
        let dx = targetX - currentX;
        let dy = targetY - currentY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        //if (distance > 100) {
          let newX = currentX + (dx / distance);
          let newY = currentY + (dy / distance);
          currentElement.setAttribute("x", String(newX));
          currentElement.setAttribute("y", String(newY));
        //}
        //if mainNode has a previous, move slightly to the right
        if(this.mainNode?.previous != null) {
          let previousElement = this.mainNode?.previous?.fighter?.getElement();
          let previousRect = previousElement?.getBoundingClientRect();
          let previousX = previousRect?.x ?? currentX;
          let previousY = previousRect?.y ?? currentY;
          dx = previousX - currentX;
          dy = previousY - currentY;
          distance = Math.sqrt(dx * dx + dy * dy);
          //if (distance > 100) {
            let newX = currentX + (dx / distance);
            let newY = currentY + (dy / distance);
            currentElement.setAttribute("x", String(newX));
            currentElement.setAttribute("y", String(newY));
          //}
        }
        //if mainNode has a next, move slightly to the top left if fighter, bottom right if opponent
        if(this.mainNode?.next != null) {
          let nextElement = this.mainNode?.next?.fighter?.getElement();
          let nextRect = nextElement?.getBoundingClientRect();
          let nextX = nextRect?.x ?? currentX;
          let nextY = nextRect?.y ?? currentY;
          dx = nextX - currentX;
          dy = nextY - currentY;
          distance = Math.sqrt(dx * dx + dy * dy);
          
          let newX, newY;
          if (this.isOpponent) {
            newX = currentX + (dx / distance);
            newY = currentY + (dy / distance);
          } else {
            newX = currentX - (dx / distance);
            newY = currentY - (dy / distance);
          }
          currentElement.setAttribute("x", String(newX));
          currentElement.setAttribute("y", String(newY));
        }

        // Move closer to the center of the SVG
        targetX = 1800 / 2;
        targetY = 1000 / 2;
        currentX = parseFloat(currentElement.getAttribute("x"));
        currentY = parseFloat(currentElement.getAttribute("y"));
        dx = targetX - currentX;
        dy = targetY - currentY;
        distance = Math.sqrt(dx * dx + dy * dy);
        let speed = distance > 100 ? distance / 100 : 1;
        newX = currentX + (dx / distance) * speed;
        newY = currentY + (dy / distance) * speed;
        currentElement.setAttribute("x", String(newX));
        currentElement.setAttribute("y", String(newY));
        //}
      }
    }

    class FightNode {
      fighter: Player | null = new Player();
      opponent: Player | null = new Player();
      winner: Player | null = null;
      next: FightNode | null = null;
      previous: FightNode | null = null;
      public fight(opponent:Player | null) {
        if(this.fighter == null) {
          return null;
        }
        if(opponent == null) {
          this.next = new FightNode();
          this.next.fighter = this.fighter;
          this.winner = this.next.fighter;
          return null;
        }
        this.opponent = opponent;
        //Compate top points, the one with higher point wins and is returned
        // if points are equal, return random
        if (this.fighter.points[0] > opponent.points[0]) {
          this.next = new FightNode();
          this.next.fighter = this.fighter;
        } else if (this.fighter.points[0] < opponent.points[0]) {
          this.next = new FightNode();
          this.next.fighter = opponent;
        } else {
          this.next = new FightNode();
          this.next.fighter = Math.random() > 0.5 ? this.fighter : opponent;
        }
        this.winner = this.next.fighter;
      }
    }

    let playerList : Player[] = [
      new Player("amykrippner", [10,10,10,10]), 
      new Player("eepyfeline", [10,10,10,10]),
      new Player("SexyCarnotaurus", [10,10,10,10]),
      new Player("bnuyygirl", [10,10,10,10]),
      new Player("Kiraspirin1312", [10,10,10,10]),
      new Player("minzebeere", [10,10,10,10]),
      new Player("EinfachMarie_", [10,10,10,10]),
      new Player("AleaG0nz", [10,10,10,10]),
      new Player("AnnoWurstsaft", [10,10,10,10]), 
      new Player("DobbyDobbsen", [10,10,10,10]),
      new Player("bunarchy", [10,10,10,10]),
      new Player("sftimiiqx", [10,10,10,10]),
      new Player("bunsbrain", [10,10,10,10]),
      new Player("AviaHasNoGender", [10,10,10,10])
    ];

  //create FightNodes, pair 2 people together, make a new array
  let firstRound : FightNode[] = [];
  
  // Create a Fight node every 2 players
  for (let i = 0; i < playerList.length; i += 2) {
    let fightNode = new FightNode();
    playerList[i].mainNode = fightNode;
    fightNode.fighter = playerList[i];
    playerList[i + 1].mainNode = fightNode;
    playerList[i + 1].isOpponent = true;
    fightNode.fight(playerList[i + 1])

    firstRound.push(fightNode);
  }

  // Create a Fight node every 2 fight nodes
  let secondRound : FightNode[] = [];

  for (let i = 0; i < firstRound.length; i += 2) {
    let fightNode = new FightNode();
    fightNode.fighter = firstRound[i].winner;
    fightNode.fight(firstRound[i + 1]?.winner)

    secondRound.push(fightNode);
  }

  console.log(firstRound.map((node) => node.fighter?.tag + " vs " + node.opponent?.tag + " winner: " + node.winner?.tag).join("\n"));
  console.log(secondRound.map((node) => node.fighter?.tag + " vs " + node.opponent?.tag + " winner: " + node.winner?.tag).join("\n"));

  onMount(async () => {
    let svg = document.querySelector("svg");

    //grab all boxes and give them a border and fill randomly
    let boxes = []
    //Array.from(
    //  <NodeListOf<SVGRectElement>>svg.querySelectorAll(".box")!
    //);
    boxes.forEach((box) => {
      box.style.stroke = "black";
      box.style.fill = `rgb(${
        Math.random() * 255
      }, ${Math.random() * 255}, ${Math.random() * 255})`;
    });

    //function that creates a line
    function drawLine(x1: number, y1: number, x2: number, y2: number, color: string = "") {
      if (color == "") {
        color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      }
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(x1));
      line.setAttribute("y1", String(y1));
      line.setAttribute("x2", String(x2));
      line.setAttribute("y2", String(y2));
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "4");
      line.setAttribute("z", "-991");
      document.getElementById("lines").appendChild(line);
    }

    //function that creates a line between two boxes
    function drawLineBetweenBoxes(
      box1: SVGRectElement,
      box2: SVGRectElement,
      corner1: Corner,
      corner2: Corner
    ) {
      let box1Rect = box1.getBoundingClientRect();
      let box2Rect = box2.getBoundingClientRect();

      let x1, y1, x2, y2;

      // calculate the coordinates based on the corners
      [x1,y1] = getCoordinates(box1Rect, corner1);
      [x2,y2] = getCoordinates(box2Rect, corner2);

      drawLine(x1, y1, x2, y2);
    }

    //random redraw every 0.2 seconds
    setInterval(() => {
      playerList.forEach((player) => {
        player.updateElement();
      });

      //Move .boxes slowly within boundary of the svg
      boxes.forEach((box) => {
        
        let targetX = 1800 / 2;
        let targetY = 1000 / 2;
        let currentX = parseFloat(box.getAttribute("x"));
        let currentY = parseFloat(box.getAttribute("y"));
        let dx = targetX - currentX;
        let dy = targetY - currentY;
        let spring = 0.02; // adjust the spring value for desired effect
        let newX = currentX + dx * spring;
        let newY = currentY + dy * spring;

        let repelForce = 0.1; // adjust the repel force for desired effect
        for(let i = 0; i != 10;i++)
        boxes.forEach((otherBox) => {
          if (otherBox !== box) {
            let otherX = parseFloat(otherBox.getAttribute("x"));
            let otherY = parseFloat(otherBox.getAttribute("y"));
            let dx = otherX - newX;
            let dy = otherY - newY;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let repelX = (dx / distance) * repelForce*1.4;
            let repelY = (dy / distance) * repelForce;
            newX -= repelX;
            newY -= repelY;
          }
        });

        box.setAttribute("x", String(newX));
        box.setAttribute("y", String(newY));
      });

      let lines = document.querySelectorAll("line");
      lines.forEach((line) => {
        line.remove();
      });

      // draw lines between each box
      let tickCount = 0;
      
      if (tickCount % 20000 === 0) {
        for (let i = 0; i < boxes.length; i++) {
          let box1 = boxes[i];
          for (let j = i + 1; j < boxes.length; j++) {
            let box2 = boxes[j];
            //drawLineBetweenBoxes(box1, box2, Corner.Center, Corner.Center);
          }
        }
      }
      tickCount++;
      
    }, 5);
  });
</script>

<main>
  <svg width=2550 height=1200>
    <g id=lines>

    </g>
    <g id=autogenUserProfile>
      {#each playerList as player}
        <SVGTwitterUser profile={player.tag} params={[Math.random() * 1400, Math.random() * 1400]} />
      {/each}
    </g>
  </svg>
</main>

<style>

</style>
