(function() {
    function Message($firebaseArray) {
        var Message = {};
        
        var ref = firebase.database().ref().child("messages");
        var messageList = $firebaseArray(ref);
        
        
        Message.getMessages = function() {
            return messageList;
        };
        
        Message.getByRoomId = function(room_id) {
            var messageRef = ref.orderByChild('room_id').equalTo(room_id);
            var roomMessages = $firebaseArray(messageRef);
            
            return roomMessages;
        };
        
        
        return Message;
    }

    angular
        .module('blocChat')
        .factory('Message', ['$firebaseArray', Message]);
})();