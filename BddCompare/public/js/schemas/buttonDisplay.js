document.getElementById("refreshSchemas").addEventListener("click", function() {
    console.log(document.cookie);
    if(document.getElementById("refreshSchemas").innerText == "Afficher schémas des bdd"){
        document.getElementById("refreshSchemas").innerText = "Rafraîchir schémas des bdd";
    }else{
        document.getElementById("refreshSchemas").innerText = "Afficher schémas des bdd";
    }
});

document.getElementById("refreshTables2").addEventListener("click", function() {
    console.log(document.getElementById("refreshTables2"));
    if(document.getElementById("refreshTables2").innerText == "Afficher tables"){
        document.getElementById("refreshTables2").innerText = "Rafraîchir tables";
    }else{
        document.getElementById("refreshTables2").innerText = "Afficher tables";
    }
});