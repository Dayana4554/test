import { GatherData } from "./gatherData.js";
document.getElementById("submitBTN").addEventListener("click", (e) => {
  let username = document.getElementById("username_input").value;
  let password = document.getElementById("password_input").value;
  const credentials = btoa(username + ":" + password);
  // URL de l'endpoint "signin"
  const url = "https://zone01normandie.org/api/auth/signin";
  // Options de la requête fetch, y compris l'en-tête d'authentification
  const options = {
    method: "POST",
    headers: {
      Authorization: "Basic " + credentials,
      "Content-Type": "application/json", // Assurez-vous de définir le type de contenu approprié
    },
    // Autres options de la requête, comme le corps des données si nécessaire
  };
  // Effectuer la requête fetch
  fetch(url, options)
    .then((response) => {
      // Vérifiez si la réponse est ok (statut HTTP 200-299)
      if (!response.ok) {
        throw new Error("Erreur lors de la requête : " + response.statusText);
      }
      // Extraire les données JSON de la réponse
      return response.json();
    })
    .then((token) => {
      // Utilisez les données
      document.getElementById("logininputs").classList.add("disnone");
      document.getElementById("graphs").classList.remove("disnone");
      GatherData(token);
    })
    .catch((error) => {
      console.error("Erreur lors de la requête :", error);
      document.getElementsByClassName("alert")[0].classList.remove("disnone");
    });
});
document.getElementById("logout").addEventListener("click", (e) => {
  window.location.href = "https://dayana4554.github.io/";
});
