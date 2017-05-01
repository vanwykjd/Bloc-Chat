(function() {
    function RoomsCtrl(Room, Message, User, $uibModal, $scope) {
        
        this.roomList = Room.getRooms();
        this.messageList = Message.getMessages();
        this.user = User;
        
        this.openModal = function() {
            var modal = $uibModal.open({
                templateUrl: '/templates/create_room.html',
                size: 'sm',
                controller: function($scope) {
                    $scope.ok = function() {
                        var newRoom = $scope.roomName;
                        modal.dismiss(Room.addRoom(newRoom));
                    };
                    $scope.cancel = function() {
                        modal.close();
                    };
                }
            });
        };
        
        $scope.user = this.user;
        
        $scope.selectRoom = function(room) {
            if ($scope.activeRoom !== room) {
                $scope.activeRoom = room;
            }
            return $scope.activeRoom;
        };
        
        $scope.getMessages = function(room_id) {
           $scope.messages = Message.getByRoomId(room_id);
        };
        
        $scope.sendMessage = function() {
            var newMessage = $scope.message;
            if (newMessage && newMessage !== '') {
                var message = {
                    content: newMessage,
                    room_id: $scope.activeRoom.$id,
                    timeSent: Date.now(),
                    user_id: $scope.user.id
                };
                Message.send(message);
                $scope.message = '';
            };
            
        };
        
        $scope.showChatRoom = function(room) {
            if (room) {
               return true;
            } 
        };
        
    }
    
    
    angular
        .module('blocChat')
        .controller('RoomsCtrl', ['Room', 'Message','User', '$uibModal','$scope', RoomsCtrl]);
})();