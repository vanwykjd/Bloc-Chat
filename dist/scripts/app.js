(function() {
    
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });
            
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'RoomsCtrl as chatRooms',
                templateUrl: '/templates/home.html'
            });
            
    }
    
    
    function BlocChatCookies($uibModal, User) {
        
        if (!User.getUser() || User.getUser() === '') {
            var modal = $uibModal.open({
                    templateUrl: '/templates/create_user.html',
                    keyboard: false,
                    backdrop: 'static',
                    backdropClass: 'login-modal-backdrop',
                    windowClass: 'login-modal-window',
                    size: 'md',
                    controller: function($scope) {
                        $scope.ok = function() {
                            var user_id = $scope.userName;
                                if(user_id && user_id != '') {
                                    User.setUser(user_id);
                                    modal.close(User.getUser());
                                }
                        };
                       
                    }
            });
        }
        
    }
    
    
angular
    .module('blocChat', ['ui.router', 'firebase', 'ui.bootstrap', 'ngCookies'])
    .config(config)
    .run(['$uibModal', 'User',  BlocChatCookies]);
})();



        



