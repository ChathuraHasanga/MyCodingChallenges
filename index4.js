let result = document.querySelector("#demo1");
document.body.addEventListener('change',function(e){
    let target = e.target;
    let message;
    switch(target.id){
        case 'rad2':
            message = '25';
            break;
        case 'rad1':
            message = '201';
            break;
    }

    result.textContent = message;
})

let result2 = document.querySelector("#demo2");
document.body.addEventListener('change',function(e){
    let target = e.target;
    let message;
    switch(target.id){
        case 'rad2':
            message = '35';
            break;
        case 'rad1':
            message = '282';
            break;
    }

    result2.textContent = message;
})