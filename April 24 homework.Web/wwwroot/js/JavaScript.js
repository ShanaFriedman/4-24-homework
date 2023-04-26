$(() => {
    let id = null;

    const addModal = new bootstrap.Modal($('#add-modal')[0]);
    const editModal = new bootstrap.Modal($('#edit-modal')[0]);

    function refreshTable() {
        $("tbody").empty()
        $.get("/home/getpeople", function (peopleList) {
            peopleList.forEach(function (p) {
                $("tbody").append(`<tr>
            <td>${p.firstName}</td>
            <td>${p.lastName}</td>
            <td>${p.age}</td>
            <td><button class="btn btn-warning" data-edit-id="${p.id}" >Edit</button></td>
            <td><button class="btn btn-danger" data-delete-id="${p.id}">Delete</button></td>
</tr>`)
            })
        })
    }

    refreshTable()

    $("#add-person").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        addModal.show();
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            addModal.hide();
            refreshTable();
        });
    })

    $("tbody").on("click", ".btn-warning", function () {
        id = $(this).data("edit-id")

        $.get("/home/getPerson", { id }, function (person) {
            
            const firstName = person.firstName
            const lastName = person.lastName
            const age = person.age

            $("#firstName-edit").val(firstName);
            $("#lastName-edit").val(lastName);
            $("#age-edit").val(age);

            editModal.show()
        })

    })

    $("#edit-person").on("click", function () {
        const firstName = $("#firstName-edit").val();
        const lastName = $("#lastName-edit").val();
        const age = $("#age-edit").val();
        
        $.post("/home/editperson", { firstName, lastName, age, id }, function () {
            id = null
            editModal.hide()
            refreshTable()
        })
    })

    $("tbody").on("click", ".btn-danger", function () {
        id = $(this).data("delete-id")
        $.post("/home/deletePerson", { id }, function () {
            id = null;
            refreshTable()
        })
    })

})