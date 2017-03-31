(function() {
    function RoomsCtrl(Room, $uibModal) {
        this.list = Room.getRooms;
        
        this.openModal = function() {
            var modal = $uibModal.open({
                templateUrl: '/templates/create_room.html',
                size: 'sm',
                controller: function($scope) {
                    var room = $scope.room;
                    
                    $scope.ok = function(room) {
                        Room.addRoom(room)
                        modal.dismiss();
                    };
                }
            });
        };
        
        
    }
    
    
    angular
        .module('blocChat')
        .controller('RoomsCtrl', ['Room', '$uibModal', RoomsCtrl]);
})();