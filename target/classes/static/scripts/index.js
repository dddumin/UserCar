/**
 * Функция загрузки пользователей в таблицу
 */
function load() {
    $('#select-user').empty();
    $.ajax({
        url: "user",
        method: "GET",
        success: [function (users_from_server) {
            let html_table = "";
            let length = users_from_server.length;
            if (length === 0) {
                $('#add_car').prop('disabled', true);
            } else {
                $('#add_car').prop('disabled', false);
            }
            for (let i = 0; i < users_from_server.length; i++) {
                let user = users_from_server[i];
                html_table += "<tr>";
                html_table += `<td>${user.id}</td>`;
                html_table += `<td id="login-${user.id}">${user.login}</td>`;
                html_table += `<td id="name-${user.id}">${user.name}</td>`;
                html_table += `<td><button class="btn btn-info" id="info-${user.id}">List Car</button></td>`;
                html_table += `<td><button class="btn btn-success" id="update-${user.id}">Update</button></td>`;
                html_table += `<td><button class="btn btn-danger" id="delete-${user.id}">Delete</button></td>`;
                html_table += "</tr>";
                $('#select-user').append(`<option value="${user.id}">${user.login}</option>`)
            }
            $('#table_users tbody').html(html_table)
        }],
        error: [function () {
            alert("ERROR!!!")
        }]
    })
}

load();

/**
 * Функция загрузки автомобилей в таблицу
 */

function loadCars(id) {
    $.ajax({
        url: `user/${id}`,
        method: "GET",
        success: [function (user_from_server) {
            let html_table = "";
            for (let i = 0; i < user_from_server.cars.length; i++) {
                let car = user_from_server.cars[i];
                html_table += "<tr>";
                html_table += `<td id="brand-${car.id}">${car.brand}</td>`;
                html_table += `<td id="model-${car.id}">${car.model}</td>`;
                html_table += `<td id="number-${car.id}">${car.number}</td>`;
                html_table += `<td><button class="btn btn-success" id="update-${car.id}">Update</button></td>`;
                html_table += `<td><button class="btn btn-danger" id="delete-${car.id}">Delete</button></td>`;
                html_table += "</tr>";
            }
            $('#table_cars tbody').html(html_table)
        }],
        error: [function (error) {
            alert(JSON.stringify(error))
        }]
    });
}

/**
 * Обработчик нажатий кнопок из таблицы
 */

let id_user;
let id_car;

$('#table_users').on('click', 'button', function () {
    let id = $(this).attr('id');
    let mass = id.split("-")
    if (mass[0] === "delete") {
        $.ajax({
            url: `user/${mass[1]}`,
            method: "DELETE",
            success: [function () {
                load();
            }],
            error: [function () {
                alert("ERROR!")
            }]
        })
    } else if (mass[0] === "add_user") {
        $('#btn-add-user').html("Add");
        $('.popup-add-user').fadeIn();
    } else if (mass[0] === "update") {
        $('#btn-add-user').html("Update");
        $('#login').val($(`#login-${mass[1]}`).text());
        $('#name').val($(`#name-${mass[1]}`).text());
        id_user = mass[1];
        $('.popup-add-user').fadeIn();
    } else if (mass[0] === "add_car") {
        $('.popup-add-car').fadeIn();
        $('#select-user').prop('disabled', false);
        $('#btn-add-car').html("Add Car");
    } else if (mass[0] === "info") {
        $('.popup-cars').fadeIn();
        loadCars(mass[1]);
        id_user = mass[1];
    }
})

/**
 *  Обработчики кнопок popup добавления/обновления пользователя
 */


$('#btn-back-user').click(function () {
    $('#login').val("");
    $('#name').val("");
    $('.popup-add-user').fadeOut();
})


$('#btn-add-user').click(function () {
    let id = null;
    let method;
    let message;
    let message_alert;
    if ($('#btn-add-user').text() === "Add") {
        method = "POST";
        message = "Пользователь добавлен!"
        message_alert = "Пользователь уже существует!"
    } else {
        id = id_user
        method = "PUT";
        message = "Пользователь обновлен!"
        message_alert = "Логин занят другим пользователем!"
    }
    $.ajax({
        url: "user",
        method: method,
        contentType: "application/json",
        data: JSON.stringify({
            "id": id,
            "login": $('#login').val(),
            "name": $('#name').val()
        }),
        success: [function () {
            alert(message);
            $('.popup-add-user').fadeOut();
            $('#login').val("");
            $('#name').val("");
            load();
        }],
        error: [function (error) {
            alert(message_alert)
        }]
    })
})

/**
 *  Обработчики кнопок popup добавления машины
 */

$('#btn-back-car').click(function () {
    $('#brand').val("");
    $('#model').val("");
    $('#number').val("");
    $('.popup-add-car').fadeOut();
})


$('#btn-add-car').click(function () {
    let id = null;
    let method;
    let message;
    let message_alert;
    if ($('#btn-add-car').text() === "Add Car") {
        method = "POST";
        message = "Автомобиль добавлен!!!";
        message_alert = "Автомобиль с таким номером уже существует в базе данных!!!";
    } else {
        id = id_car;
        method = "PUT";
        message = "Информация об автомобиле изменена!!!";
        message_alert = "Автомобиль с таким номером уже существует в базе данных!!!";
    }
    $.ajax({
        url: `user/${$(`#select-user`).val()}`,
        method: "GET",
        success: [function (user_from_server) {
            $.ajax({
                url: "car",
                method: method,
                contentType: "application/json",
                data: JSON.stringify({
                    "id": id,
                    "brand": $('#brand').val(),
                    "model": $('#model').val(),
                    "number": $('#number').val(),
                    "user": user_from_server
                }),
                success: [function () {
                    alert(message);
                    $('.popup-add-car').fadeOut();
                    $('#brand').val("");
                    $('#model').val("");
                    $('#number').val("");
                    if (method === "PUT") {
                        loadCars(id_user);
                    }
                }],
                error: [function (error) {
                    alert(message_alert)
                }]
            })
        }],
        error: [function (error) {
            alert(JSON.stringify(error))
        }]
    });
})

/**
 *  Обработчики кнопок popup списка машин
 */

$('#btn-back-cars').click(function () {
    $('.popup-cars').fadeOut();
})

$('#table_cars').on('click', 'button', function () {
    let id = $(this).attr('id');
    let mass = id.split("-")
    if (mass[0] === "delete") {
        $.ajax({
            url: `car/${mass[1]}`,
            method: "DELETE",
            success: [function () {
                loadCars(id_user);
            }],
            error: [function () {
                alert("ERROR!")
            }]
        })
    } else if (mass[0] === "update") {
        $('.popup-add-car').fadeIn()
        $('#btn-add-car').html("Update Car");
        $('#select-user').val(id_user);
        $('#select-user').prop('disabled', true);
        id_car = mass[1];
        $('#brand').val($(`#brand-${mass[1]}`).text());
        $('#model').val($(`#model-${mass[1]}`).text());
        $('#number').val($(`#number-${mass[1]}`).text());
    }
})

