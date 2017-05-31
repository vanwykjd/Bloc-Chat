(function() {
    function RoomsCtrl($scope, Message, Room, User, $uibModal, $timeout) {
        
        this.roomList = Room.getRooms();
        this.messageList = Message.getMessages();
        this.user = User;
        
        $scope.user = this.user;
        
        
        this.openModal = function() {
            var modal = $uibModal.open({
                templateUrl: '/templates/create_room.html',
                size: 'sm',
                controller: function($scope) {
                    
                    $scope.submitRoom = function() {
                        var key = event.keyCode;
                        var newRoom = $scope.roomName;
                            if(key === 13) {
                                modal.dismiss(Room.addRoom(newRoom));
                            }
                    };
                    
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
            if ($scope.activeRoom !== room) {
                $scope.activeRoom = room;
            }
            
            return $scope.activeRoom;
        };
        
        $scope.updateScroll = function() {
            var room = document.getElementById("chatroom-body");
            var x = room.scrollHeight;
            room.scrollTop = x;
            
            if (x == 0) {
                room = document.getElementsByClassName("mb-chatroom-body")[0];
                x = room.scrollHeight;
                console.log(x);
                //room.scrolltop = x;
                setTimeout(function() {
                  room.scrollTop = x;  
                }, 0);
            }
            
        };
        
        $scope.messageDates = function(messages) {
                var dates = [];
                
                for (var i=0; i < messages.length; i++) {
                    
                    
                    var currentDate = new Date();
                    var today = currentDate.getDate();
                    
                    var dateSent = new Date(messages[i].timeSent);
                    var messageDate = dateSent.getDate();
                    
                    var dateDiff = today - messageDate;
                    
                    var date = "";
                    
                    switch (dateDiff) {
                        case 0:
                            date = "Today";
                            break;
                        case 1:
                            date = "Yesterday";
                            break;
                        default:
                            date = dateSent.toLocaleDateString();
                    }
                    
                    
                    if (!dates.includes(messageDate)) {
                        dates.push(messageDate);
                        messages[i].firstOfDay = date;
                    }
                
                }
                
                return messages;
        };
        
        
        $scope.getMessages = function(room_id) {
           $scope.messages = Message.getByRoomId(room_id);
         
           //set the height here after the messages have loaded for the new room
           $timeout(function(){
                          $scope.updateScroll();
           },0);
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
                
                $timeout(function(){
                          $scope.updateScroll();
                },0);
               
            }
            
        };
        
        
        $scope.submitMessage = function() {
            var key = event.keyCode;
            var newMessage = $scope.message;
            
            if (key === 13) {
                if (newMessage && newMessage !== '') {
                    var message = {
                        content: newMessage,
                        room_id: $scope.activeRoom.$id,
                        timeSent: Date.now(),
                        user_id: $scope.user.id
                    };
                }
                Message.send(message);
                $scope.message = '';
                
                $timeout(function(){
                          $scope.updateScroll();
                },0);
                
            }
            
        };
        
        
        $scope.showChatRoom = function(room) {
            if (room) {
                return true;
            }
        };
        
    }
    
    
    angular
        .module('blocChat')
        .controller('RoomsCtrl', ['$scope', 'Message', 'Room', 'User', '$uibModal', '$timeout', RoomsCtrl]);
})();