(function() {
    function RoomsCtrl(Room, $uibModal) {
        this.list = Room.getRooms;
        
        this.openModal = function() {
            var modalInstance = $uibModal.open({
                templateUrl: '/templates/create_room.html',
                size: 'sm',
                controller: function($scope) {
                    
                    $scope.room = {
                        $value: Room.getRooms()[0].$value
                    };
                    
                    var newRoom = $scope.roomName;
                    $scope.ok = function(newRoom) {
                        $scope.add = Room.addRoom(newRoom);
                        modalInstance.dismiss( { $value: $scope.room } );
                    };
                }
            });
        };
        
        
    }
    
    angular
        .module('blocChat')
        .controller('RoomsCtrl', ['Room', '$uibModal', RoomsCtrl]);
})();