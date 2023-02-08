const validations = {
    "phone": /^[\d]{10}$/,
    "email": /^([A-Z0-9.]*)+@+([A-Z0-9]{2,})+(\.+[A-Z]{2,})*$/i,
    "name": /^([A-Z0-9]*)+\s+([A-Z0-9\s]{1,})$/i,
    "password": /^[a-zA-Z0-9]{6,16}$/,
    "cpassword": /^[a-zA-Z0-9]{6,16}$/,
}

function validate(valids){
    let resp = false;

    valids.forEach(element => {
        resp = element;
    });

    return resp;
}

export function isValid(value,type){
    let valid = []
    if(typeof value === "string"){
        if(validations[type]){
            valid.push(Boolean(value.match(validations[type])));
        }
    }

    if(Array.isArray(value)){
        value.forEach((e,i) => {
            valid.push(isValid(e,type[i]));
        });
    }
    return validate(valid);
}