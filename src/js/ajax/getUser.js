import $ from 'jquery';

function getUser(email, password) {
    $.ajax({
        url: `http://localhost:3000/api/users/${email}/${password}`,
        type: 'GET',
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        success: function (result) {
            alert(result);
        },
        error: function (xhr) {
            alert('Error, please try again later!');
        },
    });
}

export {getUser};