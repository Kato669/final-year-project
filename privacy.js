const username = document.getElementById('username')
const password = document.getElementById('password')
const form = document.getElementById('form')
const error1 = document.getElementById('error')

form.addEventListener('submit',(e)=>{
    let message = []
    /*if (username.value !="kato"  ) {
        message.push('')
    }*/
    if (password.value!='12345') {
        message.push('incorrect username and password')
    }
    if (message.length>0) {
        e.preventDefault();
        error1.innerText=message.join(',')
    }
   
})

/*=================================styling letters============================*/

function enter(input){
    var regex = /[^a-z]/gi;
    input.value = input.value.replace(regex,"");
}
/*=================================styling letters============================*/
