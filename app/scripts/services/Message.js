(function() {
    function Message($firebaseArray) {
        var Message = {};
        var ref = firebase.database().ref();
        var messageRef = ref.child("messages").orderByChild('room_id');
        
        var messageList = $firebaseArray(messageRef);
        
        
        Message.getMessages = function() {
            return messageList;
        };
        
        Message.getByRoomId = function(room) {
            var room_id = room.$id;
            var roomMessages = messageRef.equalTo(room_id);
            var messagesByRoom = $firebaseArray(roomMessages);
            
            return messagesByRoom;
        };
        
        Message.send = function(message) {
            messageList.$add(message);
        };
        
        
        return Message;
    }

    angular
        .module('blocChat')
        .factory('Message', ['$firebaseArray', Message]);
})();