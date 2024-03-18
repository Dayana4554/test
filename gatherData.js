import { drawXPGraph } from "./myProgressGraph.js";
import { showProgress } from "./skillsProgress.js";
export function GatherData(token) {
  console.log("gathering");
  fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Si nécessaire
    },
    body: JSON.stringify({
      query: `
        {
            transaction (where: {eventId: {_eq: 148}}){
              id
              amount
              type
              createdAt
              path
              eventId
            }
            
            user {
              firstName
              lastName
              campus
              email
                groups {
                    group {
                    path
                    status
                    eventId
                    createdAt
                    }
                }  
                attrs
            }
        }
          
        `,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      let div01xp = 0;
      let lvl = 0;
      let image = 0;
      let auditDown = 0;
      let auditUp = 0;
      let skills = new Map();
      let finished = 0;
      let progress = [];
      let xpProgress = [];
      data.data.transaction.forEach((element) => {
        switch (element.type) {
          case "xp":
            let xp = { date: undefined, value: undefined };
            div01xp += element.amount;
            xp.value = element.amount;
            let dateformated = element.createdAt.substring(0, 10);
            xp.date = dateformated;
            let tmp = dateformated.split("-");
            dateformated = tmp.join("");
            progress.push({ date: dateformated, amount: element.amount });
            console.log(xp);
            xpProgress.push(xp);
            break;
          case "level":
            lvl++;
            break;
          case "up":
            auditUp += element.amount;
            break;
          case "down":
            auditDown += element.amount;
            break;
          default:
            if (skills.has(element.type)) {
              if (skills.get(element.type) <= element.amount) {
                skills.set(element.type, element.amount);
              }
            } else {
              skills.set(element.type, element.amount);
            }
        }
      });
      data.data.user.forEach((u) => {
        let workingCount = 0;
        u.groups.forEach((grp) => {
          if (grp.group.eventId == 148) {
            if (grp.group.status == "finished") {
              finished++;
            }
          }
        });
      });
      var svg = document.getElementById("ratioSvg");
      var width = svg.clientWidth; // Récupérer la largeur réelle de l'élément SVG
      svg.setAttribute("viewBox", "0 0 " + width + " " + 40);
      document.getElementById("name").textContent +=
        data.data.user[0].attrs.firstName +
        " " +
        data.data.user[0].attrs.lastName;
      document.getElementById("div01xp").textContent +=
        (div01xp / 1000).toFixed(0) + "k";
      document.getElementById("lvl").textContent += lvl;
      document.getElementById("ratio").textContent += (
        auditUp / auditDown
      ).toFixed(1);
      if (auditDown > auditUp) {
        document
          .getElementById("lineUp")
          .setAttribute("x2", svg.clientWidth * (auditUp / auditDown));
        document.getElementById("lineDown").setAttribute("x2", svg.clientWidth);
      } else {
        document
          .getElementById("lineDown")
          .setAttribute("x2", svg.clientWidth * (auditDown / auditUp));
        document.getElementById("lineUp").setAttribute("x2", svg.clientWidth);
      }
      if (auditDown > 1000000) {
        document.getElementById("auditDown").textContent +=
          (auditDown / 1000000).toFixed(2) + "Mb";
        document.getElementById("auditUp").textContent +=
          (auditUp / 1000000).toFixed(2) + "Mb";
      } else if (auditDown > 1000) {
        document.getElementById("auditDown").textContent +=
          (auditDown / 1000).toFixed(2) + "Kb";
        document.getElementById("auditUp").textContent +=
          (auditUp / 1000).toFixed(2) + "Kb";
      }
      document.getElementById("finished").textContent += finished;
      showProgress(skills);
      //createCircle(skills);
      //progress.sort((a, b) => a.date - b.date);
      //progressGraph(progress, div01xp);
      xpProgress.sort((a, b) => new Date(a.date) - new Date(b.date));
      drawXPGraph(xpProgress);
    })
    .catch((error) => console.error("Erreur lors de la requête:", error));
}
