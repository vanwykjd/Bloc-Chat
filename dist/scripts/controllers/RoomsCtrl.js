(function() {
    function RoomsCtrl(Room) {
        this.rooms = Room.all;
    }
    
    angular
        .module('blocChat')
        .controller('RoomsCtrl', ['Room', RoomsCtrl]);
})();