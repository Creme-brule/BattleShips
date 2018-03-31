$(function() {
    $('#room-join').on("click",function(){
        var userId = localStorage.getItem("userId");
        console.log(userId);
        console.log("asdf"+$(this).attr('data-id'));
        $.ajax({
            url:"/api/room",
            type:"PUT",
            data: {joiner:userId,
                roomid:$(this).attr('data-id')},
        }).then(function(data){
            console.log("\n\nbleh\n\n");
            location.href="/map/"+data;
        });
    });
});
