(function() {
    function Room($firebaseArray) {
        var Room = {};
        var ref = firebase.database().ref();
        var roomsRef = ref.child("rooms").orderByChild("timestamp");
        
        var roomsList = $firebaseArray(roomsRef);
        
        Room.getRooms = function() {
            return roomsList;
        };
        
        Room.addRoom = function(room) {
            roomsList.$add(room).then(function(roomsRef) {
                var id = roomsRef.key;
                console.log("added record with id " + id);
                roomsList.$indexFor(id);
            });
        };
        
        return Room;
    }

    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', Room]);
})();