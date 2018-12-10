import $ from 'jquery';

function addUser(userEmail, userPassword) {
    $.ajax({
        url: 'http://localhost:7000/api/users',
        type: 'POST',
        data: generateData(userEmail, userPassword),
        dataType: 'json',
        success: function (result) {
            alert("Success");
        },
        error: function (xhr) {
            console.log(xhr.error);
            alert('Error, please try again later!');
        },
    });
}

function generateData(userEmail, userPassword) {
    return `email=${userEmail}&password=${userPassword}`;
}

export {addUser};