(function() {
    function RoomsCtrl(Room, Message, $uibModal, $scope) {
        this.roomList = Room.getRooms();
        this.messageList = Message.getMessages();
        
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
        
        
        $scope.selectRoom = function(room) {
            $scope.activeRoom = room;
        };
        
        
        $scope.getMessages = function(room_id) {
           $scope.messages = Message.getByRoomId(room_id);
        };
        
        $scope.showChatRoom = function(room) {
            if (room) {
               return true;
            } 
        };
        
    }
    
    
    angular
        .module('blocChat')
        .controller('RoomsCtrl', ['Room', 'Message', '$uibModal','$scope', RoomsCtrl]);
})();