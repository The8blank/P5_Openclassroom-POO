function main() {
    textConfirm = document.getElementById("orderId")
    // injecte l'id de l'url dans l'html 
    textConfirm.innerText = (new URL(document.location).searchParams.get('orderId'))
}

main();