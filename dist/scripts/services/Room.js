(function() {
    function Room($firebaseArray) {
        var Room = {};
        var ref = firebase.database().ref();
        var roomsRef = ref.child("rooms").orderByKey();
        
        var roomsList = $firebaseArray(roomsRef);
        
        Room.getRooms = function() {
            return roomsList;
        };
        
        Room.addRoom = function(room) {
            roomsList.$add(room);
        };
        
        return Room;
    }

    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', Room]);
})();