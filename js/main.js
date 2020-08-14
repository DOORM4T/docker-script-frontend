const toggleButton = document.getElementById('toggle');
toggleButton.addEventListener('click', ()=>{
    setTimeout(()=>{
        window.location.reload()
    },1000)
})