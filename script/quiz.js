function corrigerQuiz() {
    const reponses = {
        q1: "b",
        q2: "c",
        q3: "a",
        q4: "a",
        q5: "b"
    };

    let score = 0;

    for (let q in reponses) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === reponses[q]) {
            score++;
        }
    }


    document.querySelector(".question").style.display = "none";
    document.querySelector(".button").style.display = "none";


    const resultatDiv = document.getElementById("resultat");
    resultatDiv.innerHTML = `<h2>Votre score : ${score}/5</h2>`;


    if (score < 5) {
        resultatDiv.innerHTML+= `<h2>Dommage. Voici un petit peu de contexte : </h2>`;
        document.getElementById("infos").style.display = "block";
    }
    else{
        resultatDiv.innerHTML+= `<h2>Bravo ! Vous avez réussi le quiz !</h2>`;
    }
}