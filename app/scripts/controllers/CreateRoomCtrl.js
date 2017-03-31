(function() {
    function CreateRoomCtrl($uibModal, rooms) {
        this.roomsList = rooms;
        
        this.newRoom = {
            $value: this.roomsList[0]
        };
        
        this.ok = function() {
            $uibModal.close(this.newRoom.$value);
        }
    }
    
    angular
        .module('blocChat')
        .controller('CreateRoomCtrl', ['$uibModal', 'rooms', CreateRoomCtrl]);
})();