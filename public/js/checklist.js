document.addEventListener('DOMContentLoaded', () => {

    let list_group_item = document.querySelectorAll('.list-group-item');
    list_group_item.forEach(function(item) {

        item.addEventListener('click', () => {
            if (item.className == 'list-group-item list-group-item-action') {
                item.classList.add('text-decoration-line-through');
            } else {
                item.classList.remove('text-decoration-line-through');
            }
        });
 
    });

    let btnUpdate = document.getElementById('btnUpdate');
    btnUpdate.addEventListener('click', () => {
        let completedItems = document.querySelectorAll('.list-group-item.list-group-item-action.text-decoration-line-through');
        if(completedItems.length == 0)
        return
        let idList = []
         completedItems.forEach(function(item) {
            idList.push(item.id)
        }); 
         $.ajax({
            type: "POST",
            url: "/checklist_update/updateStatus/",
            data: { 
               idList: idList
            },
            success: function(data) {
            // send alert message when success
           $('.list-group-item.list-group-item-action.text-decoration-line-through').remove()
           $('#msgBar').removeClass()
           const msgClass = "alert " +data.msgStatus+ " alert-dismissible fade show"
           $('#msgBar').addClass(msgClass);
           $('#msgTxt').text(data.message)
           },
            error: function(data) {
                console.log("error")
            },
            dataType: "json"
          });

    });

});

